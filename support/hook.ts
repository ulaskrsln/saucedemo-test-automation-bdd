import { Before, After, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { chromium, ConsoleMessage, Response } from '@playwright/test';
import { analyzeFailure } from './ai/rca-agent';

// 60 saniye timeout (Global ayar)
setDefaultTimeout(60 * 1000);

// Test İzolasyonu: Her bir "Scenario" başlamadan önce temiz bir tarayıcı açar.
Before(async function () {
    const isCI = process.env.CI ? true : false;

    // Tarayıcı ve sayfayı doğrudan 'this' (World) bağlamına atıyoruz!
    this.browser = await chromium.launch({ headless: isCI });
    this.page = await this.browser.newPage();

    // YENİ: RCA için arka planda sessizce kanıt toplayan dinleyiciler.
    // Bunlar testin akışını etkilemez, sadece bir şey patlarsa diye
    // console hatalarını ve başarısız (4xx/5xx) network isteklerini biriktirir.
    this.page.on('console', (msg: ConsoleMessage) => {
        if (msg.type() === 'error') {
            this.consoleErrors.push(msg.text());
        }
    });

    this.page.on('response', (response: Response) => {
        if (response.status() >= 400) {
            this.failedRequests.push(
                `${response.request().method()} ${response.url()} -> ${response.status()}`
            );
        }
    });
});

// Kaynak Yönetimi: Test bitince tarayıcıyı güvenli şekilde kapatır.
After(async function (scenario) {
    // Eğer senaryo başarısız (FAILED) olduysa ekran görüntüsü al!
    if (scenario.result?.status === Status.FAILED) {
        if (this.page) {
            const screenshot = await this.page.screenshot({ fullPage: true });
            // Bu satır ekran görüntüsünü hem Allure raporuna hem de HTML raporuna gömer:
            this.attach(screenshot, 'image/png');

            // YENİ: Otonom Kök Neden Analizi (RCA) — sayfa hâlâ açıkken çağırıyoruz,
            // çünkü rca-agent bir DOM özeti çıkarmak için canlı page nesnesine ihtiyaç duyar.
            const errorMessage = scenario.result?.message ?? 'Hata mesajı bulunamadı.';
            const analysis = await analyzeFailure(
                this.page,
                errorMessage,
                this.consoleErrors,
                this.failedRequests
            );

            const reportText = analysis
                ? `## 🤖 Otonom Kök Neden Analizi\n\n${analysis}`
                : '## 🤖 Otonom Kök Neden Analizi\n\n_AI analizi şu an alınamadı (Groq bağlantı sorunu ya da API key eksik olabilir)._';

            // Rapora ekle (Allure/HTML formatter ileride bunu render edebilir).
            this.attach(reportText, 'text/plain');

            // YENİ: HTML formatter'ın attachment render'ı garanti olmadığı için,
            // terminale de basıyoruz — bu, hiçbir render belirsizliği olmayan
            // tek kanal.
            console.log('\n' + '='.repeat(60));
            console.log(reportText);
            console.log('='.repeat(60) + '\n');
        }
    }

    // Tarayıcı ve sayfayı güvenli şekilde kapat
    if (this.page) await this.page.close();
    if (this.browser) await this.browser.close();
});
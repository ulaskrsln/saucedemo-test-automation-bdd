import { Before, After, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';

// 60 saniye timeout (Global ayar)
setDefaultTimeout(60 * 1000);

// Test İzolasyonu: Her bir "Scenario" başlamadan önce temiz bir tarayıcı açar.
Before(async function () {
    const isCI = process.env.CI ? true : false;
    
    // Tarayıcı ve sayfayı doğrudan 'this' (World) bağlamına atıyoruz!
    this.browser = await chromium.launch({ headless: isCI }); 
    this.page = await this.browser.newPage();
});

// Kaynak Yönetimi: Test bitince tarayıcıyı güvenli şekilde kapatır.
After(async function (scenario) {
    // YENİ: Eğer senaryo başarısız (FAILED) olduysa ekran görüntüsü al!
    if (scenario.result?.status === Status.FAILED) {
        if (this.page) {
            const screenshot = await this.page.screenshot({ fullPage: true });
            // Bu satır ekran görüntüsünü hem Allure raporuna hem de HTML raporuna gömer:
            this.attach(screenshot, 'image/png');
        }
    }

    // Tarayıcı ve sayfayı güvenli şekilde kapat
    if (this.page) await this.page.close();
    if (this.browser) await this.browser.close();
});
import { Page } from '@playwright/test';
import { askGroq } from './groq-client';

const SYSTEM_PROMPT = `Sen kıdemli bir SDET (Software Development Engineer in Test) mimarisin.
Aşağıdaki test başarısızlığına ait kanıtları incele, hatanın UI'dan mı,
Backend'den mi yoksa test kurgusundan mı kaynaklandığını 3 cümleyi
geçmeden Markdown formatında özetle. Emin değilsen tahmin ettiğini belirt,
kesin konuşma.`;

/**
 * Sayfanın "hafifletilmiş" özetini çıkarır: URL, başlık ve görünür metnin
 * ilk 500 karakteri. Tüm HTML yerine bunu kullanmamızın sebebi: LLM'e
 * gereksiz gürültü değil, teşhis için yeterli bağlamı vermek.
 *
 * SAFE-FAIL: Sayfa artık erişilebilir değilse (örn. kapanmışsa) hata
 * fırlatmaz, bunun yerine açıklayıcı bir metin döner.
 */
async function getDomSummary(page: Page): Promise<string> {
    try {
        const url = page.url();
        const title = await page.title();
        const bodyText = await page.locator('body').innerText();
        const truncated = bodyText.slice(0, 500).replace(/\s+/g, ' ').trim();

        return `URL: ${url}\nBaşlık: ${title}\nGörünür metin (ilk 500 karakter): ${truncated}`;
    } catch {
        return 'DOM özeti alınamadı (sayfa artık erişilebilir olmayabilir).';
    }
}

/**
 * Bir test başarısızlığını Groq Llama'ya analiz ettirir.
 *
 * @param page Başarısız olan senaryonun Playwright Page nesnesi
 * @param errorMessage Cucumber'ın verdiği ham hata mesajı/stack trace
 * @param consoleErrors Before/After hook'larında toplanan JS console hataları
 * @param failedRequests Before/After hook'larında toplanan 4xx/5xx network istekleri
 * @returns Markdown formatında kısa bir analiz, ya da bir sorun olduysa null
 */
export async function analyzeFailure(
    page: Page,
    errorMessage: string,
    consoleErrors: string[],
    failedRequests: string[]
): Promise<string | null> {
    const domSummary = await getDomSummary(page);

    // Her kategoriden en fazla 5 kayıt alıyoruz — hepsini göndermek
    // hem token israfı hem de LLM'in en önemli sinyali gürültüde
    // kaybetmesine sebep olabilir.
    const consoleSection = consoleErrors.length > 0
        ? consoleErrors.slice(0, 5).join('\n')
        : 'Yok';

    const networkSection = failedRequests.length > 0
        ? failedRequests.slice(0, 5).join('\n')
        : 'Yok';

    const userPrompt = `## Hata Mesajı
${errorMessage}

## Sayfa Özeti
${domSummary}

## Console Hataları (toplam ${consoleErrors.length})
${consoleSection}

## Başarısız Network İstekleri (toplam ${failedRequests.length})
${networkSection}`;

    return await askGroq(SYSTEM_PROMPT, userPrompt);
}
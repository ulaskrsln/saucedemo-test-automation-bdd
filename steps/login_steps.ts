import { Given, When, Then, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';
import { LoginPage } from '../pages/login_page';

setDefaultTimeout(60 * 1000); // 60 saniye timeout

let browser: Browser;
let page: Page;
let loginPage: LoginPage;

// Test İzolasayonu (State Isolation): Her bir "Scenario" başlamadan önce temiz bir tarayıcı açar.
Before(async function () {
    // GitHub Actions "CI" adında gizli bir ortam değişkeni tutar. 
    // Eğer kod CI'da koşuyorsa headless: true olur, senin bilgisayarındaysa false olur.
    const isCI = process.env.CI ? true : false;
    
    browser = await chromium.launch({ headless: isCI }); 
    page = await browser.newPage();
    loginPage = new LoginPage(page);
});

// Kaynak Yönetimi (Resource Teardown): Test bitsede, kalsa da tarayıcıyı güvenli şekilde kapatır.
After(async function () {
    if (page) await page.close();
    if (browser) await browser.close();
});

// 1. ADIM: Sayfaya Yönlendirme
Given('I am on the SauceDemo login page', async function () {
    await loginPage.navigate();
});

// 2. ADIM: Veri Girişi (Data-Driven Katmanı)
When('I enter username {string} and password {string}', async function (username: string, password: string) {
    // Feature dosyasındaki Examples tablosundan gelen dinamik değerler buraya parametre olarak akar.
    await loginPage.enterUsername(username);
    await loginPage.enterPassword(password);
});

// 3. ADIM: Aksiyon (Tıklama)
When('I click the login button', async function () {
    await loginPage.clickLogin();
});

// 4. ADIM: Doğrulama (Assertion Katmanı)
Then('I should see {string}', async function (expectedResult: string) {
    if (expectedResult === 'successful login') {
        // Eğer tablodaki beklenti başarılı giriş ise envanter sayfasını doğrula
        await loginPage.verifySuccessfulLogin();
    } else {
        // Negatif senaryolarda UI'daki hata mesajını çek ve tablodaki beklenen metinle eşleştir
        const actualError = await loginPage.getErrorMessage();
        if (!actualError.includes(expectedResult)) {
            throw new Error(`Beklenen hata mesajı: "${expectedResult}"\nFakat ekranda görünen: "${actualError}"`);
        }
    }
});

// Export shared test context so other step definition files can reuse the same
// browser/page instances created in the Before hook above.
export { browser, page, loginPage };
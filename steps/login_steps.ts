import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../pages/login_page';

// 1. ADIM: Sayfaya Yönlendirme
Given('I am on the SauceDemo login page', async function () {
    // World'den gelen this.page'i kullanarak POM nesnesini oluşturuyoruz
    const loginPage = new LoginPage(this.page);
    await loginPage.navigate();
});

// 2. ADIM: Veri Girişi
When('I enter username {string} and password {string}', async function (username: string, password: string) {
    const loginPage = new LoginPage(this.page);
    await loginPage.enterUsername(username);
    await loginPage.enterPassword(password);
});

// 3. ADIM: Aksiyon (Tıklama)
When('I click the login button', async function () {
    const loginPage = new LoginPage(this.page);
    await loginPage.clickLogin();
});

// 4. ADIM: Doğrulama
Then('I should see {string}', async function (expectedResult: string) {
    const loginPage = new LoginPage(this.page);
    
    if (expectedResult === 'successful login') {
        await loginPage.verifySuccessfulLogin();
    } else {
        const actualError = await loginPage.getErrorMessage();
        if (!actualError.includes(expectedResult)) {
            throw new Error(`Beklenen hata mesajı: "${expectedResult}"\nFakat ekranda görünen: "${actualError}"`);
        }
    }
});
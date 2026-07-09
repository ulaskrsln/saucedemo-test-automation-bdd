import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    // Sürdürülebilirlik ve Güvenlik: Element locatörlerini private ve readonly yaparak korumaya alıyoruz.
    readonly page: Page;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessageContainer: Locator;
    private readonly inventoryContainer: Locator;

    // Bağımlılık Enjeksiyonu (Dependency Injection): Tarayıcı sayfa nesnesi dışarıdan bu sınıfa aktarılır.
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessageContainer = page.locator('[data-test="error"]');
        this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    }

    /**
     * Kullanıcıyı SauceDemo ana sayfasına götürür.
     */
    async navigate() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    /**
     * Kullanıcı adı alanını doldurur.
     */
    async enterUsername(username: string) {
        if (username.trim() !== '') {
            await this.usernameInput.fill(username);
        }
    }

    /**
     * Şifre alanını doldurur.
     */
    async enterPassword(password: string) {
        if (password.trim() !== '') {
            await this.passwordInput.fill(password);
        }
    }

    /**
     * Login butonuna tıklar.
     */
    async clickLogin() {
        await this.loginButton.click();
    }

    /**
     * UI'da beliren hata mesajının metnini döndürür.
     */
    async getErrorMessage(): Promise<string> {
        await expect(this.errorMessageContainer).toBeVisible();
        return await this.errorMessageContainer.innerText();
    }

    /**
     * Başarılı giriş sonrasında envanter sayfasının yüklendiğini doğrular.
     */
    async verifySuccessfulLogin() {
        await expect(this.inventoryContainer).toBeVisible();
        await expect(this.page).toHaveURL(/.*inventory.html/);
    }
}
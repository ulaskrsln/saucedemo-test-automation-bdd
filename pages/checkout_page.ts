import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    private readonly checkoutButton: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly postalCodeInput: Locator;
    private readonly continueButton: Locator;
    private readonly finishButton: Locator;
    private readonly completeHeader: Locator;
    private readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.completeHeader = page.locator('[data-test="complete-header"]');
        // NOT: login sayfasıyla aynı data-test="error" konteyneri kullanılıyor,
        // inspector'dan bu sayfa özelinde de doğrula.
        this.errorMessage = page.locator('[data-test="error"]');
    }

    /**
     * Alışveriş sepeti sayfasındaki checkout butonuna tıklar.
     */
    async clickCheckout() {
        await this.checkoutButton.click();
    }

    /**
     * Müşterinin adını girer.
     */
    async enterFirstName(firstName: string) {
        await this.firstNameInput.fill(firstName);
    }

    /**
     * Müşterinin soyadını girer.
     */
    async enterLastName(lastName: string) {
        await this.lastNameInput.fill(lastName);
    }

    /**
     * Müşterinin posta kodunu girer.
     */
    async enterPostalCode(postalCode: string) {
        await this.postalCodeInput.fill(postalCode);
    }

    /**
     * Ad, soyad ve posta kodunu tek bir metotla girmek için kolaylık sağlar.
     */
    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);
        await this.enterPostalCode(postalCode);
    }

    /**
     * Devam et (Continue) butonuna tıklar.
     */
    async clickContinue() {
        await this.continueButton.click();
    }

    /**
     * Siparişi tamamla (Finish) butonuna tıklar.
     */
    async clickFinish() {
        await this.finishButton.click();
    }

    /**
     * Sipariş tamamlandı mesajını (Complete Header) döndürür.
     */
    async getCompleteMessage(): Promise<string> {
        return (await this.completeHeader.textContent()) || '';
    }

    /**
     * Checkout adım 1'de eksik/geçersiz bilgi girildiğinde çıkan hata mesajını döndürür.
     */
    async getErrorMessage(): Promise<string> {
        return (await this.errorMessage.textContent()) || '';
    }
}
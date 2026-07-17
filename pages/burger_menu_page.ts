import { Page, Locator } from '@playwright/test';

export class BurgerMenuPage {
    readonly page: Page;
    private readonly openMenuButton: Locator;
    private readonly closeMenuButton: Locator;
    private readonly logoutLink: Locator;
    private readonly resetStateLink: Locator;

    constructor(page: Page) {
        this.page = page;
        // NOT: data-test="open-menu" / "close-menu" değerleri gerçek <button>'ın
        // İÇİNDEKİ <img> elementinde duruyor, buton'un kendisinde değil. img'e
        // tıklamaya çalışınca üstündeki gerçek buton tıklamayı "intercept" ediyor
        // ve Playwright sonsuz retry'a giriyor. Bu yüzden burada istisnai olarak
        // data-test yerine SauceDemo'nun stabil buton id'lerini kullanıyoruz.
        this.openMenuButton = page.locator('#react-burger-menu-btn');
        this.closeMenuButton = page.locator('#react-burger-cross-btn');
        this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
        this.resetStateLink = page.locator('[data-test="reset-sidebar-link"]');
    }

    /**
     * Burger menüyü açar.
     */
    async openMenu() {
        await this.openMenuButton.click();
    }

    /**
     * Burger menüyü kapatır.
     */
    async closeMenu() {
        await this.closeMenuButton.click();
    }

    /**
     * Menüyü açıp "Logout" linkine tıklayarak oturumu kapatır.
     */
    async logout() {
        await this.openMenu();
        await this.logoutLink.click();
    }

    /**
     * Menüyü açıp "Reset App State" linkine tıklayarak sepeti/uygulama durumunu sıfırlar.
     */
    async resetAppState() {
        await this.openMenu();
        await this.resetStateLink.click();
        await this.closeMenu();
    }
}
import { Page, Locator } from '@playwright/test'; // expect'i sildik, çünkü burada yeri yok!

export class InventoryPage {
    readonly page: Page;
    private readonly addToCartButton: Locator;
    private readonly cartIcon: Locator;
    private readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.cartIcon = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    /**
     * "Sauce Labs Backpack" ürününü sepete ekler.
     */
    async addProductToCart() {
        await this.addToCartButton.click();
    }

    /**
     * Sepet ikonunun üzerindeki metni (sayıyı) döndürür.
     */
    async getCartBadgeText(): Promise<string | null> {
        return await this.cartBadge.textContent();
    }

    /**
     * Sepet ikonuna tıklayarak sepet (Cart) sayfasına gider.
     */
    async goToCart() {
        await this.cartIcon.click();
    }
}
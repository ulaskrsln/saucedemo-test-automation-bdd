import { Page, Locator } from '@playwright/test'; // expect'i sildik, çünkü burada yeri yok!

export class InventoryPage {
    readonly page: Page;
    private readonly cartIcon: Locator;
    private readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartIcon = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    /**
     * Ürün adını SauceDemo'nun data-test slug formatına çevirir.
     * Örn: "Sauce Labs Backpack" -> "sauce-labs-backpack"
     */
    private toTestId(productName: string): string {
        return productName.trim().toLowerCase().replace(/\s+/g, '-');
    }

    /**
     * Verilen ürünün "Add to cart" butonunu bulur.
     */
    private addToCartButton(productName: string): Locator {
        return this.page.locator(`[data-test="add-to-cart-${this.toTestId(productName)}"]`);
    }

    /**
     * Verilen ürünün "Remove" butonunu bulur (sepete eklendikten sonra buton bu hale döner).
     * NOT: data-test="remove-{slug}" formatı inspector'dan doğrulanmalı.
     */
    private removeButton(productName: string): Locator {
        return this.page.locator(`[data-test="remove-${this.toTestId(productName)}"]`);
    }

    /**
     * Verilen ürünü sepete ekler.
     */
    async addProductToCart(productName: string) {
        await this.addToCartButton(productName).click();
    }

    /**
     * Verilen ürünü sepetten çıkarır (inventory sayfasındaki "Remove" butonuyla).
     */
    async removeProductFromCart(productName: string) {
        await this.removeButton(productName).click();
    }

    /**
     * Birden fazla ürünü sırayla sepete ekler.
     */
    async addMultipleProductsToCart(productNames: string[]) {
        for (const name of productNames) {
            await this.addProductToCart(name);
        }
    }

    /**
     * Sepet ikonunun üzerindeki metni (sayıyı) döndürür.
     * Sepet boşsa badge DOM'da hiç bulunmadığı için null döner.
     */
    async getCartBadgeText(): Promise<string | null> {
        if (await this.cartBadge.count() === 0) {
            return null;
        }
        return await this.cartBadge.textContent();
    }

    /**
     * Sepet badge'inin şu anda görünür olup olmadığını döndürür.
     * Boş sepet senaryolarını doğrulamak için kullanılır.
     */
    async isCartBadgeVisible(): Promise<boolean> {
        return await this.cartBadge.isVisible();
    }

    /**
     * Sepet ikonuna tıklayarak sepet (Cart) sayfasına gider.
     */
    async goToCart() {
        await this.cartIcon.click();
    }
}
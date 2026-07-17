import { Page, Locator } from '@playwright/test';

export class ProductDetailPage {
    readonly page: Page;
    private readonly itemName: Locator;
    private readonly itemPrice: Locator;
    private readonly itemDesc: Locator;
    private readonly backButton: Locator;
    private readonly addToCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.itemName = page.locator('[data-test="inventory-item-name"]');
        this.itemPrice = page.locator('[data-test="inventory-item-price"]');
        this.itemDesc = page.locator('[data-test="inventory-item-desc"]');
        this.backButton = page.locator('[data-test="back-to-products"]');
        // NOT: liste sayfasının aksine burada slug YOK — tek ürün olduğu için
        // SauceDemo generic "add-to-cart" / "remove" data-test kullanıyor (doğrulandı).
        this.addToCartButton = page.locator('[data-test="add-to-cart"]');
    }

    /**
     * Detay sayfasındaki ürün adını döndürür.
     */
    async getProductName(): Promise<string> {
        return (await this.itemName.textContent()) || '';
    }

    /**
     * Detay sayfasındaki ürün fiyatını döndürür.
     */
    async getProductPrice(): Promise<string> {
        return (await this.itemPrice.textContent()) || '';
    }

    /**
     * Detay sayfasındaki ürün açıklamasını döndürür.
     */
    async getProductDescription(): Promise<string> {
        return (await this.itemDesc.textContent()) || '';
    }

    /**
     * Detay sayfasından ürünü sepete ekler (buton generic, ürün adı parametresi gerekmiyor).
     */
    async addToCart() {
        await this.addToCartButton.click();
    }

    /**
     * "Back to products" butonuna tıklayarak inventory sayfasına döner.
     */
    async goBackToProducts() {
        await this.backButton.click();
    }
}
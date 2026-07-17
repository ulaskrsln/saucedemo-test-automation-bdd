import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly productImages: Locator;
  readonly cartIcon: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productImages = page.locator('.inventory_item_img img');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  // --- ÜRÜN DETAY METODU (product_detail_steps.ts için) ---
  async goToProductDetail(productName: string): Promise<void> {
    const productLink = this.page.locator('.inventory_item_name', { hasText: productName });
    await productLink.click();
  }

  // --- SEPET METOTLARI (cart_steps.ts için) ---
  async addProductToCart(productName: string): Promise<void> {
    const addButton = this.page.locator(`.inventory_item:has-text("${productName}") button:has-text("Add to cart")`);
    await addButton.click();
  }

  async addMultipleProductsToCart(productNames: string[]): Promise<void> {
    for (const name of productNames) {
      await this.addProductToCart(name);
    }
  }

  async removeProductFromCart(productName: string): Promise<void> {
    const removeButton = this.page.locator(`.inventory_item:has-text("${productName}") button:has-text("Remove")`);
    await removeButton.click();
  }

  async isCartBadgeVisible(): Promise<boolean> {
    return await this.cartBadge.isVisible();
  }

  async getCartBadgeText(): Promise<string> {
    return (await this.cartBadge.textContent()) || '';
  }

  async goToCart(): Promise<void> {
    await this.cartIcon.click();
  }

  // --- PROBLEM USER TESTİ İÇİN METOT ---
  async getAllProductImageSrcs(): Promise<string[]> {
    const count = await this.productImages.count();
    const srcs: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const src = await this.productImages.nth(i).getAttribute('src');
      if (src) {
        srcs.push(src);
      }
    }
    return srcs;
  }
}
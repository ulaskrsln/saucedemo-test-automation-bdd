import { Page, Locator } from '@playwright/test';

// Sorting sayfası için Page Object Model sınıfı
// Not: Bu sınıf içinde KESİNLİKLE 'expect' kullanılmaz. Doğrulamalar Step Definition dosyalarında yapılır.
export class SortingPage {
  private readonly page: Page;

  // Locator tanımlamaları - data-test attribute ve class selector öncelikli
  private readonly sortDropdown: Locator;
  private readonly productNames: Locator;
  private readonly productPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = this.page.locator('[data-test="product-sort-container"]');
    this.productNames = this.page.locator('.inventory_item_name');
    this.productPrices = this.page.locator('.inventory_item_price');
  }

  /**
   * Dropdown menüsünden verilen etikete (label) göre sıralama seçeneğini seçer.
   * Örn: "Name (A to Z)", "Price (low to high)"
   */
  async selectSortOption(sortOption: string): Promise<void> {
    await this.sortDropdown.selectOption({ label: sortOption });
  }

  /**
   * Ekrandaki tüm ürün isimlerini sırasıyla string dizisi olarak döndürür.
   */
  async getProductNames(): Promise<string[]> {
    return await this.productNames.allTextContents();
  }

  /**
   * Ekrandaki tüm ürün fiyatlarını '$' işaretinden arındırarak number dizisi olarak döndürür.
   */
  async getProductPrices(): Promise<number[]> {
    const rawPrices = await this.productPrices.allTextContents();
    return rawPrices.map((price) => parseFloat(price.replace('$', '').trim()));
  }
}
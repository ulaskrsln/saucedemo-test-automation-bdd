import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory_page';
import { ProductDetailPage } from '../pages/product_detail_page';

When('I click on the product {string}', async function (productName: string) {
    const inventory = new InventoryPage(this.page);
    await inventory.goToProductDetail(productName);
});

Then('I should see the product detail for {string}', async function (productName: string) {
    const detailPage = new ProductDetailPage(this.page);
    const actualName = await detailPage.getProductName();
    expect(actualName).toBe(productName);
});

When('I add the product to the cart from the detail page', async function () {
    const detailPage = new ProductDetailPage(this.page);
    await detailPage.addToCart();
});

When('I click the back to products button', async function () {
    const detailPage = new ProductDetailPage(this.page);
    await detailPage.goBackToProducts();
});
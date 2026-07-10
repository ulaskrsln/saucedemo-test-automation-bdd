import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory_page';

When('I add the product {string} to the cart', async function (productName: string) {
    // page yerine this.page kullanıyoruz (World nesnesinden geliyor)
    const inventory = new InventoryPage(this.page); 
    await inventory.addProductToCart();
});

Then('the cart badge should display {string}', async function (expected: string) {
    const inventory = new InventoryPage(this.page);
    const badgeText = await inventory.getCartBadgeText();
    await expect(badgeText).toBe(expected);
});

When('I click the cart icon', async function () {
    const inventory = new InventoryPage(this.page);
    await inventory.goToCart();
});

Then('I should be on the Cart page', async function () {
    // Doğrulama yaparken de this.page kullanıyoruz
    await expect(this.page).toHaveURL(/.*cart.html/);
});

Then('the cart should contain {string}', async function (productName: string) {
    // Sayfadaki elementi bulurken this.page
    const item = this.page.locator('.inventory_item_name', { hasText: productName });
    await expect(item).toBeVisible();
});
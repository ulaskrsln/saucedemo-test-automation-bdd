import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory_page';
import { page } from './login_steps'; // Export ettiğimiz page

When('I add the product {string} to the cart', async function (productName: string) {
    const inventory = new InventoryPage(page); // 'as Page' gerek yok, zaten tip belli
    await inventory.addProductToCart();
});

Then('the cart badge should display {string}', async function (expected: string) {
    const inventory = new InventoryPage(page);
    const badgeText = await inventory.getCartBadgeText(); // Yeni metot ismimiz
    await expect(badgeText).toBe(expected); // Playwright expect ile doğrudan karşılaştırma
});

When('I click the cart icon', async function () {
    const inventory = new InventoryPage(page);
    await inventory.goToCart();
});

Then('I should be on the Cart page', async function () {
    await expect(page).toHaveURL(/.*cart.html/);
});

Then('the cart should contain {string}', async function (productName: string) {
    const item = page.locator('.inventory_item_name', { hasText: productName });
    await expect(item).toBeVisible();
});
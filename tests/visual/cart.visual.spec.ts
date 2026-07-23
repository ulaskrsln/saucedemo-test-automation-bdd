import { test, expect } from '@playwright/test';
import { loginAs } from './helpers';
import { InventoryPage } from '../../pages/inventory_page';

test.describe('Visual Regression - Cart', () => {

  test('empty cart page matches baseline', async ({ page }) => {
    await loginAs(page, 'standard_user');
    const inventory = new InventoryPage(page);
    await inventory.goToCart();

    await expect(page).toHaveScreenshot('cart-empty.png', {
      maxDiffPixelRatio: 0.01,
      animations: 'disabled',
    });
  });

  test('cart with one product matches baseline', async ({ page }) => {
    await loginAs(page, 'standard_user');
    const inventory = new InventoryPage(page);
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.goToCart();

    // Sadece ürün listesi alanını hedefliyoruz, badge/sayaç gibi
    // dinamik olmayan ama önemsiz alanları dışarıda bırakıyoruz.
    const cartList = page.locator('.cart_list');
    await expect(cartList).toHaveScreenshot('cart-with-item.png', {
      maxDiffPixelRatio: 0.01,
      animations: 'disabled',
    });
  });

});
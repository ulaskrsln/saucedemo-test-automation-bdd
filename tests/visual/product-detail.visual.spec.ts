import { test, expect } from '@playwright/test';
import { loginAs } from './helpers';
import { InventoryPage } from '../../pages/inventory_page';

test.describe('Visual Regression - Product Detail', () => {

  test('product detail page matches baseline', async ({ page }) => {
    await loginAs(page, 'standard_user');
    const inventory = new InventoryPage(page);
    await inventory.goToProductDetail('Sauce Labs Backpack');

    await expect(page).toHaveScreenshot('product-detail-backpack.png', {
      maxDiffPixelRatio: 0.01,
      animations: 'disabled',
    });
  });

});
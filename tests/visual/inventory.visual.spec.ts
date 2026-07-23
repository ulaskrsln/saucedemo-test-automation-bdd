import { test, expect } from '@playwright/test';
import { loginAs } from './helpers';

test.describe('Visual Regression - Inventory Page', () => {

  test('standard_user inventory page matches baseline', async ({ page }) => {
    await loginAs(page, 'standard_user');
    const container = page.locator('[data-test="inventory-container"]');
    await expect(container).toHaveScreenshot('inventory-standard-user.png', {
      maxDiffPixelRatio: 0.01,
      animations: 'disabled',
    });
  });

  test('visual_user inventory page shows the known broken first image', async ({ page }) => {
    // Bu baseline BİLEREK bozuk resmi içerecek şekilde kaydedilecek —
    // amaç bug'ı düzeltmek değil, bug'ın hiç DEĞİŞMEDİĞİNİ garanti altına almak.
    await loginAs(page, 'visual_user');
    const container = page.locator('[data-test="inventory-container"]');
    await expect(container).toHaveScreenshot('inventory-visual-user.png', {
      maxDiffPixelRatio: 0.01,
      animations: 'disabled',
    });
  });

});
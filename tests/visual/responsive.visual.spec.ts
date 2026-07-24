import { test, expect } from '@playwright/test';
import { loginAs } from './helpers';

test.describe('Visual Regression - Responsive', () => {

  test('inventory page - mobile viewport (iPhone X)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await loginAs(page, 'standard_user');

    await expect(page).toHaveScreenshot('inventory-mobile.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
      animations: 'disabled',
    });
  });

});
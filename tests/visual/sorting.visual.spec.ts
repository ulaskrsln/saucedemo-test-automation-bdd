import { test, expect } from '@playwright/test';
import { loginAs } from './helpers';
import { SortingPage } from '../../pages/sorting_page';

test.describe('Visual Regression - Sorting', () => {

  test('inventory sorted by price low to high matches baseline', async ({ page }) => {
    await loginAs(page, 'standard_user');
    const sortingPage = new SortingPage(page);
    await sortingPage.selectSortOption('Price (low to high)');

    const container = page.locator('[data-test="inventory-container"]');
    await expect(container).toHaveScreenshot('inventory-sorted-price-asc.png', {
      maxDiffPixelRatio: 0.01,
      animations: 'disabled',
    });
  });

});
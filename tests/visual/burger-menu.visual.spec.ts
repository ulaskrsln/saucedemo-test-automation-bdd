import { test, expect } from '@playwright/test';
import { loginAs } from './helpers';
import { BurgerMenuPage } from '../../pages/burger_menu_page';

test.describe('Visual Regression - Burger Menu', () => {

  test('open burger menu matches baseline', async ({ page }) => {
    await loginAs(page, 'standard_user');
    const menu = new BurgerMenuPage(page);
    await menu.openMenu();

    // Menü animasyonla açılıyor, kapanmadan/kaymadan önce stabil hale
    // gelmesi için kısa bir bekleme; toHaveScreenshot'un kendi
    // "waitForTimeout" gibi bir opsiyonu yok, bu yüzden burada
    // Playwright'in auto-wait'ine güveniyoruz (menü elementi visible olunca devam eder).
    const menuPanel = page.locator('.bm-menu-wrap');
    await expect(menuPanel).toBeVisible();

    await expect(page).toHaveScreenshot('burger-menu-open.png', {
      maxDiffPixelRatio: 0.01,
      animations: 'disabled',
    });
  });

});
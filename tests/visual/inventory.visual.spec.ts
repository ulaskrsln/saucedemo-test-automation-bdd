import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login_page';

test.describe('Visual Regression - Inventory Page', () => {

  test('standard_user inventory page matches baseline', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.enterUsername('standard_user');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickLogin();

    await expect(page).toHaveScreenshot('inventory-standard-user.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01, // %1 tolerans - font/anti-aliasing gürültüsü için
    });
  });

  test('visual_user inventory page shows the known broken first image', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.enterUsername('visual_user');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickLogin();

    // Bu baseline BİLEREK bozuk resmi içerecek şekilde kaydedilecek —
    // amaç bug'ı düzeltmek değil, bug'ın hiç DEĞİŞMEDİĞİNİ garanti altına almak.
    // İleride SauceDemo bu görseli değiştirirse test kırmızı olur ve haberimiz olur.
    await expect(page).toHaveScreenshot('inventory-visual-user.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });

});
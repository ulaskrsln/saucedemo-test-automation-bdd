import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login_page';

test.describe('Visual Regression - Login Error States', () => {

  test('locked out user error message matches baseline', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.enterUsername('locked_out_user');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickLogin();

    // Sadece login container'ı hedefliyoruz — hata kutusunun
    // konumu, rengi ve metni tek bir noktada doğrulanıyor.
    const loginContainer = page.locator('.login_container');
    await expect(loginContainer).toHaveScreenshot('login-locked-out-error.png', {
      maxDiffPixelRatio: 0.01,
      animations: 'disabled',
    });
  });

});
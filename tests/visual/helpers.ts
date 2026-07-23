import { Page } from '@playwright/test';
import { LoginPage } from '../../pages/login_page';

/**
 * Görsel regresyon testleri için ortak login yardımcısı.
 * Her .visual.spec.ts dosyasında tekrar login kodu yazmamak için.
 */
export async function loginAs(page: Page, username: string, password: string = 'secret_sauce') {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.enterUsername(username);
  await loginPage.enterPassword(password);
  await loginPage.clickLogin();
}
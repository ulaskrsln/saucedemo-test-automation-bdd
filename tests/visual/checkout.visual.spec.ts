import { test, expect } from '@playwright/test';
import { loginAs } from './helpers';
import { InventoryPage } from '../../pages/inventory_page';
import { CheckoutPage } from '../../pages/checkout_page';

test.describe('Visual Regression - Checkout', () => {

  test('checkout step one form matches baseline', async ({ page }) => {
    await loginAs(page, 'standard_user');
    const inventory = new InventoryPage(page);
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.goToCart();

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.clickCheckout();

    await expect(page).toHaveScreenshot('checkout-step-one.png', {
      maxDiffPixelRatio: 0.01,
      animations: 'disabled',
    });
  });

  test('checkout complete page matches baseline', async ({ page }) => {
    // Bu sayfa statik ve hiç değişmiyor — baseline testi için ideal,
    // en ufak bir kırılma (ör. bir CSS güncellemesi) hemen yakalanır.
    await loginAs(page, 'standard_user');
    const inventory = new InventoryPage(page);
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.goToCart();

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.clickCheckout();
    await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
    await checkoutPage.clickContinue();
    await checkoutPage.clickFinish();

    await expect(page).toHaveScreenshot('checkout-complete.png', {
      maxDiffPixelRatio: 0.01,
      animations: 'disabled',
    });
  });

});
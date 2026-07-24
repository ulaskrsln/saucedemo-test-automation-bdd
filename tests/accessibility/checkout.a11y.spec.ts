import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { loginAs } from '../visual/helpers';
import { InventoryPage } from '../../pages/inventory_page';
import { CheckoutPage } from '../../pages/checkout_page';

test.describe('Accessibility - Checkout Page', () => {

  test('checkout step one has no serious or critical WCAG violations', async ({ page }) => {
    await loginAs(page, 'standard_user');
    const inventory = new InventoryPage(page);
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.goToCart();
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.clickCheckout();

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    const seriousOrCritical = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical'
    );

    expect(
      seriousOrCritical,
      `Beklenmeyen erişilebilirlik ihlalleri: ${JSON.stringify(seriousOrCritical.map(v => v.id))}`
    ).toEqual([]);
  });

});
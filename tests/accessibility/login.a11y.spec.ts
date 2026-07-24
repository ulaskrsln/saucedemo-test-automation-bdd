import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { LoginPage } from '../../pages/login_page';

test.describe('Accessibility - Login Page', () => {

  test('login page has no serious or critical WCAG violations', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();

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
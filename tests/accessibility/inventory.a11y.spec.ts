import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { loginAs } from '../visual/helpers';

test.describe('Accessibility - Inventory Page', () => {

  test('inventory page has no serious or critical WCAG violations', async ({ page }) => {
    await loginAs(page, 'standard_user');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    const seriousOrCritical = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical'
    );

    // Bilinen ihlal: sort dropdown'ın accessible name'i yok (select-name, critical).
    // Bunu şu an düzeltmiyoruz (uygulama kodu bize ait değil, Sauce Demo'nun
    // kendi sitesi), ama görmezden gelmiyoruz — bilinçli olarak izliyoruz.
    // Bu listeden çıkan HERHANGİ yeni bir critical/serious ihlal testi kırmalı.
    const knownViolations = ['select-name'];
    const unexpectedViolations = seriousOrCritical.filter(
      (v) => !knownViolations.includes(v.id)
    );

    expect(
      unexpectedViolations,
      `Beklenmeyen erişilebilirlik ihlalleri bulundu: ${JSON.stringify(unexpectedViolations.map(v => v.id))}`
    ).toEqual([]);
  });

});
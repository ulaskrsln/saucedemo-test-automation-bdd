# SauceDemo E2E Test Framework — Repo Context

## Stack
- Playwright + Cucumber.js (TypeScript), BDD yaklaşımı
- Hedef uygulama: https://www.saucedemo.com/
- Test izolasyonu: Cucumber `World` pattern (bkz. support/world.ts, support/hook.ts)

## Klasör yapısı
- `features/` — Gherkin (.feature) senaryoları
- `pages/` — Page Object Model sınıfları
- `steps/` — step definitions (feature ↔ page object bağlantısı)
- `support/` — World tanımı, hooks (Before/After), global config
- `specs/` — Playwright Agents (planner/generator/healer) için test planları
- `tests/` — native Playwright Test dosyaları (BDD dışı, Playwright Agents çıktısı)
- `.github/agents/` — özel Copilot agent tanımları

## Mimari Kurallar (KESİN — sapma yok)

1. **Design Pattern:** Page Object Model (POM) zorunlu.
2. **State Management:** Senaryolar arası veri/tarayıcı paylaşımı için `export/import`
   KULLANILMAZ. İzolasyon için Cucumber `World` nesnesi (`this.page`, `this.browser`) kullanılır.
3. **Locators:** Öncelik sırası: `data-test` attribute > text > CSS selector.
   Locator'lar page sınıflarında `private readonly` olarak tanımlanır.
   **ASLA CSS class isminden data-test tahmin etme** — SauceDemo'da kebab-case/underscore
   tutarsız kullanılıyor, her zaman gerçek attribute'u doğrula.
4. **Assertions:** Page sınıfları içinde KESİNLİKLE `expect` kullanılmaz.
   Doğrulamalar sadece step definition dosyalarında yapılır.
5. **Language:** Gherkin senaryoları İngilizce yazılır. Kod içi yorumlar Türkçe/İngilizce
   karışık olabilir (mevcut dosyalarda Türkçe yorum ağırlıklı).
6. **Dependency Injection:** Page nesneleri constructor'da `Page` parametresi alır,
   step definition içinde `new PageClass(this.page)` ile örneklenir.

## Test Data (SauceDemo standart kullanıcıları)
- Geçerli şifre: `secret_sauce`
- Kullanıcılar: `standard_user`, `locked_out_user`, `problem_user`, `performance_glitch_user`
- Kilitli kullanıcı hatası: `Epic sadface: Sorry, this user has been locked out.`
- Geçersiz kimlik hatası: `Epic sadface: Username and password do not match any user in this service`

## Notlar
- `pages/login_page.ts` ve `steps/login_steps.ts` bu projedeki referans örnektir —
  yeni page/step yazarken stilini birebir takip et.
- Path'e özel detaylı kurallar için `.github/instructions/*.instructions.md` dosyalarına bak.
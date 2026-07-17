---
applyTo: "pages/**"
---

- Dosya adı: `snake_case.ts` (mevcut: `login_page.ts`, `inventory_page.ts`, `checkout_page.ts`, `sorting_page.ts`), sınıf adı `PascalCase` (`LoginPage`).
- Constructor imzası: `constructor(page: Page)`, ardından tüm locator'lar `private readonly` olarak tanımlanır ve constructor içinde initialize edilir.
- `readonly page: Page;` public alan olarak tutulur (World'den page erişimi gerekebilir).
- Metotlar davranışı ifade eder, selector'ı değil: `enterUsername(username)`, `clickLogin()`, `verifySuccessfulLogin()` — `click(selector)` gibi genel isimler KULLANILMAZ.
- Her public metot üstünde kısa bir Türkçe JSDoc yorumu olur (bkz. login_page.ts).
- KESİNLİKLE `expect` import etme/kullanma gereken assertion'lar hariç — mevcut kodda
  `verifySuccessfulLogin` gibi "durum doğrulayan" metotlar page içinde `expect` kullanabilir
  (bu bir istisna: sayfanın kendi başarı durumunu doğrulaması). Ama iş mantığı assertion'ları
  (beklenen değerle karşılaştırma gibi) her zaman step definition'da kalır.
- Yeni bir sayfa eklerken önce SauceDemo'da gerçek `data-test` attribute'lerini inspector'dan
  doğrula, class isminden tahmin etme.
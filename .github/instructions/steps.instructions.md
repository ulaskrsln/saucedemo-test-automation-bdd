---
applyTo: "steps/**"
---

- Dosya adı: `{feature}_steps.ts` (mevcut: `login_steps.ts`, `cart_steps.ts`, `checkout_steps.ts`, `sorting_steps.ts`).
- Her step fonksiyonu içinde ilgili page object `new PageClass(this.page)` ile örneklenir —
  page object'i step'ler arası paylaşma, her step kendi instance'ını oluşturur.
- `Given/When/Then` importu `@cucumber/cucumber`'dan yapılır.
- Step metinlerinde parametreler `{string}` placeholder ile alınır, fonksiyon imzasında
  tip belirtilir (`username: string`).
- Assertion/karşılaştırma mantığı burada yaşar (page object'in döndürdüğü değeri kontrol et,
  gerekirse anlamlı hata mesajı fırlat — bkz. login_steps.ts'teki `Then` bloğu).
- Yeni step yazmadan önce features/ altındaki ilgili .feature dosyasını oku, aynı step
  metnini tekrar tanımlama — Cucumber "ambiguous step" hatası verir.
---
applyTo: "features/**"
---

- Gherkin İngilizce yazılır.
- Veri odaklı senaryolar için `Scenario Outline` + `Examples` tablosu kullanılır
  (bkz. login.feature) — tekil `Scenario` yerine tercih edilir çünkü aynı akışın
  birden fazla veri kombinasyonuyla test edilmesini tek yerde okunabilir tutar.
- Senaryo/feature başlıkları iş kuralı gibi yazılır ("User login with valid and
  invalid credentials"), teknik detay (selector, class adı) içermez.
- Given/When/Then sırası korunur; aynı tipte birden fazla adım gerekiyorsa `And` kullanılır.
- Yeni bir .feature dosyası eklerken mevcut step tanımlarını (steps/ altında) kontrol et,
  varsa yeniden kullan; yoksa yeni step ekle.
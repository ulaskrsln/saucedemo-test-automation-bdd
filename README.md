# SauceDemo E2E Test Framework

![CI](https://github.com/ulaskrsln/saucedemo-test-automation-bdd/actions/workflows/playwright.yml/badge.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-Playwright-blue)
![BDD](https://img.shields.io/badge/BDD-Cucumber.js-brightgreen)

Modern web otomasyonu için **Playwright** ve **Cucumber (BDD)** kullanılarak geliştirilmiş, **World Pattern** ile izole edilmiş, sürdürülebilir bir uçtan uca (E2E) test mimarisi.

## 🚀 Projenin Amacı

Bir backend yazılımcısı olarak edindiğim sistem tasarımı ve mimari disiplini, test otomasyonu dünyasına taşıyorum. Bu proje "sadece test yazmak" değil, **ölçeklenebilir, bakımı kolay, CI/CD'ye entegre bir test framework'ü tasarlamak** konusundaki yetkinliğimi göstermek için hazırlanmış bir vitrin projesidir.

## 🛠 Teknik Yetenekler

- **Framework:** Playwright (TypeScript), Cucumber.js (BDD)
- **Mimari:** Page Object Model (POM), World Pattern (Dependency Injection)
- **CI/CD:** GitHub Actions — her push'ta otomatik test çalıştırma
- **Kapsam:** 15+ senaryo, happy path ve edge case'leri birlikte kapsıyor
  - **Kimlik Doğrulama:** Geçerli/geçersiz giriş, kilitli kullanıcı (`locked_out_user`) senaryosu
  - **Sepet & Checkout:** Ürün ekleme/çıkarma, eksik bilgiyle checkout validasyonu
  - **Sıralama (Sorting):** Fiyat ve isme göre veri odaklı (Scenario Outline) doğrulama

## 🏗 Mimari Kararlar

- **World Pattern tercih edildi (Global Scope yerine):** Her senaryonun kendi izole context'inde (page, browser instance, test verisi) çalışmasını sağlamak ve testlerin paralel koşulabilirliğini garanti altına almak için. Global state paylaşımı, paralel çalıştırmada test'ler arası veri sızıntısına yol açabiliyor — World Pattern bunu yapı gereği engelliyor.
- **Page Object Model:** UI elementlerinin ve etkileşim mantığının step definition'lardan ayrıştırılması; selector değişikliklerinin tek bir yerden yönetilmesi.

## 📊 Test Raporu & CI/CD

CI durumunu ve çalışan test sürecini canlı olarak buradan takip edebilirsiniz:
👉 [GitHub Actions — Çalışma Geçmişi](https://github.com/ulaskrsln/saucedemo-test-automation-bdd/actions)

<img width="459" height="313" alt="Test raporu 1" src="https://github.com/user-attachments/assets/b1cbe53b-241f-4f71-93df-7d36addd021d" />
<img width="542" height="251" alt="Test raporu 2" src="https://github.com/user-attachments/assets/b45ded9a-3c7d-46a3-a119-2c0e20b56588" />
<img width="497" height="332" alt="Test raporu 3" src="https://github.com/user-attachments/assets/a7d0bb60-1530-4c53-98a9-28bcb817d34a" />
<img width="482" height="241" alt="Test raporu 4" src="https://github.com/user-attachments/assets/5c2d66f5-666a-40bd-8583-b27aa0e42af9" />

## 📂 Klasör Yapısı

```
├── features/   # BDD Gherkin senaryoları (.feature)
├── pages/      # Page Object sınıfları
├── steps/      # Step definition'lar (senaryo implementasyonu)
├── support/    # World tanımı, hooks, test konfigürasyonu
└── .github/    # CI/CD workflow (GitHub Actions)
```

## 🚀 Kurulum & Çalıştırma

```bash
git clone https://github.com/ulaskrsln/saucedemo-test-automation-bdd.git
cd saucedemo-test-automation-bdd
npm install
npx playwright install
npx cucumber-js
```

## 💡 Geliştirme Yaklaşımı

Bu proje **Pair Programming** metodolojisiyle geliştirildi: mimari tasarım, senaryo kapsamı ve kritik kararlar (ör. World Pattern vs. Global Scope) tarafımca alındı; tekrarlı kod blokları (boilerplate) için AI tabanlı asistanlardan (VSCode-Gemini/Copilot) refaktör desteği alındı. AI, düşünme sürecini değil, yazım hızını destekleyen bir araç olarak kullanıldı.


## 📫 İletişim

Sorularınız veya geri bildirimleriniz için bir issue açabilir ya da [GitHub profilimden](https://github.com/ulaskrsln) ulaşabilirsiniz.

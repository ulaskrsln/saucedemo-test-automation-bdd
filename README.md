
# SauceDemo E2E Test Framework
![CI](https://github.com/ulaskrsln/saucedemo-test-automation-bdd/actions/workflows/playwright.yml/badge.svg)

Modern web otomasyonu için Playwright ve Cucumber (BDD) kullanılarak geliştirilmiş, **World Pattern** ile izole edilmiş bir uçtan uca (E2E) test mimarisi.

## 🚀 Projenin Amacı
Bir backend yazılımcısı olarak edindiğim sistem tasarımı ve mimari disiplinini, test otomasyon dünyasına taşıyarak; sürdürülebilir, paralel koşuma hazır ve yüksek kaliteli bir test stratejisi kurmayı hedefliyorum. Bu proje, "sadece test yazmak" değil, **"ölçeklenebilir test framework'leri tasarlamak"** konusundaki yetkinliğimi göstermek için vitrin projemdir.

## 🛠 Teknik Yetenekler
- **Framework:** Playwright (TypeScript), Cucumber.js (BDD)
- **Mimari:** Page Object Model (POM), World Pattern (Dependency Injection)
- **CI/CD:** GitHub Actions (Build Passing)
- **Kapsam:** 15+ Senaryo (Happy Path & Edge Cases)
    - Kullanıcı Kimlik Doğrulama (Login)
    - Sepet ve Checkout İşlemleri
    - Dinamik Veri Odaklı Sıralama (Sorting)

## 📊 Test Raporu & CI/CD
<img width="459" height="313" alt="{021AD58B-3EB1-480D-A645-E72B4863B159}" src="https://github.com/user-attachments/assets/b1cbe53b-241f-4f71-93df-7d36addd021d" />

<img width="542" height="251" alt="{673BC2DB-E480-4A3D-A8A5-5572A69271EA}" src="https://github.com/user-attachments/assets/b45ded9a-3c7d-46a3-a119-2c0e20b56588" />

<img width="497" height="332" alt="{65BB4870-F99A-41E3-A0D5-A5536FEF8A0D}" src="https://github.com/user-attachments/assets/a7d0bb60-1530-4c53-98a9-28bcb817d34a" />

<img width="482" height="241" alt="{2BE83EF6-6D6A-42E5-9E80-C89D46F7DE8D}" src="https://github.com/user-attachments/assets/5c2d66f5-666a-40bd-8583-b27aa0e42af9" />

https://github.com/ulaskrsln/saucedemo-test-automation-bdd/actions

## 💡 Geliştirme Yaklaşımı
Bu proje, **Pair Programming** metodolojisiyle, mimari tasarımı ve test kapsamı bizzat tarafımca yapılandırılmış; tekrarlı kod blokları (boilerplate) için AI tabanlı asistanlar (Cursor/Copilot) ile refaktör edilmiştir. Mimari kararların (World Pattern vs. Global Scope) tamamı, testlerin paralelleştirilebilirliğini sağlamak adına şahsım tarafından alınmıştır.

## 🚀 Başlangıç
```bash
npm install
npx playwright install
npx cucumber-js

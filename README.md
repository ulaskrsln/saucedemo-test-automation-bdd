

# Playwright BDD Test Framework (SauceDemo)

Bu proje, modern bir web uygulamasının uçtan uca (E2E) otomasyonunu, [Playwright](https://playwright.dev/) ve [Cucumber](https://cucumber.io/) kullanarak; **World Pattern** ve **Page Object Model (POM)** prensiplerine sadık kalarak inşa edilmiştir.

## 🚀 Proje Hakkında
Bu framework, SauceDemo.com'un kritik iş akışlarını doğrulamak için geliştirilmiştir.
- **Teknoloji:** Playwright (TypeScript), Cucumber (BDD)
- **Mimari:** World Pattern, Page Object Model
- **Kapsam:** Login, Kart yönetimi, Checkout süreçleri ve ürün sıralama (Sorting).

## 🛠 Kurulum & Kullanım

1. **Depoyu klonlayın:**
   ```bash
   git clone [repo-url]
   cd [repo-adi]

```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
npx playwright install

```


3. **Testleri çalıştırın:**
```bash
npx cucumber-js

```



## 📂 Klasör Yapısı

* `features/`: BDD Gherkin senaryoları.
* `pages/`: UI elementlerini yöneten Page Object sınıfları.
* `steps/`: Senaryoların gerçeklendiği adım tanımları.
* `support/`: Test konfigürasyonları ve dünya (World) tanımları.

## 💡 Mühendislik Yaklaşımı

Bu framework, AI destekli (Copilot/Cursor) bir "Pair Programming" sürecinde, **Clean Architecture** prensipleri gözetilerek yazılmıştır. Özellikle her senaryonun birbirinden izole edilmesi için **World Pattern** kullanılmış, test verisi tutarlılığı **Scenario Outline** ile veri odaklı hale getirilmiştir.

```

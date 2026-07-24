# SauceDemo E2E Test Framework

![E2E Tests](https://github.com/ulaskrsln/saucedemo-test-automation-bdd/actions/workflows/playwright.yml/badge.svg)
![Visual Regression](https://github.com/ulaskrsln/saucedemo-test-automation-bdd/actions/workflows/visual-tests.yml/badge.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-Playwright-blue)
![BDD](https://img.shields.io/badge/BDD-Cucumber.js-brightgreen)

Modern web otomasyonu için **Playwright** ve **Cucumber (BDD)** kullanılarak geliştirilmiş, **World Pattern** ile izole edilmiş, sürdürülebilir bir uçtan uca (E2E) test mimarisi. AI destekli test üretim süreci ve LLM tabanlı otomatik kök neden analizi (RCA) ile genişletilmiştir.

## 🚀 Projenin Amacı

Bu proje "sadece test yazmak" değil, **ölçeklenebilir, bakımı kolay, CI/CD'ye entegre bir test framework'ü tasarlamak** konusundaki yetkinliği göstermek için hazırlanmış bir vitrin projesidir. Mimari kararlar iddia edilmiyor, ölçülüyor; sınırlar gizlenmiyor, açıkça belirtiliyor.

## 🛠 Teknik Yetenekler

- **Framework:** Playwright (TypeScript), Cucumber.js (BDD)
- **Mimari:** Page Object Model (POM), World Pattern (Dependency Injection)
- **CI/CD:** GitHub Actions — iki ayrı pipeline (E2E/BDD ve Görsel Regresyon), her push'ta otomatik çalışır
- **AI Entegrasyonu:**
  - **Üretim süreci:** Gherkin senaryosu → Page Object → Step Definition akışında Copilot/Gemini, yazılı agent kuralları (`.github/agents/`, `ai_instructions.md`) ile yönlendiriliyor
  - **Analiz süreci:** Test başarısız olduğunda, Groq/Llama tabanlı bir RCA (Root Cause Analysis) modülü otomatik teşhis üretiyor — safe-fail tasarımı sayesinde AI analizi asla ana test sonucunu etkilemiyor
- **Kapsam:** 20+ senaryo — kimlik doğrulama, sepet/checkout, sıralama, burger menü, bilinen kullanıcı tipi anomalileri (`problem_user`, `error_user`, `visual_user`)
- **Görsel Regresyon:** Playwright `toHaveScreenshot()` ile inventory, cart, checkout, burger-menu sayfalarında piksel bazlı UI testi — Docker üzerinden platform-tutarlı baseline üretimi

## 🏗 Mimari Kararlar

### World Pattern (Global State Yerine)

Her senaryonun kendi izole context'inde (page, browser instance) çalışmasını sağlamak için Cucumber'ın `World` mekanizması kullanıldı. Global state paylaşımı (export/import), paralel çalıştırmada testler arası veri sızıntısına yol açabiliyordu — World Pattern bunu yapı gereği engelliyor.

**Ölçüm (iddia değil, gerçek veri):**

| Worker sayısı | Süre | Kazanç |
|---|---|---|
| 1 (seri) | 101 sn | — |
| 2 | 68 sn | %33 |
| 3 | 58 sn | **%43 (optimal)** |
| 4 | 64 sn | 3'ten kötü — kaynak sınırına takılıyor |

CI şu an `--parallel 3` ile çalışıyor.

### Page Object Model

UI elementlerinin ve etkileşim mantığının step definition'lardan ayrıştırılması; selector değişikliklerinin tek bir yerden yönetilmesi. Page sınıflarında assertion kullanılmaz — "ne olduğu" ile "doğru mu" ayrımı hep step definition'da yapılır.

### Locator Stratejisi: data-test > text > CSS class

CSS class isimlerinden locator tahmin etmek, Sauce Demo'nun tutarsız (kebab-case/underscore) isimlendirmesi yüzünden kırılgan testlere yol açtı. Artık her locator DevTools'tan doğrulanarak, `data-test` attribute'u önceliğiyle yazılıyor.

## 🤖 AI Destekli Otomatik Kök Neden Analizi (RCA)

Test başarısız olduğunda, `After` hook'unda otomatik olarak:
1. Hata mesajı, DOM özeti, console hataları ve başarısız network istekleri toplanır
2. Groq/Llama modeline gönderilip 2-3 cümlelik bir teşhis üretilir
3. Terminal ve test raporuna otomatik yazılır — manuel kopyala-yapıştır yok

**Safe-fail tasarımı:** API key eksikse veya servis yanıt vermezse, RCA sessizce devre dışı kalır — ana test sonucu (PASS/FAIL) hiçbir koşulda etkilenmez.

**CI'da doğrulandı:** Bilerek bozulan bir assertion (`checkout.feature`) ile pipeline'da RCA'nın gerçekten çalıştığı test edildi — analiz doğru kategoriyi (test kurgusu hatası) isabetle tespit etti.

## 📊 Görsel Regresyon Testleri

`tests/visual/` altında Playwright'ın native `toHaveScreenshot()` matcher'ı ile inventory, cart, checkout ve burger-menu sayfaları için piksel bazlı UI testleri.

**Platform tutarlılığı sorunu ve çözümü:** Screenshot baseline'ları işletim sistemine göre farklı render edilir (font rendering farkı) — Windows'ta üretilen bir baseline, Ubuntu CI'da yanlışlıkla kırmızı çıkar. Bunun için baseline'lar Playwright'ın resmi Docker image'ı üzerinden, CI ile birebir aynı ortamda üretiliyor:

```bash
docker run --rm -v "${PWD}:/work" -w /work mcr.microsoft.com/playwright:v1.61.1-noble \
  npx playwright test tests/visual --update-snapshots
```

CI'da da aynı image `container:` olarak kullanılıyor (`.github/workflows/visual-tests.yml`), böylece local doğrulama ile CI ortamı tam örtüşüyor.

## 📊 Test Raporu & CI/CD

İki ayrı GitHub Actions pipeline'ı çalışıyor:
- **E2E BDD Tests Pipeline** — Cucumber senaryoları, 3 paralel worker
- **Visual Regression Tests** — Docker container içinde, 3 tarayıcıda (Chromium/Firefox/WebKit) UI testleri

👉 [GitHub Actions — Çalışma Geçmişi](https://github.com/ulaskrsln/saucedemo-test-automation-bdd/actions)

<img width="459" height="313" alt="Test raporu 1" src="https://github.com/user-attachments/assets/b1cbe53b-241f-4f71-93df-7d36addd021d" />
<img width="542" height="251" alt="Test raporu 2" src="https://github.com/user-attachments/assets/b45ded9a-3c7d-46a3-a119-2c0e20b56588" />
<img width="497" height="332" alt="Test raporu 3" src="https://github.com/user-attachments/assets/a7d0bb60-1530-4c53-98a9-28bcb817d34a" />
<img width="482" height="241" alt="Test raporu 4" src="https://github.com/user-attachments/assets/5c2d66f5-666a-40bd-8583-b27aa0e42af9" />

## 📂 Klasör Yapısı
├── features/ # BDD Gherkin senaryoları (.feature)
├── pages/ # Page Object sınıfları
├── steps/ # Step definition'lar (senaryo implementasyonu)
├── support/ # World tanımı, hooks, AI/RCA modülü
├── tests/ # Native Playwright testleri (visual/ dahil)
└── .github/ # CI/CD workflow'ları, AI agent tanımları

## 🚀 Kurulum & Çalıştırma

```bash
git clone https://github.com/ulaskrsln/saucedemo-test-automation-bdd.git
cd saucedemo-test-automation-bdd
npm install
npx playwright install
```

**BDD/E2E testleri:**
```bash
npx cucumber-js --parallel 3
```

**Görsel regresyon testleri (Docker önerilir, platform tutarlılığı için):**
```bash
docker run --rm -v "${PWD}:/work" -w /work mcr.microsoft.com/playwright:v1.61.1-noble npx playwright test tests/visual
```

**RCA için:** `.env` dosyasına `GROQ_API_KEY` ekleyin (opsiyonel — eksikse RCA sessizce devre dışı kalır, testler etkilenmez).

## 🔭 Bilinçli Sınırlar ve Sonraki Adımlar

- Cross-browser E2E (BDD) testleri şu an sadece Chromium'da çalışıyor; görsel testlerde 3 tarayıcı zaten kapsanıyor.
- `error_user`/`visual_user` gibi kullanıcı tipi anomalileri, merkezi `login.feature` DDT tablosuna değil, ayrı bir feature dosyasına konuldu (bilinçli mimari tutarlılık kararı — `problem_user` ile aynı desen).
- RCA, DOM/log içeriğini üçüncü parti bir LLM'e gönderiyor; bu proje herkese açık bir demo sitesi olduğu için risksiz, ama gerçek kullanıcı verisi içeren bir projede önce PII/veri güvenliği değerlendirmesi yapılmalı.

## 💡 Geliştirme Yaklaşımı

Bu proje **Pair Programming** metodolojisiyle geliştirildi: mimari tasarım, senaryo kapsamı ve kritik kararlar (ör. World Pattern vs. Global Scope) tarafımca alındı; tekrarlı kod blokları (boilerplate) için AI tabanlı asistanlardan (VSCode-Gemini/Copilot) refaktör desteği alındı. AI, düşünme sürecini değil, yazım hızını destekleyen bir araç olarak kullanıldı.

## 📫 İletişim

Sorularınız veya geri bildirimleriniz için bir issue açabilir ya da [GitHub profilimden](https://github.com/ulaskrsln) ulaşabilirsiniz.

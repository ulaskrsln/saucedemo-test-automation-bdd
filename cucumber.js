// cucumber.js dosyasının içi buna benzer olmalı:
module.exports = {
  default: {
    requireModule: ['ts-node/register'], // TypeScript desteği
    require: [
      'steps/**/*.ts',    // Adım dosyalarını bul
      'support/**/*.ts'   // YENİ: Altyapı (World ve Hooks) dosyalarını bul!
    ],
    format: ['html:cucumber-report.html'] // Raporlama
  }
}
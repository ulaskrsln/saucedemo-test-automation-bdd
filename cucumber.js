module.exports = {
  default: {
    requireModule: ['ts-node/register'], // TypeScript derleyicisi
    require: ['steps/**/*.ts'],          // Step dosyalarımızın konumu
    paths: ['features/**/*.feature'],    // Feature dosyalarımızın konumu
    format: ['progress', 'html:cucumber-report.html'], // Çıktı ve Rapor formatı
    publishQuiet: true
  }
}
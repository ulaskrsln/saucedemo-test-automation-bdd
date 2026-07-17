// GEÇİCİ TEST: Allure formatter'ı kaldırıp stdout'un çalışıp çalışmadığını doğruluyoruz
module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      'steps/**/*.ts',
      'support/**/*.ts'
    ],
    format: [
      'summary',
      'html:cucumber-report.html'
      // 'allure-cucumberjs/reporter'  <-- GEÇİCİ OLARAK KAPALI
    ]
  }
}
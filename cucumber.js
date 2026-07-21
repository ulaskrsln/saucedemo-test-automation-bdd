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
    ]
  }
}
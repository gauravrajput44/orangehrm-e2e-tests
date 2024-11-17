const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/*.cy.js',
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      configFile: 'cypress/reporter.config.json',
    },
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/reports/screenshots',
    video: true,
    videosFolder: 'cypress/reports/videos',
    defaultCommandTimeout: 10000,
    viewportWidth: 1280,
    viewportHeight: 720
  },
})
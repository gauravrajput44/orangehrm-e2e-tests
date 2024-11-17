// Import commands.js using ES2015 syntax:
import './commands/login.commands'

// Prevent uncaught exception failures
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test for e.g. Status code 500
  return false
})
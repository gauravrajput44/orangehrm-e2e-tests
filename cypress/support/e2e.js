import './commands/login.commands'
import './commands/personal.commands'
import './commands/buzz-feed.commands'

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})
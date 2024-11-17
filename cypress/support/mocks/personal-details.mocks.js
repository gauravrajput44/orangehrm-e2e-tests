export class PersonalDetailsMocks {
  static URL_STRING = '**/web/index.php/api/v2/pim/employees'

  static mockGetPersonalDetails(empNumber = 7) {
    cy.intercept('GET', `${this.URL_STRING}/${empNumber}/personal-details`, {
      fixture: 'personalDetails'
    }).as('getPersonalDetails')
  }

  static mockUpdatePersonalDetails(empNumber = 7) {
    cy.intercept('PUT', `${this.URL_STRING}/${empNumber}/personal-details`, {
      fixture: 'updatedPersonalDetails'
    }).as('updatePersonalDetails')
  }

  static mockUpdatePersonalDetailsFailure(empNumber = 7) {
    cy.intercept('PUT', `${this.URL_STRING}/${empNumber}/personal-details`, {
      statusCode: 500,
      body: {
        error: "Internal Server Error"
      }
    }).as('updatePersonalDetailsError')
  }

  static mockNetworkTimeout(empNumber = '7') {
    cy.intercept('PUT', `${this.URL_STRING}/${empNumber}/personal-details`, {
      forceNetworkError: true
    }).as('networkError')
  }
}
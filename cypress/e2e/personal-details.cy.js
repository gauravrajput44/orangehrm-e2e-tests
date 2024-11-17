import { PersonalDetailsMocks } from '../support/mocks/personal-details.mocks'
import { PERSONAL_SELECTORS } from '../support/selectors/personal.selectors'

const NewFirstName = 'NewFirstName'
const NewLastName = 'NewLastName'

describe('Personal Details Page Tests', () => {
    beforeEach(() => {
        cy.fixture('userCredentials').then((userData) => {
            cy.login(userData.validUser.username, userData.validUser.password)
        })
        PersonalDetailsMocks.mockGetPersonalDetails()
        cy.navigateToMyInfo()
        cy.wait('@getPersonalDetails')

        cy.get(PERSONAL_SELECTORS.form).should('be.visible')

        // Ensure one of the drop-down is loaded
        cy.get(PERSONAL_SELECTORS.inputs.maritalStatus)
            .should('contain', 'Married')
    })

    it('User can see the personal details page with mocked data', () => {
        cy.fixture('personalDetails').then((personalDetails) => {
            const { firstName, lastName, middleName } = personalDetails.data

            cy.get(PERSONAL_SELECTORS.inputs.firstName).then($firstName => {
                expect($firstName.val(), 'First name should be matched with mocked API').to.equal(firstName)
            })

            cy.get(PERSONAL_SELECTORS.inputs.middleName).then($middleName => {
                expect($middleName.val(), 'Middle name should be matched with mocked API').to.equal(middleName)
            })

            cy.get(PERSONAL_SELECTORS.inputs.lastName).then($lastName => {
                expect($lastName.val(), 'Last name should be matched with mocked API').to.equal(lastName)
            })
        })
    })

    it.only('User can update personal details like first name and last name', () => {
        PersonalDetailsMocks.mockUpdatePersonalDetails()
        cy.updateFirstNameAndLastNameDetails(NewFirstName, NewLastName)

        // Wait for API call and verify it was made
        cy.wait('@updatePersonalDetails').its('request.body').should('deep.include', {
            firstName: NewFirstName,
            lastName: NewLastName
        })

        cy.get(PERSONAL_SELECTORS.inputs.firstName).then($firstName => {
            expect($firstName.val(), 'First name should be matched with new first name').to.equal(NewFirstName)
        })

        cy.get(PERSONAL_SELECTORS.inputs.lastName).then($lastName => {
            expect($lastName.val(), 'Last name should be matched with mocked API').to.equal(NewLastName)
        })
    })

    it('The user can verify that no API request is triggered on clicking the Save button if the mandatory field First Name is empty', () => {
        PersonalDetailsMocks.mockUpdatePersonalDetails()

        cy.get(PERSONAL_SELECTORS.inputs.firstName)
            .clear()

        cy.get(PERSONAL_SELECTORS.inputs.save).click()

        cy.get('@updatePersonalDetails.all').should('have.length', 0)
        cy.get('@updatePersonalDetails.all').then((response) => {
            expect(response, 'API call is triggered').to.have.length(0)
        })
    })

    it('User can see error message when PUT API request gets failed', () => {
        PersonalDetailsMocks.mockUpdatePersonalDetailsFailure()

        cy.updateFirstNameAndLastNameDetails(NewFirstName, NewLastName)
        cy.wait('@updatePersonalDetailsError')
        // TODO: verify failure message
       // verifyFailureToastMessage({})
    })

    it('User can see error message when personal details API request timed out', () => {
        PersonalDetailsMocks.mockNetworkTimeout()

        cy.updateFirstNameAndLastNameDetails(NewFirstName, NewLastName)
        cy.wait('@networkError')
        // TODO: verify failure message
        // verifyFailureToastMessage({})
    })
})

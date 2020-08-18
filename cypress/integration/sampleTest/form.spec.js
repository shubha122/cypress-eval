const Form_URL = '/automation-practice-form/'

describe('Forms', () => {
  before(() => {
    cy.visit(Form_URL)

    cy.url()
      .should('eq', Cypress.config().baseUrl + Form_URL)
  })

  it('should display the Autocomplete title', () => {
    cy.get('.main-header')
      .should('contain', 'Practice Form')
  })
})

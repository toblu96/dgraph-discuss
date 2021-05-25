Cypress.Commands.add('changeUser', (username) => {
    cy.get('#current-user-select > button').click()
    cy.get('#current-user-select > ul > li').contains(new RegExp(username, "g")).click()
    cy.get('#current-user-select > button').contains(new RegExp(username, "g"))
})
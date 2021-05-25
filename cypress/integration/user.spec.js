describe('User handling', () => {
    it('should fetch users', () => {
        cy.visit('settings')
        cy.changeUser('Amanda Cerniz')
        cy.get('#user-settings').find('li').should(($li) => {
            if ($li.length < 2) {
                throw new Error('Does not fetch any users')
            }
        })
    })

    it('should render add user page', () => {
        cy.visit('settings')
        cy.get('#add-new-user').should('have.attr', 'href', '/user/new').click()
        cy.get('#username').should('be.empty')
        cy.get('#displayName').should('be.empty')
        cy.get('#avatar-0 > div').should('have.class', 'ring-pink-500')
    })

    it('can cancel the new user creation', () => {
        cy.visit('user/new')
        cy.get('#username').clear();
        cy.get('#username').type('testuser');
        cy.get('#displayName').clear();
        cy.get('#displayName').type('Test User');
        cy.get('#avatar-3 > div > button').click();
        cy.get('#cancel-new-user').click();
        cy.location('pathname').should('eq', '/settings')
    })

    it('can create new user', () => {
        cy.visit('user/new')
        cy.get('#username').clear();
        cy.get('#username').type('testuser');
        cy.get('#displayName').clear();
        cy.get('#displayName').type('Test User');
        cy.get('#avatar-3 > div > button').click();
        cy.get('#save-new-user').click();
        cy.location('pathname').should('eq', '/settings')
    })

    it('should not create second user with same username', () => {
        cy.visit('user/new')
        cy.get('#username').clear();
        cy.get('#username').type('testuser');
        cy.get('#displayName').clear();
        cy.get('#displayName').type('Test User');
        cy.get('#avatar-3 > div > button').click();
        cy.get('#save-new-user').click();
        cy.get('#error-panel').should('be.visible').contains('because id testuser already exists')
    })

    it('can edit user information', () => {
        cy.visit('settings')
        cy.get('#testuser > div > div > button').click();
        cy.get('#edit_user_displayname').clear();
        cy.get('#edit_user_displayname').type('Test User 123');
        cy.get('#edit_user_avatarurl').clear();
        cy.get('#edit_user_avatarurl').type('/images/diggy.png');
        cy.get('#save-user').click();
        // wait for graphql request
        cy.intercept('POST', '/graphql').as('gqlMutation')
        cy.wait('@gqlMutation')
        cy.get('#testuser').find('img').should('have.attr', 'src', '/images/diggy.png');
        cy.get('#testuser').contains('Test User 123');
    })
    it('should list user as global user', () => {
        cy.visit('settings')
        cy.changeUser('Test User 123')
    })
    it('should delete user', () => {
        cy.visit('settings')
        cy.get('#testuser > div > div > button').click();
        cy.get('#delete-user').click();
        // wait for graphql request
        cy.intercept('POST', '/graphql').as('gqlMutation')
        cy.wait('@gqlMutation')
        cy.get('#grah').should('exist');
        cy.get('#testuser').should('not.exist');

    })
    it('should replace global user', () => {
        cy.visit('settings')
        cy.get('#current-user-select > button').click()
        cy.get('#current-user-select > button').should('not.contain', 'Test User 123')
        cy.get('#current-user-select > ul > li').should('not.contain', 'Test User 123')
    })

})
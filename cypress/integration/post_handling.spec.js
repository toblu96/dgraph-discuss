describe('The New Post Page', () => {
    it('should be accessible via header in each page', () => {
        cy.visit('/')
        cy.get('#create-new-post').click()

        cy.location('pathname').should('eq', '/post/new')
    })

    it('should render successfully', () => {
        cy.get('#post_title')
        cy.get('#category option:selected').first().should('not.be.empty')
        cy.get('#post_message')
        cy.get('#selected-author-name').should('not.be.empty')
        cy.get('#cancel-new-post')
        cy.get('#submit-new-post')
    })

    it('should be able to fill new data for a blog post', () => {
        cy.get('#post_title').type('Cypress blog post 729834758').should('have.value', 'Cypress blog post 729834758')
        cy.get('#category option:selected').first().should('not.be.empty')
        cy.get('#post_message').type('My first message').should('have.value', 'My first message')
        cy.get('#selected-author-name').should('not.be.empty')
    })

    it('should be able to submit the new form', () => {
        cy.get('form').submit()
        cy.location('pathname').should('eq', '/')
    })

    it('should show the new blog post in the posts list', () => {
        cy.get('#blog-post-list-entry').contains('Cypress blog post 729834758')
    })
})

describe('The New Post', () => {
    it('should be accessible from the blog post list', () => {
        cy.visit('/')
        cy.contains('Cypress blog post 729834758').click()
        cy.get('h1').should('contain.text', 'Cypress blog post 729834758')

    })

    it('should be deletable', () => {
        cy.get('#delete-post').click()
        cy.location('pathname').should('eq', '/')

    })

    it('should be deleted and not listed in the blog post list anymore', () => {
        cy.get('#blog-post-list-entry').should('not.contain', 'Cypress blog post 729834758')
    })
})
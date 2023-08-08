describe('pencil should be shown at created persona', () => {
    beforeEach(() => {
        cy.signUpAsProWithCoupon()
    })

    it('should be shown for a created persona', () => {
        cy.addProject()

        cy.addPersonaFromProjectPage()

        cy.get('div#app div[data-cy="persona-panel-item-1"] > div > button:nth-child(1)')
            .should('not.exist')

        cy.get('div#app div.panel-personas__footer button > span')
            .should('contain', 'add persona')
            .click()
            .wait(1000)

        cy.get('div#app div.menuable__content__active > div.highlighter')
            .should('not.exist')

        cy.get('div#app div[data-cy="persona-panel-item-1"] > div > button:nth-child(1)')
            .should('exist')
            .click({ force: true })
            .wait(1000)

        cy.get('div#app div.menuable__content__active > div.highlighter')
            .should('exist')
    })
})

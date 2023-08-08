describe('Browsers section', () => {
  before(() => {
    cy.signup()

    // Check that Projects list is empty
    cy.get('div#app div.dashboard-empty-projects')
      .should('exist')

    // Add project
    cy.addProject()

    // Add Persona artifact to the project
    cy.addPersonaFromProjectPage()
  })

  it('should select and delete browser icons', () => {
    cy.get('div#app div:nth-child(9) > div.widget__wrap > div.widget__header div.persona-section-title')
      .should('contain', 'Browsers')
      .clear()
      .type('Renamed browsers section')

    for (let i = 1; i < 6; i += 1) {
      cy.get(`div#app div:nth-child(9) > div.widget__wrap > div.widget__content.technology > div:nth-child(${i})`)
        .should('not.have.attr', 'class', 'browsers__item is-active')

      cy.get(`div#app div:nth-child(9) > div.widget__wrap > div.widget__content.technology > div:nth-child(${i}) svg`)
        .click()
        .wait(200)

      cy.get(`div#app div:nth-child(9) > div.widget__wrap > div.widget__content.technology > div:nth-child(${i})`)
        .should('have.attr', 'class', 'browsers__item is-active')
    }

  // Add text under icons
    for (let i = 1; i < 6; i += 1) {
      cy.get(`div#app div:nth-child(9) > div.widget__wrap > div.widget__content.technology > div:nth-child(${i}) > div`)
        .clear()
        .type(`number ${i}`)
    }

  // Unselect browsers icons
    for (let i = 1; i < 6; i += 1) {
      cy.get(`div#app div:nth-child(9) > div.widget__wrap > div.widget__content.technology > div:nth-child(${i})`)
        .should('have.attr', 'class', 'browsers__item is-active')

      cy.get(`div#app div:nth-child(9) > div.widget__wrap > div.widget__content.technology > div:nth-child(${i})`)
        .click()
        .wait(200)
        .should('not.have.attr', 'class', 'browsers__item is-active')
    }

  // Delete section and click at Undo button
    cy.get('div#app div:nth-child(9) > div.widget__wrap > div.widget__header div.persona-section-title')
      .should('contain', 'Renamed browsers section')

    cy.get('div#app div:nth-child(9) > div.widget__wrap > div.widget__header button')
      .invoke('show')
      .click()

    cy.get('div#app div:nth-child(9) > div.widget__wrap > div.widget__header div.persona-section-title')
      .should('not.exist')

    cy.get('div#app [data-cy="toplink_undo"]')
      .click()

    cy.get('div#app div:nth-child(9) > div.widget__wrap > div.widget__header div.persona-section-title')
      .should('contain', 'Renamed browsers section')
  })
})

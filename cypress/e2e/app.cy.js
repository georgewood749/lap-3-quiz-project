// describe('empty spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

describe("Typical user returning user actions on the app", () => {
  beforeEach(() => {
    cy.viewport(1600, 900);
  })

  it("opens menu successfully", () => {
    cy.visit('http://localhost:3000/');
  })

  it("opens create game form successfully", () => {
    cy.visit('http://localhost:3000/create');
  })

  it("opens join game form successfully", () => {
    cy.visit('http://localhost:3000/join');
  })

  it("opens leaderboard successfully", () => {
    cy.visit('http://localhost:3000/leaderboard');
  })

  it('allows user to navigate from menu to create game form', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#create').click();
    cy.location('pathname').should('match', /\/create$/);
  })

  it('allows user to navigate from menu to join game form', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#join').click();
    cy.location('pathname').should('match', /\/join$/);
  })

  it('allows user to navigate from menu to leaderboard', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#leaderboard').click();
    cy.location('pathname').should('match', /\/leaderboard$/);
  })
})

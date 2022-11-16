describe("Expected routes exist", () => {
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

  it("opens lobby successfully", () => {
    cy.visit('http://localhost:3000/lobby');
  })

  it("opens game successfully", () => {
    cy.visit('http://localhost:3000/game');
  })

  it("opens results successfully", () => {
    cy.visit('http://localhost:3000/results');
  })

  it("opens 'not found' successfully", () => {
    cy.visit('http://localhost:3000/*');
  })

})


describe("Menu", () => {
  beforeEach(() => {
    cy.viewport(1600, 900);
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

describe("Create Game", () => {
  beforeEach(() => {
    cy.viewport(1600, 900);
  })

  it('allows user to fill in the create game form and submit it', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#create').click();
    cy.get('#difficulty').select('easy');
    cy.get('#numQuestions').type('10');
    cy.get('#category').select('9');
    cy.get('#questionType').select('multiple');
    cy.get('[type="submit"]').click();
  })

})

describe("Join Game", () => {
  beforeEach(() => {
    cy.viewport(1600, 900);
  })

  it('allows user to fill in the join game form and submit it', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#join').click();
    cy.get('#join > :nth-child(1) > input').clear().type('123456');
    cy.get('#join > :nth-child(2) > input').clear().type('testUsername');
    cy.get('[type="submit"]').click();
  })

})

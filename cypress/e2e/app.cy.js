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

  it('allows user to navigate from menu to create game form', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#create').click({force: true});
    cy.location('pathname').should('match', /\/create$/);
  })

  it('allows user to navigate from menu to join game form', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#join').click({force: true});
    cy.location('pathname').should('match', /\/join$/);
  })

  it('allows user to navigate from menu to leaderboard', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#leaderboard').click({force: true});
    cy.location('pathname').should('match', /\/leaderboard$/);
  })

  it('allows user to fill in the create game form and submit it', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#create').click({force: true});
    cy.get('#difficulty', {withinSubject:null}).select('easy', { force: true });
    cy.get('#numQuestions').type('10', { force: true });
    cy.get('#category', {withinSubject:null}).select('9', { force: true });
    cy.get('#questionType', {withinSubject:null}).select('multiple', { force: true });
    cy.get('[type="submit"]').click({ force: true });
  })

})


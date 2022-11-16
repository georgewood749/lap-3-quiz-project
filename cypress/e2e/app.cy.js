describe("Expected routes exist", () => {
  beforeEach(() => {
    cy.viewport(1600, 900);
  })

  it("opens menu successfully", () => {
    cy.visit('http://localhost:3000/');
  })

  it("opens create game form successfully", () => {
    cy.visit('http://localhost:3000/create');
    cy.contains('Create Game');
  })

  it("opens join game form successfully", () => {
    cy.visit('http://localhost:3000/join');
    cy.contains('Join Game');
  })

  it("opens leaderboard successfully", () => {
    cy.visit('http://localhost:3000/leaderboard');
    cy.contains('Leaderboard');
  })

  it("opens lobby successfully", () => {
    cy.visit('http://localhost:3000/lobby');
    cy.contains('Lobby');
  })

  it("opens game successfully", () => {
    cy.visit('http://localhost:3000/game');
  })

  it("opens results successfully", () => {
    cy.visit('http://localhost:3000/results');
    cy.contains('Podium');
  })

})

describe("Undefined routes are redirected to the not found page", () => {
  beforeEach(() => {
    cy.viewport(1600, 900);
  })

  it("opens 'not found' successfully and displays correct message", () => {
    cy.visit('http://localhost:3000/idontexist');
    cy.contains('Page not found.');
  })

})


describe("Menu", () => {
  beforeEach(() => {
    cy.viewport(1600, 900);
    cy.visit('http://localhost:3000/');
  })

  it('allows user to navigate from menu to create game form', () => {
    cy.get('#create').click();
    cy.location('pathname').should('match', /\/create$/);
  })

  it('allows user to navigate from menu to join game form', () => {
    cy.get('#join').click();
    cy.location('pathname').should('match', /\/join$/);
  })

  it('allows user to navigate from menu to leaderboard', () => {
    cy.get('#leaderboard').click();
    cy.location('pathname').should('match', /\/leaderboard$/);
  })

})

describe("Create Game", () => {
  beforeEach(() => {
    cy.viewport(1600, 900);
    cy.visit('http://localhost:3000/create');
  })

  it('allows user to fill in the create game form and submit it', () => {
    cy.get('#difficulty').select('easy');
    cy.get('#numQuestions').type('10');
    cy.get('#category').select('9');
    cy.get('#questionType').select('multiple');
    cy.get('[type="submit"]').should('not.be.disabled').click();
    cy.location('pathname').should('match', /\/$/);
  })

  it('submit button is disabled for an empty form', () => {
    cy.get('[type="submit"]').should('be.disabled');
    cy.location('pathname').should('match', /\/create$/);
  })

  it('submit button is disabled for an incomplete form - difficulty not selected', () => {
    cy.get('#numQuestions').type('10');
    cy.get('#category').select('9');
    cy.get('#questionType').select('multiple');
    cy.get('[type="submit"]').should('be.disabled');
    cy.location('pathname').should('match', /\/create$/);
  })

  it('submit button is disabled for an incomplete form - number of questions not selected', () => {
    cy.get('#difficulty').select('easy');
    cy.get('#category').select('9');
    cy.get('#questionType').select('multiple');
    cy.get('[type="submit"]').should('be.disabled');
    cy.location('pathname').should('match', /\/create$/);
  })

  it('submit button is disabled for an incomplete form - category not selected', () => {
    cy.get('#difficulty').select('easy');
    cy.get('#numQuestions').type('10');
    cy.get('#questionType').select('multiple');
    cy.get('[type="submit"]').should('be.disabled');
    cy.location('pathname').should('match', /\/create$/);
  })

  it('submit button is disabled for an incomplete form - type not selected', () => {
    cy.get('#difficulty').select('easy');
    cy.get('#numQuestions').type('10');
    cy.get('#category').select('9');
    cy.get('[type="submit"]').should('be.disabled');
    cy.location('pathname').should('match', /\/create$/);
  })

  it('submit button should not be disabled when number of questions is equal to the minimum number allowed (i.e. 5)', () => {
    cy.get('#difficulty').select('easy');
    cy.get('#numQuestions').type('5');
    cy.get('#category').select('9');
    cy.get('#questionType').select('multiple');
    cy.get('[type="submit"]').should('not.be.disabled').click();
    cy.location('pathname').should('match', /\/$/);
  })

  it('submit button should not be disabled when number of questions is equal to the maximum number allowed (i.e. 5o)', () => {
    cy.get('#difficulty').select('easy');
    cy.get('#numQuestions').type('50');
    cy.get('#category').select('9');
    cy.get('#questionType').select('multiple');
    cy.get('[type="submit"]').should('not.be.disabled').click();
    cy.location('pathname').should('match', /\/$/);
  })

  it('submit button should be disabled when number of questions is under the minimum number allowed (i.e. less than 5)', () => {
    cy.get('#difficulty').select('easy');
    cy.get('#numQuestions').type('4');
    cy.get('#category').select('9');
    cy.get('#questionType').select('multiple');
    cy.get('[type="submit"]').should('be.disabled');
    cy.location('pathname').should('match', /\/create$/);
  })

  it('submit button should be disabled when number of questions is over the maximum number allowed (i.e. more than 50)', () => {
    cy.get('#difficulty').select('easy');
    cy.get('#numQuestions').type('51');
    cy.get('#category').select('9');
    cy.get('#questionType').select('multiple');
    cy.get('[type="submit"]').should('be.disabled');
    cy.location('pathname').should('match', /\/create$/);
  })

})

describe("Join Game", () => {
  beforeEach(() => {
    cy.viewport(1600, 900);
    cy.visit('http://localhost:3000/join');
  })

  it('allows user to fill in the join game form and submit it', () => {
    cy.get('#join > :nth-child(1) > input').clear().type('123456');
    cy.get('#join > :nth-child(2) > input').clear().type('testUsername');
    cy.get('[type="submit"]').should('not.be.disabled').click();
    cy.location('pathname').should('match', /\/lobby$/);
  })

  it('submit button is disabled for an incomplete form - room ID field is empty', () => {
    cy.get('#join > :nth-child(2) > input').clear().type('testUsername');
    cy.get('[type="submit"]').should('be.disabled');
    cy.location('pathname').should('match', /\/join$/);
  })

  it('submit button is disabled for an incomplete form - username field is empty', () => {
    cy.get('#join > :nth-child(1) > input').clear().type('123456');
    cy.get('[type="submit"]').should('be.disabled');
    cy.location('pathname').should('match', /\/join$/);
  })

  it('submit button is abled when room ID is equal to the minimum value for a room ID i.e. 100000', () => {
    cy.get('#join > :nth-child(1) > input').clear().type('100000');
    cy.get('#join > :nth-child(2) > input').clear().type('testUsername');
    cy.get('[type="submit"]').should('not.be.disabled').click();
    cy.location('pathname').should('match', /\/lobby$/);
  })

  it('submit button is abled when room ID is equal to the maximum value for a room ID i.e. 999999', () => {
    cy.get('#join > :nth-child(1) > input').clear().type('999999');
    cy.get('#join > :nth-child(2) > input').clear().type('testUsername');
    cy.get('[type="submit"]').should('not.be.disabled').click();
    cy.location('pathname').should('match', /\/lobby$/);
  })

  it('submit button is disabled when room ID is under the minimum value for a room ID i.e. less than 100000', () => {
    cy.get('#join > :nth-child(1) > input').clear().type('99999');
    cy.get('#join > :nth-child(2) > input').clear().type('testUsername');
    cy.get('[type="submit"]').should('be.disabled');
    cy.location('pathname').should('match', /\/join$/);
  })

  it('submit button is disabled when room ID is over the maximum value for a room ID i.e. more than 999999', () => {
    cy.get('#join > :nth-child(1) > input').clear().type('1000000');
    cy.get('#join > :nth-child(2) > input').clear().type('testUsername');
    cy.get('[type="submit"]').should('be.disabled');
    cy.location('pathname').should('match', /\/join$/);
  })

})

describe("Leaderboard", () => {
  beforeEach(() => {
    cy.viewport(1600, 900);
    cy.visit('http://localhost:3000/leaderboard');
  })

  it('displays the top three players', () => {
    cy.contains('🥇');
    cy.contains('🥈');
    cy.contains('🥉');
  })

})

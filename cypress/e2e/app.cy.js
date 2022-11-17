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

})

describe("Undefined routes are redirected to the not found page", () => {
  beforeEach(() => {
    cy.viewport(1600, 900);
  })

  it("opens 'not found' successfully", () => {
    cy.visit('http://localhost:3000/idontexist');
  })

  it("displays correct message", () => {
    cy.visit('http://localhost:3000/idontexist');
    cy.contains('Page not found.');
  })

})


describe("Menu", () => {
  beforeEach(() => {
    cy.viewport(1600, 900);
    cy.visit('http://localhost:3000/');
  })

  it("has the correct heading", () => {
    cy.get('h1').contains('Welcome');
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

  it("has the correct heading", () => {
    cy.get('h1').contains('Create Game');
  })

  it('can create an offline game', () => {
    cy.get('#difficulty').select('easy');
    cy.get('#numQuestions').type('10');
    cy.get('#category').select('9');
    cy.get('#online').should('be.disabled');
    cy.get('#offline').should('not.be.disabled').click();
    cy.location('pathname').should('match', /\/offline$/);
  })

  it('can create an offline game with the minimum threshold for number of questions i.e. 5', () => {
    cy.get('#difficulty').select('easy');
    cy.get('#numQuestions').type('5');
    cy.get('#category').select('9');
    cy.get('#online').should('be.disabled');
    cy.get('#offline').should('not.be.disabled').click();
    cy.location('pathname').should('match', /\/offline$/);
  })

  it('can create an offline game with the maximum threshold for number of questions i.e. 50', () => {
    cy.get('#difficulty').select('easy');
    cy.get('#numQuestions').type('50');
    cy.get('#category').select('9');
    cy.get('#online').should('be.disabled');
    cy.get('#offline').should('not.be.disabled').click();
    cy.location('pathname').should('match', /\/offline$/);
  })

  it('cannot create an offline game with number of questions under the minimum threshold i.e. less than 5', () => {
    cy.get('#difficulty').select('easy');
    cy.get('#numQuestions').type('4');
    cy.get('#category').select('9');
    cy.get('#online').should('be.disabled');
    cy.get('#offline').should('be.disabled');
    cy.location('pathname').should('match', /\/create$/);
  })

  it('cannot create an offline game with number of questions over the maximum threshold i.e. more than 50', () => {
    cy.get('#difficulty').select('easy');
    cy.get('#numQuestions').type('51');
    cy.get('#category').select('9');
    cy.get('#online').should('be.disabled');
    cy.get('#offline').should('be.disabled');
    cy.location('pathname').should('match', /\/create$/);
  })

  it('cannot create an offline game without selecting difficulty', () => {
    cy.get('#numQuestions').type('10');
    cy.get('#category').select('9');
    cy.get('#online').should('be.disabled');
    cy.get('#offline').should('be.disabled');
    cy.location('pathname').should('match', /\/create$/);
  })

  it('cannot create an offline game without selecting number of questions', () => {
    cy.get('#difficulty').select('easy');
    cy.get('#category').select('9');
    cy.get('#online').should('be.disabled');
    cy.get('#offline').should('be.disabled');
    cy.location('pathname').should('match', /\/create$/);
  })

  it('cannot create an offline game without selecting category', () => {
    cy.get('#difficulty').select('easy');
    cy.get('#numQuestions').type('10');
    cy.get('#online').should('be.disabled');
    cy.get('#offline').should('be.disabled');
    cy.location('pathname').should('match', /\/create$/);
  })

  it('can create an online game', () => {
    cy.get('#difficulty').select('easy');
    cy.get('#numQuestions').type('10');
    cy.get('#category').select('9');
    cy.get('#creator > input').type('creator');
    cy.get('#offline').should('not.be.disabled');
    cy.get('#online').should('not.be.disabled');
    // cy.location('pathname').should('match', /\/lobby$/);
  })

  it('cannot create an online game without a username', () => {
    cy.get('#difficulty').select('easy');
    cy.get('#numQuestions').type('10');
    cy.get('#category').select('9');
    cy.get('#offline').should('not.be.disabled');
    cy.get('#online').should('be.disabled');
    // cy.location('pathname').should('match', /\/lobby$/);
  })

})

describe("Join Game", () => {
  beforeEach(() => {
    cy.viewport(1600, 900);
    cy.visit('http://localhost:3000/join');
  })

  it("has the correct heading", () => {
    cy.get('h1').contains('Join Game');
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

  it("has the correct heading", () => {
    cy.get('h1').contains('Leaderboard');
  })

  it('displays the top three players', () => {
    cy.contains('🥇');
    cy.contains('🥈');
    cy.contains('🥉');
  })

})

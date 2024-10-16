describe('Footer Component', () => {
  beforeEach(() => {
    // Visit the page containing the Footer component
    cy.visit('http://localhost:5173'); // Adjust the path as needed
  });

  it('renders the footer with correct text and styles', () => {
    // Scroll to the footer element
    cy.get('#userFooter').scrollIntoView();

    // Check if the footer is present and visible
    cy.get('#userFooter')
      .should('be.visible')
      .should('have.css', 'background-color', 'rgb(0, 0, 0)') // Check background color
      .should('have.css', 'color', 'rgb(255, 255, 255)'); // Check text color

    // Check for copyright text
    const currentYear = new Date().getFullYear();
    cy.get('#userFooter')
      .contains(`© ${currentYear}. All rights reserved.`)
      .should('exist');
  });
});

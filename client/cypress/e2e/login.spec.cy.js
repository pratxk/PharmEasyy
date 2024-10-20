describe('Login Component E2E Test', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/login');  // Adjust URL based on your setup
    });
  
    it('renders the form and inputs correctly', () => {
      // Check if all form elements are visible
      cy.get('#email').should('be.visible');
      cy.get('#password').should('be.visible');
      cy.get('#remember').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible');
    });
  
    it('shows validation errors for empty fields', () => {
      // Submit the form without filling it out
      cy.get('button[type="submit"]').click();
  
      // Check for validation error messages
      cy.get('#email').parent().find('p').should('contain', 'Email is required.');
      cy.get('#password').parent().find('p').should('contain', 'Password is required.');
    });
  
    it('validates email format', () => {
        // Fill in an incorrect email format
        cy.get('#email').type('invalidEmail');
        cy.get('#password').type('StrongPass1!');
      
        // Submit the form
        cy.get('button[type="submit"]').click();
      
        // Check for specific error message for email format
        cy.get('p').should('contain', 'Invalid email format.'); // Use a more generic selector if needed
      });
      
  
      it('redirects to home on successful login', () => {
        // Intercept the login request and mock a successful response
        cy.intercept('POST', `${Cypress.env('backend_api')}/auth/login`, {
          statusCode: 200,
          body: { message: 'Logged in successfully' }
        }).as('loginSuccess');
      
        // Fill in valid login details
        cy.get('#email').type('john.doe@example.com'); // Use a valid email
        cy.get('#password').type('StrongPass1!'); // Use a valid password
      
        // Submit the form
        cy.get('button[type="submit"]').click();
      
        // Wait for the login request to finish
        // cy.wait('@loginSuccess');
      
        // Assert redirection to home route
        cy.url().should('eq', `http://localhost:5173/`); // Adjust baseUrl if necessary
      });
      
      
      
  
  
      it('remains on login page on failed login', () => {
        // Intercept the login request and mock a failed response
        cy.intercept('POST', `${Cypress.env('backend_api')}/auth/login`, {
          statusCode: 401,
          body: { message: 'Invalid credentials' }
        }).as('loginFailed');
      
        // Fill in invalid login details
        cy.get('#email').type('wrong.email@example.com');
        cy.get('#password').type('WrongPass!');
      
        // Submit the form
        cy.get('button[type="submit"]').click();
      
        // Wait for the login request to finish
        // cy.wait('@loginFailed');
      
        // Assert that the user remains on the login page
        cy.url().should('eq', `http://localhost:5173/login`); // Adjust URL as needed
      });
      
      
  });
  
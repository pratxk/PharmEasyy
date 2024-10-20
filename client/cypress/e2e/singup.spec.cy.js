describe('SignUp Component E2E Test', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/register'); 
    });
  
    it('renders the form and inputs correctly', () => {
      // Check if all form elements are visible
      cy.get('#first_name').should('be.visible');
      cy.get('#last_name').should('be.visible');
      cy.get('#email').should('be.visible');
      cy.get('#password').should('be.visible');
      cy.get('#ph_no').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible');
    });
  
    it('shows validation errors for empty fields', () => {
        // Submit the form without filling it out
        cy.get('button[type="submit"]').click();
      
        // Check for validation error messages directly
        cy.get('#first_name').parent().find('p').should('contain', 'First name is required.');
        cy.get('#last_name').parent().find('p').should('contain', 'Last name is required.');
        cy.get('#email').parent().find('p').should('contain', 'Email is required.');
        cy.get('#password').parent().find('p').should('contain', 'Password is required.');
        cy.get('#ph_no').parent().find('p').should('contain', 'Phone number is required.');
      });
      
  
      it('validates email format and password strength', () => {
        // Fill in incorrect email and password formats
        cy.get('#email').type('invalidEmail');
        cy.get('#password').type('weakpassword');
        
        // Submit the form
        cy.get('button[type="submit"]').click();
      
        // Check for specific error messages
        cy.get('#email').parent().find('p').should('contain', 'Invalid email format.');
        cy.get('#password').parent().find('p').should('contain', 'Password must be at least 8 characters long and include at least one letter, one number, and one special character.');
      });
      
  
      it('submits the form successfully with valid inputs', () => {
        // Intercept the registration request and mock a successful response
        cy.intercept('POST', `http://localhost:4004/auth/register`, {
            statusCode: 200,
            body: {
                message: 'Registration successful',
                user: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' }
            }
        }).as('registerUser');
        
        // Fill in valid form data
        cy.get('#first_name').type('John');
        cy.get('#last_name').type('Doe');
        cy.get('#email').type('john.doe@example.com');
        cy.get('#password').type('StrongPass1!');
        cy.get('#ph_no').type('9728123456');
        
        // Submit the form
        cy.get('button[type="submit"]').click();
    
        // Wait for the registration request to finish
        cy.wait('@registerUser');
    
        // Check if redirected to login page after successful registration
        cy.url().should('include', '/login');
    });
    
    
  });
  
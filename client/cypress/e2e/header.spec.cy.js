// cypress/e2e/header.spec.cy.js

describe('Header Component', () => {
    beforeEach(() => {
        // Visit the homepage before each test
        cy.visit('http://localhost:5173');
    });

    it('should render the header with the correct title', () => {
        cy.get('#userHeader').should('exist');
        cy.get('#userHeader').contains('PharmEasy').should('be.visible');
    });

    it('should display navigation links in desktop view', () => {
        cy.get('#userHeader').within(() => {
            cy.contains('Medicines').should('be.visible');
            cy.contains('Cart').should('be.visible');
            cy.contains('Contact').should('be.visible');
            cy.contains('About').should('be.visible');
        });
    });

    it('should toggle the mobile menu when the hamburger icon is clicked', () => {
        // Check mobile view
        cy.viewport('iphone-6'); // Simulate mobile

        // Open the mobile menu
        cy.get('#userHeader').find('button[aria-label="Toggle Menu"]').click();
        cy.get('#userHeader').within(() => {
            cy.contains('Medicines').should('be.visible');
            cy.contains('Cart').should('be.visible');
        });

        // Close the mobile menu
        cy.get('#userHeader').find('button[aria-label="Toggle Menu"]').click();
        cy.get('#userHeader').within(() => {
            cy.contains('Medicines').should('not.exist');
        });
    });

    it('should navigate to the login page when the Login/Sign Up button is clicked', () => {
        cy.get('#userHeader').contains('Login/Sign Up').click();
        cy.url().should('include', '/login');
    });

    it('should log out and navigate to the login page when the Log Out button is clicked', () => {
        // Simulate user authentication (adjust as needed based on your auth logic)
        cy.login(); // Ensure you have a custom command for logging in

        cy.get('#userHeader').contains('Log Out').click();
        cy.url().should('include', '/login');
    });

    it('should display the user avatar when logged in', () => {
        cy.login(); // Log in to check the user avatar

        cy.get('#userHeader').within(() => {
            cy.contains('Log Out').should('be.visible');
            cy.get('div[role="img"]').should('be.visible'); // Assuming Avatar uses `role="img"`
        });
    });
});

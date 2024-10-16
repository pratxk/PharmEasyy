import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Header from './Header';
import { mockStore } from '../../redux/mocks/store'; // Make sure to create a mock store based on your Redux setup

describe('<Header />', () => {
  const setup = (initialState) => {
    const store = createStore(mockStore, initialState);
    cy.mount(
      <Provider store={store}>
        <Header />
      </Provider>
    );
  };

  it('renders the header', () => {
    setup({ auth: { isAuth: false } });
    cy.get('#userHeader').should('exist');
  });

  it('displays navigation links', () => {
    setup({ auth: { isAuth: false } });
    cy.get('a').contains('Medicines').should('exist');
    cy.get('a').contains('Cart').should('exist');
    cy.get('a').contains('Contact').should('exist');
    cy.get('a').contains('Orders').should('exist');
    cy.get('a').contains('About').should('exist');
  });

  it('shows Login/Sign Up button when not authenticated', () => {
    setup({ auth: { isAuth: false } });
    cy.get('button').contains('Login/Sign Up').should('exist');
  });

  it('shows avatar and logout button when authenticated', () => {
    setup({ auth: { isAuth: true, user: { email: 'test@example.com' } } });
    cy.get('avatar').should('exist'); // Adjust based on how you render the avatar
    cy.get('button').contains('Log Out').should('exist');
  });

  it('toggles the mobile menu', () => {
    setup({ auth: { isAuth: false } });
    cy.get('button[aria-label="Toggle Menu"]').click(); // Open menu
    cy.get('#userHeader2').should('be.visible'); // Check if the menu is visible
    cy.get('button[aria-label="Toggle Menu"]').click(); // Close menu
    cy.get('#userHeader2').should('not.be.visible'); // Check if the menu is hidden
  });

  it('changes to sticky header on scroll', () => {
    setup({ auth: { isAuth: false } });
    cy.window().scrollTo(0, 100); // Scroll down
    cy.get('#userHeader').should('have.css', 'position', 'fixed');
  });
});

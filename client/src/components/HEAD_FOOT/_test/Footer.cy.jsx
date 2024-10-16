import React from 'react';
import Footer from '../Footer';

describe('<Footer />', () => {
  it('renders the footer', () => {
    cy.mount(<Footer />);
    cy.get('#userFooter').should('exist');
  });

  it('displays the correct copyright text', () => {
    const currentYear = new Date().getFullYear();
    cy.mount(<Footer />);
    cy.get('#userFooter')
      .contains(`© ${currentYear}. All rights reserved.`)
      .should('be.visible');
  });


  it('has the correct text color', () => {
    cy.mount(<Footer />);
    cy.get('#userFooter')
      .should('have.css', 'color', 'rgb(255, 255, 255)'); // Check text color
  });

});

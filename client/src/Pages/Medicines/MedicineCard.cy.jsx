import React from 'react'
import MedicineCard from './MedicineCard'

describe('<MedicineCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<MedicineCard />)
  })
})
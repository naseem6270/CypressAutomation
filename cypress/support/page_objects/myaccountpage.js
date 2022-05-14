/// <reference types="cypress" />

class MyAccountPage {

   getPageHeader() {
      return cy.get('.page-heading')
  }

  getIcon_BackToHome(){
     return cy.get('[title="Return to Home"]')
  }
   
   
}

export const myAccountPage = new MyAccountPage()

/// <reference types="cypress" />

class HomePage {

   getSignInLink() {
      return cy.contains('[class="login"]', 'Sign in')
  }
  
  getSearch_txtField(){
     return cy.get('#search_query_top')
  }

  getSearch_button(){
     return cy.get('[name="submit_search"]')
  }

  getMainMenu_Dresses(){
     return cy.get('[title="Dresses"]')
  }

  getSubMenu_EveningDress(){
     return cy.get('[title="Evening Dresses"]')
  }

   
   navigationToLoginPage(){
      const homePage = new HomePage()
      homePage.getSignInLink().click()

   }
   
}

export const homePage = new HomePage()

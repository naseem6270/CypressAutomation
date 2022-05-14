/// <reference types="cypress" />

class ProductDetailsPage {

   getPageTitle() {
      return cy.get('[itemprop="name"]')
  }

  getSize_DropDown(){
     return cy.get('#group_1')
  }
  getAddToCart_Button(){
     return cy.get('#add_to_cart span')
  }

  getSuccessMsgAddToCart_txt(){
     return cy.get('.layer_cart_product > .title')
  }

  getProceedToCheckOut_Button(){
     return cy.get('.button-medium > span')
  }

  }
 
   


export const prodDetailsPage = new ProductDetailsPage()

/// <reference types="cypress" />

class ProductListPage {

   getPageHeader_Search() {
      return cy.get('.product-listing > span.lighter')
  }

  getPageHeader(){
     return cy.get('.product-listing span.cat-name')
  }

  getFirstProduct(){
     return cy.get('[itemprop="name"] a').first()
  }

   
}

export const prodListPage = new ProductListPage()

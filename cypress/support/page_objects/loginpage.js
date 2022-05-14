/// <reference types="cypress" />


class LoginPage {

   getEmailId_txtField_AlreadyRegistered() {
      return cy.get('#email')
   }

   getPassword_txtField_AlreadyRegistered() {
      return cy.get('#passwd')
   }

   getSubmit_Button(){
      return cy.get('#SubmitLogin')
   }

   getLoginErrorHeader(){
      return cy.get('#center_column > .alert-danger')
   }

   getLoginFieldError(){
      return cy.get('.form-error')
   }

   getLogout_Link(){
      return cy.get('.header-container .logout')
   }


   
   login(emailID, password){
      const loginPage = new LoginPage()
      loginPage.getEmailId_txtField_AlreadyRegistered().click().clear().type(emailID)
      loginPage.getPassword_txtField_AlreadyRegistered().click().clear().type(password)
      loginPage.   getSubmit_Button().click()

   }

   
}

export const loginPage = new LoginPage()

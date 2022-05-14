/// <reference types = "cypress" />

import { homePage } from "../../support/page_objects/homepage"
import { loginPage } from "../../support/page_objects/loginpage"
import { myAccountPage } from "../../support/page_objects/myaccountpage"
import { prodListPage } from "../../support/page_objects/produclistpage"

describe('Testing the Search Functionality', () => {


    beforeEach('open home page before each test', () => {
        cy.visit('/')
    })

    it('Search Functionality From Home Page with Login', () => {
        homePage.navigationToLoginPage()
        cy.fixture('loginData').then(loginTestData => {
            loginPage.login(loginTestData.email, loginTestData.password)


        })
        myAccountPage.getIcon_BackToHome().click()


        cy.fixture('searchData').then(searchData => {
            homePage.getSearch_txtField().clear().type(searchData.itemToBeSearched)
            homePage.getSearch_button().click()
            prodListPage.getPageHeader_Search().should('contain', searchData.itemToBeSearched)
            loginPage.getLogout_Link().click()

        })

    })

    it('Search Functionality From Home Page without Login', () => {

        cy.fixture('searchData').then(searchData => {
            homePage.getSearch_txtField().clear().type(searchData.itemToBeSearched)
            homePage.getSearch_button().click()
            prodListPage.getPageHeader_Search().should('contain', searchData.itemToBeSearched)


        })

    })
})
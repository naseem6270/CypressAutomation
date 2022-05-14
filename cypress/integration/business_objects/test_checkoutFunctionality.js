/// <reference types = "cypress" />

import { homePage } from "../../support/page_objects/homepage"
import { loginPage } from "../../support/page_objects/loginpage"
import { myAccountPage } from "../../support/page_objects/myaccountpage"
import { prodDetailsPage } from "../../support/page_objects/producdetailspage"
import { prodListPage } from "../../support/page_objects/produclistpage"

describe('Testing the Check out Functionality', () => {


    beforeEach('open home page before each test', () => {
        cy.visit('/')
    })

    it('Check out Functionality From Home Page as Guest user', () => {

        homePage.getMainMenu_Dresses().eq(1).invoke('show')
        homePage.getSubMenu_EveningDress().eq(1).click({ force: true })

        prodListPage.getPageHeader().should('contain.text', 'Evening Dresses')

        prodListPage.getFirstProduct().invoke('text').then((prodName) => {
            prodListPage.getFirstProduct().click()
            prodDetailsPage.getPageTitle().invoke('text').should((prodName2) => {
                expect(prodName.trim()).eq(prodName2)
            })
        })

        cy.fixture('searchData').then(sizeData => {
            prodDetailsPage.getAddToCart_Button().then($button => {
                if ($button.hasClass('display: none;')) {
                    cy.wrap($button).click()
                }
                else {
                    prodDetailsPage.getSize_DropDown().select(sizeData.size)
                    cy.wait(500)
                    cy.wrap($button).click()

                }
            })
        })

        prodDetailsPage.getSuccessMsgAddToCart_txt().invoke('text').then((successMsg) => {
            expect(successMsg.trim()).eq('Product successfully added to your shopping cart')
        })
        prodDetailsPage.getProceedToCheckOut_Button().click()
    })

    it('Check out Functionality From Home Page as Logged in User', () => {
        homePage.navigationToLoginPage()
        cy.fixture('loginData').then(loginTestData => {
            loginPage.login(loginTestData.email, loginTestData.password)


        })

        myAccountPage.getIcon_BackToHome().click()
        homePage.getMainMenu_Dresses().eq(1).invoke('show')
        homePage.getSubMenu_EveningDress().eq(1).click({ force: true })

        prodListPage.getPageHeader().should('contain.text', 'Evening Dresses')

        prodListPage.getFirstProduct().invoke('text').then((prodName) => {
            prodListPage.getFirstProduct().click()
            prodDetailsPage.getPageTitle().invoke('text').should((prodName2) => {
                expect(prodName.trim()).eq(prodName2)
            })
        })

        cy.fixture('searchData').then(sizeData => {
            prodDetailsPage.getAddToCart_Button().then($button => {
                if ($button.hasClass('display: none;')) {
                    cy.wrap($button).click()
                }
                else {
                    prodDetailsPage.getSize_DropDown().select(sizeData.size)
                    cy.wait(500)
                    cy.wrap($button).click()

                }
            })
        })

        prodDetailsPage.getSuccessMsgAddToCart_txt().invoke('text').then((successMsg) => {
            expect(successMsg.trim()).eq('Product successfully added to your shopping cart')
        })
        prodDetailsPage.getProceedToCheckOut_Button().click()
        loginPage.getLogout_Link().click()
    })
})
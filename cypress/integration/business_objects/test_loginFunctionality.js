/// <reference types = "cypress" />

import { homePage } from "../../support/page_objects/homepage"
import { loginPage } from "../../support/page_objects/loginpage"
import { myAccountPage } from "../../support/page_objects/myaccountpage"

describe('Test Suite for Login', () => {

    beforeEach('open home page before each test', () => {
        cy.visit('/')
    })

    it('Validate Login Functionality with Valid Credentials', () => {
        homePage.navigationToLoginPage()

        cy.fixture('loginData').then(loginTestData => {
            loginPage.login(loginTestData.email, loginTestData.password)


        })
        myAccountPage.getPageHeader().should('have.text', 'My account')
        loginPage.getLogout_Link().click()

    })

    it('Validate Login Functionality with Invalid Email ID', () => {
        homePage.navigationToLoginPage()

        cy.fixture('loginData').then(loginTestData => {
            loginPage.login(loginTestData.invalid_email, loginTestData.password)
        })
        loginPage.getLoginErrorHeader().then(headerError => {
            cy.wrap(headerError).should('have.css', 'background-color', 'rgb(243, 81, 92)')
            cy.wrap(headerError).find('li').should('contain', 'Authentication failed.')

        })
    })

    it('Validate Login Functionality with Invalid Password', () => {
        homePage.navigationToLoginPage()

        cy.fixture('loginData').then(loginTestData => {
            loginPage.login(loginTestData.email, loginTestData.invalid_password)
        })
        loginPage.getLoginErrorHeader().then(headerError => {
            cy.wrap(headerError).should('have.css', 'background-color', 'rgb(243, 81, 92)')
            cy.wrap(headerError).find('li').should('contain', 'Authentication failed.')

        })
    })

    it('Validate Error message when login ID is blank', () => {
        homePage.navigationToLoginPage()

        cy.fixture('loginData').then(loginTestData => {
            loginPage.login(" ", loginTestData.password)
        })
        loginPage.getLoginErrorHeader().then(headerError => {
            cy.wrap(headerError).should('have.css', 'background-color', 'rgb(243, 81, 92)')
            cy.wrap(headerError).find('li').should('contain', 'An email address required.')

        })
    })

    it('Validate Error message when Password is blank', () => {
        homePage.navigationToLoginPage()

        cy.fixture('loginData').then(loginTestData => {
            loginPage.login(loginTestData.email, " ")
        })
        loginPage.getLoginErrorHeader().then(headerError => {
            cy.wrap(headerError).should('have.css', 'background-color', 'rgb(243, 81, 92)')
            cy.wrap(headerError).find('li').should('contain', 'Password is required.')

        })
    })

    it('Validate Error message when user enters invalid email format', () => {
        homePage.navigationToLoginPage()
        cy.fixture('loginData').then(loginTestData => {
            const emailID = loginTestData.invalid_email_format

            loginPage.login(emailID, loginTestData.password)

            loginPage.getEmailId_txtField_AlreadyRegistered().then(fieldError => {

                cy.wrap(fieldError).should('have.css', 'color', 'rgb(241, 51, 64)')
                cy.wrap(fieldError).invoke('prop', 'validationMessage').should('contain', "Please include an \'@\' in the email address. '" + emailID + "' is missing an \'@\'.")

            })
        })
    })

    it('Validate Error message when user enters invalid password format', () => {
        homePage.navigationToLoginPage()

        cy.fixture('loginData').then(loginTestData => {
            loginPage.login(loginTestData.email, loginTestData.invalid_password_format)
        })
        loginPage.getLoginErrorHeader().then(headerError => {
            cy.wrap(headerError).should('have.css', 'background-color', 'rgb(243, 81, 92)')
            cy.wrap(headerError).find('li').should('contain', 'Invalid password.')

        })
    })
})
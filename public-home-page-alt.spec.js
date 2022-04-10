/// <reference types="Cypress" />



const PublicHomePageSpiff = () => {
  // Cypress:
  // - Is written in JavaScript
  // - Is asynchronous
  // - Has a fancy UI (time travel)
  // - Can use stubs/mocks


  beforeEach(() => {
    // Code to be run before each individual `it` block
    System.visitSpiffLandingPage()
    
  })

  afterEach(() => {
    // Code to be run after each individual `it` block
    cy.reload()
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  describe("Assert Get Demo Buttons are Working", () => {

    it("Main content 'Get a demo'", () => {
      LandingPage.clickMainContentGetDemo()   
    })

    it("Top nav 'Get a demo'", () => {
      LandingPage.clickTopNavGetADemo()
      DemoPage.assertURL()
      DemoPage.assertForm()  
    })

    // TO DO
    it("Bottom nav 'Get a demo'", () => {
      LandingPage.clickTopNavGetADemo()
      DemoPage.assertGetADemoButton()
      DemoPage.clickGetADemoButton()
      DemoPage.assertFormErrorAll()
    })
  })
}

export default PublicHomePageSpiff

describe("public-homepage-spiff", function () {
  PublicHomePageSpiff()
})

// --------------------------------------------------------------------

class System {
  static visitSpiffLandingPage() {
    cy.log("**visitSpiffLandingPage()**")
    cy.visit("https://spiff.com/")
  }
}

// -----------------------------------------
class LandingPage {
  // LandingPage Functions
  static clickTopNavGetADemo() {
    cy.log("**clickTopNavGetADemo()**")
    this.topNavGetADemo().click()
  }

  static clickMainContentGetDemo() {
    cy.log("**clickMainContentGetDemo()**")
    this.mainContentGetDemo().click()
  }

  // LandingPage Elements
  static topNavGetADemo() {
    return cy.get(".site-header [id='menu-secondary-menu']").contains("Get a demo")
  }

  static mainContentGetDemo() {
    return cy.get("[id='pxMainContent'] .btn").contains("Get a demo")
  }
}

// -----------------------------------------
class DemoPage {
  // DemoPage Functions
  static assertURL() {
    cy.log("**assertURL()**")
    const url = "https://spiff.com/demo/"

    cy.url().should("eq", url)
  }

  static assertForm() {
    cy.log("**assertForm()**")
    this.demoformByName("email")
    this.demoformByName("firstname")
    this.demoformByName("lastname")
    this.demoformByName("company")
    this.demoformByName("jobtitle")
    this.demoformByName("reps_range")
  }

  static assertFormErrorAll() {
    cy.log("**assertFormErrorAll()**")
    this.assertFormErrorByName("email")
    this.assertFormErrorByName("firstname")
    this.assertFormErrorByName("lastname")
    this.assertFormErrorByName("company")
    this.assertFormErrorDropdownByName("reps_range")
  }

  static assertFormErrorByName(name) {
    cy.log(`**assertFormErrorByName(${name})**`)
    this.demoformByName(name)
      .parents(".hs-form-field")
      .within(() => {
        cy.get
        cy.get(".hs-error-msg").contains("Please complete this required field.")
      })
  }

  // Only accepts "reps_range"
  static assertFormErrorDropdownByName(name) {
    cy.log(`**assertFormErrorDropdownByName(${name})**`)
    this.demoformByName(name)
      .parents(".hs-form-field")
      .within(() => {
        cy.get(".hs-error-msg").contains("Please select an option from the dropdown menu.")
      })
  }

  static assertGetADemoButton() {
    cy.log("**assertGetADemoButton()**")
    this.getADemoButton().should("exist")
  }

  static clickGetADemoButton() {
    cy.log("**clickGetADemoButton()**")
    this.getADemoButton()
  }

  // DemoPage Elements
  static demoformByName(name) {
    return cy.get(`.hbspt-form [name=${name}]`)
  }

  static getADemoButton() {
    return cy.get(".hs-form [type='submit'][value='Get a Demo']").eq(1).click()
  }
}
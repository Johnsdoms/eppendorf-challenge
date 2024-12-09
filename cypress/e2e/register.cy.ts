describe("Register", () => {
  const VALID_PASSWORD = "}m[Q!R7v$z/";
  const INVALID_PASSWORDS = {
    tooShort: "short",
    noSpecialChar: "aA1234567",
    noUppercase: "a!1234567",
    noLowercase: "A!1234567",
    noNumber: "aA!bcdefg",
  };

  beforeEach(() => {
    cy.visit("http://localhost:3000/register");
  });

  it("Register flow works with valid inputs", () => {
    cy.get("button").contains("Next").as("nextButton").should("be.disabled");

    cy.get("input[name='username']").type("Fry");

    cy.get("@nextButton").should("not.be.disabled").click();

    cy.get("[data-test-id='card-title']")
      .should("contain.text", "Welcome Fry! 👋")
      .get("button")
      .contains("Register")
      .as("registerButton")
      .should("be.disabled");

    cy.get("input[name='email']")
      .type("fry@planetexpress.com")
      .get("@registerButton")
      .should("be.disabled")
      .get("input[name='password']")
      .type(VALID_PASSWORD);

    cy.get("@registerButton").should("not.be.disabled").click();

    cy.get("li[role='status']").should("exist").should("contain.text", "Registration completed");

    // wait the routing timeout
    cy.wait(2000);
    cy.url().should("eq", "http://localhost:3000/");
  });

  it("Inputs show errors when invalid", () => {
    cy
      .get("[data-test-id='name-message']")
      .should("not.exist")
      .get("input[name='username']")
      .type("L")
      .blur()
      .get("[data-test-id='name-message']")
      .should("exist")
      .should("contain.text", "Name too short. Must be at least 2 characters long.");

    cy.get("button")
      .contains("Next")
      .as("nextButton")
      .should("be.disabled");

    cy.get("input[name='username']")
      .type("eela")
      .get("[data-test-id='name-message']")
      .should("not.exist")
      .get("@nextButton")
      .should("not.be.disabled")
      .click();

    cy.get("[data-test-id='email-message']")
      .should("not.exist")
      .get("input[name='email']")
      .type("notanemail.com")
      .blur()
      .get("[data-test-id='email-message']")
      .should("exist")
      .should("contain.text", "Invalid email address");

    cy.get("input[name='email']")
      .clear()
      .type("leela@planetexpress.com")
      .blur()
      .get("[data-test-id='email-message']")
      .should("not.exist");

    cy.get("[data-test-id='password-message']")
      .should("not.exist");

    testInvalidPasswordInputs(INVALID_PASSWORDS);

    cy.get("input[name='password']")
      .type(VALID_PASSWORD)
      .blur()
      .get("[data-test-id='password-message']")
      .should("not.exist");

    cy.get("button").contains("Register").as("registerButton").should("not.be.disabled");
  });

  it("Can navigate between steps", () => {
    cy.get("input[name='username']")
      .type("Fry")
      .blur();

    cy.get("button")
      .contains("Next")
      .as("nextButton")
      .click();

    // fill in valid email but invalid password
    cy.get("input[name='email']")
      .clear()
      .type("fry@planetexpress.com")
      .blur()
      .get("input[name='password']")
      .type(INVALID_PASSWORDS.tooShort)
      .blur();

    cy.get("button").contains("Previous").click();

    cy.get("input[name='username']").should("have.value", "Fry");

    cy.get("@nextButton")
      .click()
      .get("input[name='email']")
      .should("have.value", "fry@planetexpress.com")
      .get("input[name='password']")
      .should("have.value", "");
  });

  it("Show password works", () => {
    cy.get("input[name='username']")
      .type("Fry")
      .blur();

    cy.get("button")
      .contains("Next")
      .as("nextButton")
      .click();

    cy.get("input[name='password']")
      .as("passwordInput")
      .type("not_so_secret_password")
      .blur()
      .should("have.attr", "type", "password")
      .get("[data-test-id='password-visibility-toggle']")
      .as("passwordVisibilityToggle")
      .click()
      .get("@passwordInput")
      .should("have.attr", "type", "text");

    // toggle back
    cy.get("@passwordVisibilityToggle")
      .click()
      .get("@passwordInput")
      .should("have.attr", "type", "password");
  });
});

function testInvalidPasswordInputs(passwords: Record<string, string>) {
  Object.entries(passwords).forEach(([errorType, password]) => {
    cy.get("input[name='password']")
      .clear()
      .type(password)
      .blur()
      .get("[data-test-id='password-message']")
      .should("exist");

    if (errorType === "tooShort") {
      cy.get("[data-test-id='password-message']").should("contain.text", "Password must be at least 8 characters long.");
    }
    else if (errorType === "noSpecialChar") {
      cy.get("[data-test-id='password-message']").should("contain.text", "Password must contain at least one special character.");
    }
    else if (errorType === "noUppercase") {
      cy.get("[data-test-id='password-message']").should("contain.text", "Password must contain at least one uppercase letter.");
    }
    else if (errorType === "noLowercase") {
      cy.get("[data-test-id='password-message']").should("contain.text", "Password must contain at least one lowercase letter.");
    }
    else if (errorType === "noNumber") {
      cy.get("[data-test-id='password-message']").should("contain.text", "Password must contain at least one number.");
    }
  });

  cy.get("input[name='password']")
    .clear();
}

describe("Login Page Tests", () => {
    beforeEach(() => {
        cy.visit("/main.html");
    });

    it("should display the login form correctly", () => {
        cy.get("form");
        cy.get("label[for='username']").contains("Username:");
        cy.get("input#username").should("be.empty");
        cy.get("label[for='password']").contains("Password:");
        cy.get("input#password").should("be.empty");
        cy.get("label[for='checkbox']").contains("Remember me:");
        cy.get("input#checkbox").should("not.be.checked");
        cy.get("input#submit").should("exist");
        cy.get("button#existing").should("not.be.visible");

        cy.window().then((win) => {
            expect(win.localStorage.getItem("username")).to.be.null;
            expect(win.localStorage.getItem("password")).to.be.null;
        });
    });

    it("should login successfully", () => {
        cy.get("input#username").should("be.empty").type("username");
        cy.get("input#password").should("be.empty").type("password");
        cy.get("input#submit").click();
        
        cy.on("window:alert", (txt) => {
            expect(txt).to.contains("Logged in as username");
        });

        cy.window().then((win) => {
            expect(win.localStorage.getItem("username")).to.be.null;
            expect(win.localStorage.getItem("password")).to.be.null;
        });
    });

    it("should show 'Login as existing user' if credentials are stored", () => {
        cy.window().then((win) => {
            win.localStorage.setItem("username", "username1");
            win.localStorage.setItem("password", "password1");
        });

        cy.reload();
        cy.get("button#existing").should("be.visible").contains("Login as existing user");
    });
});

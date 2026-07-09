# Context: SauceDemo Login Page Architecture & Testing Constraints

## 1. Page Specifications
- **Target URL:** `https://www.saucedemo.com/`
- **Module:** Authentication
- **Design Pattern:** Page Object Model (POM)
- **Architectural Goal:** Strict separation of locators, test data, and action methods.

## 2. DOM Elements & Locators (Playwright CSS Selectors)
- **Username Input:** `[data-test="username"]`
- **Password Input:** `[data-test="password"]`
- **Login Button:** `[data-test="login-button"]`
- **Error Message Container:** `[data-test="error"]`
- **Inventory Page Validation Element:** `[data-test="inventory-container"]` (Used to verify successful redirection)

## 3. Test Data Management (Data-Driven Parameters)
- **Global Valid Password:** `secret_sauce`
- **Invalid Password:** `invalid_password_123`
- **Valid User:** `standard_user`
- **Locked User:** `locked_out_user`
- **Problematic User:** `problem_user`
- **Performance User:** `performance_glitch_user`

## 4. Expected Behaviors & State Transitions
- **Successful Login State:** User is redirected to `/inventory.html` and the inventory container becomes visible.
- **Locked Out Error State:** The error container displays the exact text: `Epic sadface: Sorry, this user has been locked out.`
- **Invalid Credentials Error State:** The error container displays the exact text: `Epic sadface: Username and password do not match any user in this service`

## 5. AI Agent Generation Directives
- Generate Gherkin syntax exclusively in English.
- Utilize `Scenario Outline` and `Examples` tables for all data-driven flows.
- Keep steps atomic, reusable, and framework-agnostic.
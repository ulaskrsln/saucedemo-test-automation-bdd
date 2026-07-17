Feature: Burger Menu - Logout and Reset App State

  Background:
    Given I am on the SauceDemo login page
    When I enter username "standard_user" and password "secret_sauce"
    And I click the login button
    Then I should see "successful login"

  Scenario: User can log out from the burger menu
    When I log out from the menu
    Then I should be on the login page

  Scenario: Logged out user cannot return to inventory page via browser back button
    When I log out from the menu
    Then I should be on the login page
    When I click the browser back button
    Then I should be on the login page

  Scenario: Reset App State clears the cart
    When I add the product "Sauce Labs Backpack" to the cart
    And the cart badge should display "1"
    When I reset the app state from the menu
    Then the cart badge should not be visible

Feature: Checkout - Complete purchase

  Background:
    Given I am on the SauceDemo login page
    When I enter username "standard_user" and password "secret_sauce"
    And I click the login button
    Then I should see "successful login"

  Scenario: standard_user completes checkout for "Sauce Labs Backpack"
    When I add the product "Sauce Labs Backpack" to the cart
    And the cart badge should display "1"
    When I click the cart icon
    Then I should be on the Cart page
    When I click the checkout button
    And I enter first name "John" and last name "Doe" and postal code "12345"
    And I click the continue button
    And I click the finish button
    Then the checkout complete message should be "Thank you for  order!"

  Scenario Outline: checkout fails when required information is missing
    When I add the product "Sauce Labs Backpack" to the cart
    And I click the cart icon
    Then I should be on the Cart page
    When I click the checkout button
    And I enter first name "<firstName>" and last name "<lastName>" and postal code "<postalCode>"
    And I click the continue button
    Then I should see the checkout error message "<expectedError>"

    Examples:
      | firstName | lastName | postalCode | expectedError                   |
      |           | Doe      | 12345      | Error: First Name is required   |
      | John      |          | 12345      | Error: Last Name is required    |
      | John      | Doe      |            | Error: Postal Code is required  |
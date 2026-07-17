Feature: Product Detail - View and add to cart from detail page

  Background:
    Given I am on the SauceDemo login page
    When I enter username "standard_user" and password "secret_sauce"
    And I click the login button
    Then I should see "successful login"

  Scenario: View product detail and add to cart from the detail page
    When I click on the product "Sauce Labs Backpack"
    Then I should see the product detail for "Sauce Labs Backpack"
    When I add the product to the cart from the detail page
    And I click the back to products button
    Then the cart badge should display "1"

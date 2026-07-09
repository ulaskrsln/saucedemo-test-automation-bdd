Feature: Inventory - Add product to cart and navigate to Cart page

  Background:
    Given I am on the SauceDemo login page
    When I enter username "standard_user" and password "secret_sauce"
    And I click the login button
    Then I should see "successful login"

  Scenario: standard_user adds "Sauce Labs Backpack" to the cart and navigates to Cart
    When I add the product "Sauce Labs Backpack" to the cart
    Then the cart badge should display "1"
    When I click the cart icon
    Then I should be on the Cart page
    And the cart should contain "Sauce Labs Backpack"
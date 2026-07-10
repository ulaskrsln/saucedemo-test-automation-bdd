Feature: Inventory - Sort products

  Background:
    Given I am on the SauceDemo login page
    When I enter username "standard_user" and password "secret_sauce"
    And I click the login button
    Then I should see "successful login"

  Scenario Outline: standard_user sorts the product list by "<sort_option>"
    When I select the sort option "<sort_option>"
    Then the product list should be sorted by "<sort_option>"

    Examples:
      | sort_option        |
      | Name (A to Z)      |
      | Name (Z to A)      |
      | Price (low to high) |
      | Price (high to low) |

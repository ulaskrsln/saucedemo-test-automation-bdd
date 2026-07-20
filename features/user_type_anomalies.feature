Feature: Known anomalies for error_user and visual_user

  # NOT: problem_user.feature ile aynı sebepten Background kullanmıyoruz —
  # her senaryo farklı bir "anomali kullanıcısı" ile giriş yapıyor.

  Scenario: error_user cannot enter a last name during checkout and finish button does not complete the order
    Given I am on the SauceDemo login page
    When I enter username "error_user" and password "secret_sauce"
    And I click the login button
    Then I should see "successful login"
    When I add the product "Sauce Labs Backpack" to the cart
    And I click the cart icon
    Then I should be on the Cart page
    When I click the checkout button
    And I enter first name "John" and last name "Doe" and postal code "12345"
    Then the last name field should remain empty
    When I click the continue button
    And I click the finish button
    Then I should still be on the checkout overview page

  Scenario: visual_user sees a broken image for the first product
    Given I am on the SauceDemo login page
    When I enter username "visual_user" and password "secret_sauce"
    And I click the login button
    Then I should see "successful login"
    Then the first product image should differ from the other product images
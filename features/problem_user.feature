Feature: problem_user - Known SauceDemo bug (identical product images)

  # Bu feature diğerlerinden farklı olarak Background kullanmıyor,
  # çünkü senaryonun ön koşulu (problem_user ile giriş) diğer senaryolardan
  # farklı bir kullanıcıya ihtiyaç duyuyor.

  Scenario: problem_user sees identical images for all products
    Given I am on the SauceDemo login page
    When I enter username "problem_user" and password "secret_sauce"
    And I click the login button
    Then I should see "successful login"
    And all product images should be identical

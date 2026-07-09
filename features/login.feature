Feature: SauceDemo Login Functionality

  Scenario Outline: User login with valid and invalid credentials
    Given I am on the SauceDemo login page
    When I enter username "<username>" and password "<password>"
    And I click the login button
    Then I should see "<expected_result>"

    Examples:
      | username                | password             | expected_result                                                             |
      | standard_user           | secret_sauce         | successful login                                                            |
      | locked_out_user         | secret_sauce         | Epic sadface: Sorry, this user has been locked out.                         |
      | problem_user            | secret_sauce         | successful login                                                            |
      | performance_glitch_user | secret_sauce         | successful login                                                            |
      | standard_user           | invalid_password_123 | Epic sadface: Username and password do not match any user in this service   |
      | locked_out_user         | invalid_password_123 | Epic sadface: Username and password do not match any user in this service   |
      | problem_user            | invalid_password_123 | Epic sadface: Username and password do not match any user in this service   |
      | performance_glitch_user | invalid_password_123 | Epic sadface: Username and password do not match any user in this service   |
      | standard_user           |                      | Epic sadface: Password is required                                          |
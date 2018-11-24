Feature: Linking
  Background:
    Given "@cajacko/template" is installed globally
    And we create a directory at "/project"
    And we change to the "/project" directory
    And "template --help" is run with the "DEFAULT" params

  Scenario: Using the local libs and running a command uses the local lib
    Given "USE_LOCAL_LIBS" env parameter is set to "true"
    And a local install of this repo "does" exists
    And the "start" command in the local repo has been changed to "CUSTOM_START_SCRIPT_1"
    When "yarn start" is run in the "project" directory
    Then "CUSTOM_START_SCRIPT_1" has been run "1" time

  Scenario: Not using the local libs and running a command does not use the local lib
    Given "USE_LOCAL_LIBS" env parameter is set to "false"
    And a local install of this repo "does" exists
    And the "start" command in the local repo has been changed to "CUSTOM_START_SCRIPT_1"
    When "yarn start" is run in the "project" directory
    Then "CUSTOM_START_SCRIPT_1" has been run "0" times

# Scenario:
#   Given "USE_LOCAL_LIBS" env parameter is set to "true"
#   And a local install of this repo "does not" exists
#   When "yarn start" is run in the "project" directory
#   Then an error is thrown
#   Then "CUSTOM_START_SCRIPT_1" has been run "0" times

# Scenario:
#   Given "USE_LOCAL_LIBS" env parameter is set to "true"
#   And a local install of this repo "does" exists
#   And the "start" command in the local repo has been changed to "CUSTOM_START_SCRIPT_1"
#   When "yarn start" is run in the "project" directory
#   Then "CUSTOM_START_SCRIPT_1" has been run "1" time
#   When "yarn start" is run in the "project" directory
#   Then "CUSTOM_START_SCRIPT_1" has been run "2" times

# Scenario:
#   Given "USE_LOCAL_LIBS" env parameter is set to "true"
#   And a local install of this repo "does" exists
#   And the "start" command in the local repo has been changed to "CUSTOM_START_SCRIPT_1"
#   When "yarn start" is run in the "project" directory
#   Then "CUSTOM_START_SCRIPT_1" has been run "1" time
#   When "USE_LOCAL_LIBS" env parameter is set to "false"
#   When "yarn start" is run in the "project" directory
#   Then "CUSTOM_START_SCRIPT_1" has been run "1" time
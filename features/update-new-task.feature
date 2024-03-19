Feature: Task update
  The reason is to update task data by id.

  Scenario: Task with id isn't exist
    Given update task id is string
    When someone update task and it isn't exist
    Then result should be an error with 404 status and message string

  Scenario: Task with id is exist and both unique name string and priority string passed
    Given update task id is string and unique name string and priority string passed
    When someone update task name and priority and it's exist
    Then result should be an updated task instance by name and priority

  Scenario: Task with id is exist and both not unique name string and priority string passed
    Given update task id is string not unique name string and priority string
    When someone update task with not unique name string and priority string and it's exist
    Then result should be an error with 402 status and message string

  Scenario: Task with id is exist and only name field passed
    Given update task id is string and only name field passed
    When someone update task witn name filed and it's exist
    Then result should be an updated task instance on name field

  Scenario: Task with id is exist and only priority field passed
    Given update task id is string and only priority field passed
    When someone update task witn priority filed and it's exist
    Then result should be an updated task instance on priority field
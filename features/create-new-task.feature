Feature: New task add
  The reason is an unique named task creation.

  Scenario: Task isn't exist
    Given task name is "Add new entity" and priority "medium"
    When someone create new task and it isn't exist
    Then result should be a new task entity with such fields as id, name, priority

  Scenario: Task is exist
    Given task name is "Add new entity"
    When someone create new task and it's exist
    Then result should be an error with 402 status and message with text `Task with name: "Add new entity" already exist`
Feature: TaskService

  Scenario Outline: TaskService.createNewTask
    Given the user wants to create a new task
    When the user provides a task name "<name>" and priority "<priority>"
    Then create "<result>"

    Examples: 
      | name          | priority | result                                                           |
      | New Task      | high     | result should be a created task entity                           |
      | Existing Task | low      | result should be an error that task with such name already exist |

  Scenario Outline: TaskService.updateTask
    Given the user wants to update a task with id "<id>"
    When the user provides the following update data:
      | name   | priority   |
      | <name> | <priority> |
    Then update "<result>"

    Examples: 
      | id         | name          | priority | result                                                             |
      |            | Updated Task  |          | result should be an error that task not found                      |
      | lNbNDr8UCx | New Task      | high     | result should be a updated task entity                             |
      | lNbNDr8UCx | Existing Task | low      | result should be an error that task with given name already exists |
      | lNbNDr8UCx | Updated Task  |          | result should be a updated task entity on name field               |
      | lNbNDr8UCx |               | medium   | result should be a updated task entity on priority field           |

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

  Scenario Outline: TaskService.getTaskById
    Given a list of task in the application for get by id
    When the user wants to get a task with id "<id>"
    Then get by id "<result>"

    Examples: 
      | id         | result                        |
      | lNbNDr8UCx | task entity                   |
      | lNbNDr8UCz | undefined as not exist result |

  Scenario Outline: TaskService.getTaskByName
    Given a list of task in the application for get by name
    When the user wants to get a task with name "<name>"
    Then get by name "<result>"

    Examples: 
      | name            | result                        |
      | Existing Task 1 | task entity                   |
      | Existing Task 3 | undefined as not exist result |

  Scenario: TaskService.getTasks
    Given there are tasks in the application
    When the user wants to get all tasks
    Then all tasks should be get successfully

  Scenario Outline: TaskService.deleteTask
    Given there are tasks in the system that could be deleted
    When the user wants to delete a task with id "<id>"
    Then delete task "<result>"

    Examples: 
      | id         | result                               |
      | lNbNDr8UCx | result should be succesfull deletion |
      | lNbNDr8UCz | result should be not found error     |

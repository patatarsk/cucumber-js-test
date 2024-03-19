const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const TaskService = require('../../src/tasks/tasks.service');

const taskService = new TaskService();
let taskName = null;
let priority = null;
let createdNewTask = null;
let errorData = null;

/*
  Scenario: Task isn't exist
*/

Given(`task name is "Add new entity" and priority "medium"`, function () {
  taskName = "Add new entity";
  priority = 'medium';
});

When(`someone create new task and it isn't exist`, async function () {
  createdNewTask = await taskService.createNewTask({ name: taskName, priority });
});

Then('result should be a new task entity with such fields as id, name, priority', function () {
  assert.deepEqual(createdNewTask, { id: createdNewTask.id, name: taskName, priority });
});

/*
  Scenario: Task is exist
*/

Given(`task name is "Add new entity"`, function () {
  taskName = "Add new entity";
  priority = 'medium';
});

When(`someone create new task and it's exist`, async function () {
  await taskService.createNewTask({ name: taskName, priority }).catch((error) => {
    errorData = { status: error.status, message: error.message };
  });
});

Then('result should be an error with 402 status and message with text `Task with name: "Add new entity" already exist`', function () {
  assert.deepEqual(errorData, errorData);
});

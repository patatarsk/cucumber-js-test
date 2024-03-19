const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const TaskService = require('../../src/tasks/tasks.service');

const taskService = new TaskService();

/*
  Scenario: Task with id isn't exist
*/

let taskName = null;
let priority = null;
let errorData = null;
let id;
let updatedInstance = null;
let newTaskName = null;
let newPriority = null;

Given('update task id is string', function () {
  const taskName = "Add new entity";
  const priority = "low";
  id = 'test';
});

When(`someone update task and it isn't exist`, async function () {
  errorData = await taskService.updateTask({ id, name: taskName, priority }).catch(({ status, message }) => ({ status, message }));
});

Then('result should be an error with 404 status and message string', function () {
  const error = { status: 404, message: 'Task with id: "test" not found' }
  assert.deepEqual(errorData, error);
});

/*
  Scenario: Task with id is exist and both unique name string and priority string passed
*/

Given('update task id is string and unique name string and priority string passed', async function () {
  const taskName = "Add new entity";
  const priority = "low";
  task  = await taskService.createNewTask({ name: taskName, priority });
  id = task.id;
  newTaskName = "Add new entity instance";
  newPriority = "high";
});

When(`someone update task name and priority and it's exist`, async function () {
  updatedInstance = await taskService.updateTask({ id, name: newTaskName, priority: newPriority });
});

Then('result should be an updated task instance by name and priority', function () {
  assert.deepEqual(updatedInstance, { id, name: newTaskName, priority: newPriority });
});

/*
  Scenario: Task with id is exist and both not unique name string and priority string passed
*/

Given('update task id is string not unique name string and priority string', async function () {
  const taskName = "Add new entity not unique";
  const priority = "low";
  task  = await taskService.createNewTask({ name: taskName, priority });
  id = task.id;
  newTaskName = "Add new entity not unique";
  newPriority = "high";
});

When(`someone update task with not unique name string and priority string and it's exist`, async function () {
  errorData = await taskService.updateTask({ id, name: newTaskName, priority: newPriority }).catch(({ status, message }) => ({ status, message }));
});

Then('result should be an error with 402 status and message string', function () {
  const error = { status: 402, message: 'Task with name: "Add new entity not unique" already exist' }
  assert.deepEqual(errorData, error);
});

/*
  Scenario: Task with id is exist and only name field passed
*/

let taskNameBeforeUpdate = null;
let taskNameToUpdate = null;

Given('update task id is string and only name field passed', async function () {
  taskNameBeforeUpdate = "Add new entity name before update";
  taskNameToUpdate = "Add new entity name after update";
  const priority = "low";
  taskBeforeUpdate  = await taskService.createNewTask({ name: taskNameBeforeUpdate, priority });
  id = taskBeforeUpdate.id;
});

When(`someone update task witn name filed and it's exist`, async function () {
  updatedInstance = await taskService.updateTask({ id, name: taskNameToUpdate });
});

Then('result should be an updated task instance on name field', function () {
  assert.notEqual(taskNameBeforeUpdate, updatedInstance.name);
});

/*
  Scenario: Task with id is exist and only priority field passed
*/

let taskPriorityBeforeUpdate = null;
let taskPriorityToUpdate = null;

Given('update task id is string and only priority field passed', async function () {
  const taskName = "Add new entity name any sample";
  taskPriorityBeforeUpdate = "low";
  taskPriorityToUpdate = "medium";
  taskBeforeUpdate  = await taskService.createNewTask({ name: taskName, priority: taskPriorityBeforeUpdate });
  id = taskBeforeUpdate.id;
});

When(`someone update task witn priority filed and it's exist`, async function () {
  updatedInstance = await taskService.updateTask({ id, priority: taskPriorityToUpdate });
});

Then('result should be an updated task instance on priority field', function () {
  assert.notEqual(taskPriorityBeforeUpdate, updatedInstance.priority);
});

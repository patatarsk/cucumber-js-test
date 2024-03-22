const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const { nanoid } = require('nanoid');

Given('the user wants to create a new task', function () {
  this.taskService = global.taskService;

  this.existingTask = {
    id: nanoid(),
    name: 'Existing Task',
    priority: 'medium',
  }

  this.taskService.tasks = [this.existingTask];

  this.error = null;
});

When('the user provides a task name {string} and priority {string}', async function (name, priority) {
  this.inputParams = { name, priority };

  try {
    this.createdTask = await this.taskService.createNewTask({ name, priority });
    this.inputParams.id = this.createdTask.id;
  } catch (error) {
    this.error = { message: error.message, status: error.status };
  }
});

Then('create {string}', function (result) {

  if (result === 'result should be a created task entity') {
    assert(this.createdTask, { ...this.inputParams });
  }

  if (result === 'result should be an error that task with such name already exist') {
    assert.deepEqual(this.error, { status: 402, message: `Task with name: "${this.inputParams.name}" already exist` });
  }
});

const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

Given("a list of task in the application for get by name", function () {
  this.taskService = global.taskService;

  this.existingTasks = [{
    id: 'lNbNDr8UCx',
    name: "Existing Task 1",
    priority: "medium",
  }, {
    id: 'lNbNDr8UCy',
    name: "Existing Task 2",
    priority: "medium",
  },];

  this.taskService.tasks = this.existingTasks;
});

When('the user wants to get a task with name {string}', async function (name) {
  this.task = await this.taskService.getTaskByName(name);
});

Then('get by name {string}', function (result) {
  if (result === 'not found error') {
    assert.equal(this.task, undefined);
  }

  if (result === 'task entity') {
    assert.notEqual(this.task, undefined);
  }
});

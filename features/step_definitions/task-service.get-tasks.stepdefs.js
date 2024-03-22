const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

Given("there are tasks in the application", function () {
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

When('the user wants to get all tasks', async function () {
  this.tasks = await this.taskService.getTasks();
});

Then('all tasks should be get successfully', async function () {
  assert.equal(this.tasks.length, this.existingTasks.length);
});
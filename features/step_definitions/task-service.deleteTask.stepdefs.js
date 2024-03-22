const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

Given('there are tasks in the system that could be deleted', function () {
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

When('the user wants to delete a task with id {string}', async function (id) {
  this.id = id;

  try {
    await this.taskService.deleteTask(id);
  } catch (error) {
    this.error = { message: error.message, status: error.status };
  }
});

Then('delete task {string}', function (result) {
  if (result === 'result should be succesfull deletion') {
    assert.notDeepEqual(this.existingTasks, this.taskService.tasks);
  }

  if (result === 'result should be not found error') {
    assert.deepEqual(this.error, { status: 404, message: `Task with id: "${this.id}" not found` });
  }
});

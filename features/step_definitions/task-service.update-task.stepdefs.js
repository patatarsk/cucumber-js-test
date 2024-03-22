const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

Given("the user wants to update a task with id {string}", function (id) {
  this.taskService = global.taskService;

  this.existingTask = {
    id,
    name: "Existing Task",
    priority: "medium",
  };

  this.id = id || "none";
  this.taskService.tasks = [this.existingTask];
  this.error = null;
});

When('the user provides the following update data:', async function (updateData) {
  this.updateData = updateData.hashes()[0];
  const { name, priority } = this.updateData;


  try {
    this.updatedTask = await this.taskService.updateTask({ id: this.id, name, priority });
  } catch (error) {
    this.error = { message: error.message, status: error.status };
  }
});

Then('update {string}', function (result) {
  if (result === 'result should be an error that task not found') {
    assert.deepEqual(this.error, { status: 404, message: `Task with id: "${this.id}" not found` });
  }

  if (result === 'result should be a updated task entity') {
    assert(this.updatedTask, { id: this.id, ...this.updateData });
  }

  if (result === 'result should be an error that task with given name already exists') {
    assert.deepEqual(this.error, { status: 402, message: `Task with name: "${this.updateData.name}" already exist` });
  }

  if (result === 'result should be a updated task entity on name field') {
    assert.equal(this.updateData.name, this.updatedTask.name);
  }

  if (result === 'result should be a updated task entity on priority field') {
    assert.equal(this.updateData.priority, this.updatedTask.priority);
  }
});

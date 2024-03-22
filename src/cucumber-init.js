const { BeforeAll } = require('@cucumber/cucumber');
const TaskService = require('./tasks/tasks.service');

const beforeAllInit = function () {
  global.taskService = new TaskService();
}

BeforeAll(beforeAllInit);

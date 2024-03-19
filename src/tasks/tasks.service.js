const { nanoid } = require('nanoid');

module.exports = class TaskService {
  constructor() {
    this.tasks = [];
  }

  async createNewTask({ name, priority }) {
    const task = await this.getTaskByName(name);

    if (task) {
      const status = 402;
      const error = new Error(`Task with name: "${name}" already exist`);
      error.status = status;
  
      throw error;
    }

    const idDefaultSize = 10;
    const id = nanoid(idDefaultSize);

    const newTask = { id, name, priority };
    this.tasks.push(newTask);

    return newTask;
  }

  async updateTask({ id, name, priority }) {
    const task = await this.getTaskById(id);

    if (!task) {
      const status = 404;
      const error = new Error(`Task with id: "${id}" not found`);
      error.status = status;
  
      throw error;
    }

    if (name) {
      const taskWithSameName = await this.getTaskByName(name);

      if (taskWithSameName) {
        const status = 402;
        const error = new Error(`Task with name: "${name}" already exist`);
        error.status = status;
    
        throw error;
      }

      task.name = name;
    }

    if (priority) {
      task.priority = priority;
    }

    return task;
  }

  async getTaskById(id) {
    return this.tasks.find((el) => el.id === id);
  }

  async getTaskByName(name) {
    return this.tasks.find((el) => el.name === name);
  }

  async deleteTask(id) {
    const taskToRemove = await this.getTaskById(id);
    const updateData = {};

    if (!taskToRemove) {
      const status = 404;
      const error = new Error(`Task with id: "${id}" not found`);
      error.status = status;
  
      throw error;
    }

    this.tasks = this.tasks.filter((el) => el.id !== id);
  }

  async getTasks() {
    return this.tasks;
  }
}
import { v4 as uuidv4 } from "uuid";

// Mock database
let tasks = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Finalize the Q4 project proposal for client review",
    deadline: "2025-07-20T14:00:00.000Z",
    isCompleted: false,
    createdAt: "2025-07-18T10:00:00.000Z",
    updatedAt: "2025-07-18T10:00:00.000Z",
  },
  {
    id: "2",
    title: "Team meeting preparation",
    description: "Prepare agenda and materials for Monday team meeting",
    deadline: "2025-07-21T09:00:00.000Z",
    isCompleted: false,
    createdAt: "2025-07-18T09:00:00.000Z",
    updatedAt: "2025-07-18T09:00:00.000Z",
  },
  {
    id: "3",
    title: "Review code changes",
    description: "Review and approve pending pull requests",
    deadline: "2025-07-17T17:00:00.000Z",
    isCompleted: false,
    createdAt: "2025-07-17T08:00:00.000Z",
    updatedAt: "2025-07-17T08:00:00.000Z",
  },
  {
    id: "4",
    title: "Update documentation",
    description: "Update API documentation with latest changes",
    deadline: "2025-07-19T12:00:00.000Z",
    isCompleted: true,
    createdAt: "2025-07-16T14:00:00.000Z",
    updatedAt: "2025-07-18T11:00:00.000Z",
  },
];

// Simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const taskApi = {
  async getTasks() {
    await delay(500);
    return [...tasks];
  },

  async createTask(taskData) {
    await delay(300);
    const newTask = {
      id: uuidv4(),
      ...taskData,
      isCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    return newTask;
  },

  async updateTask(id, updates) {
    await delay(300);
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new Error("Task not found");
    }

    const updatedTask = {
      ...tasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    tasks[taskIndex] = updatedTask;
    return updatedTask;
  },

  async deleteTask(id) {
    await delay(300);
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new Error("Task not found");
    }

    tasks.splice(taskIndex, 1);
    return true;
  },
};

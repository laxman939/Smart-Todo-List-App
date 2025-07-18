import React, { createContext, useContext, useReducer, useEffect } from "react";
import { taskApi } from "../services/mockApi";
import { isTaskOverdue, getTaskStatus } from "../utils/dateUtils";

const TaskContext = createContext();

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  filter: "all",
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_TASKS":
      return { ...state, tasks: action.payload, loading: false, error: null };
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        loading: false,
      };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "SET_FILTER":
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Load tasks on mount
  useEffect(() => {
    loadTasks();
  }, []);

  // Real-time updates every minute
  useEffect(() => {
    const interval = setInterval(() => {
      // Trigger re-render to update countdowns and move overdue tasks
      dispatch({ type: "SET_TASKS", payload: [...state.tasks] });
    }, 60000);

    return () => clearInterval(interval);
  }, [state.tasks]);

  const loadTasks = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const tasks = await taskApi.getTasks();
      dispatch({ type: "SET_TASKS", payload: tasks });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const createTask = async (taskData) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const newTask = await taskApi.createTask(taskData);
      dispatch({ type: "ADD_TASK", payload: newTask });
      return newTask;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const updatedTask = await taskApi.updateTask(id, updates);
      dispatch({ type: "UPDATE_TASK", payload: updatedTask });
      return updatedTask;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskApi.deleteTask(id);
      dispatch({ type: "DELETE_TASK", payload: id });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  };

  const getTasksByStatus = (status) => {
    return state.tasks.filter((task) => getTaskStatus(task) === status);
  };

  const value = {
    ...state,
    createTask,
    updateTask,
    deleteTask,
    loadTasks,
    getTasksByStatus,
    setFilter: (filter) => dispatch({ type: "SET_FILTER", payload: filter }),
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};

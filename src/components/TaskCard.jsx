import React, { useState } from "react";
import { useTask } from "../contexts/TaskContext";
import { getTimeUntilDeadline, getPriorityLevel } from "../utils/dateUtils";
import { Check, X, Edit3, Trash2, Clock } from "lucide-react";
import toast from "react-hot-toast";
import TaskForm from "./TaskForm";

const TaskCard = ({ task }) => {
  const { updateTask, deleteTask } = useTask();
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const priorityLevel = getPriorityLevel(task.deadline);
  const timeDisplay = getTimeUntilDeadline(task.deadline);

  const priorityColors = {
    overdue: "bg-danger-50 border-danger-200 text-danger-700",
    urgent: "bg-warning-50 border-warning-200 text-warning-700",
    approaching: "bg-yellow-50 border-yellow-200 text-yellow-700",
    normal: "bg-gray-50 border-gray-200 text-gray-700",
  };

  const handleToggleComplete = async () => {
    setIsUpdating(true);
    try {
      await updateTask(task.id, { isCompleted: !task.isCompleted });
      toast.success(
        task.isCompleted ? "Task marked as incomplete" : "Task completed!"
      );
    } catch (error) {
      toast.error("Failed to update task");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(task.id);
        toast.success("Task deleted successfully");
      } catch (error) {
        toast.error("Failed to delete task");
      }
    }
  };

  if (isEditing) {
    return <TaskForm task={task} onClose={() => setIsEditing(false)} />;
  }

  return (
    <div
      className={`p-4 rounded-lg group relative border-2 transition-all duration-200 hover:shadow-md animate-fade-in overflow-hidden ${priorityColors[priorityLevel]}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-75 transition-opacity duration-300 z-10"></div>
      <div className="flex items-start justify-between column">
        <div className="flex-1 transition-filter duration-300">
          <h3
            className={`font-semibold text-lg ${
              task.isCompleted ? "line-through text-gray-500" : ""
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p
              className={`text-sm mt-1 ${
                task.isCompleted ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {task.description}
            </p>
          )}
          <div className="flex items-center mt-2 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            <span
              className={`font-medium ${
                priorityLevel === "overdue"
                  ? "text-danger-600"
                  : priorityLevel === "urgent"
                  ? "text-warning-600"
                  : "text-gray-600"
              }`}
            >
              {timeDisplay}
            </span>
          </div>
        </div>

        <div className="hidden group-hover:flex items-center space-x-2 transition-all duration-300 opacity-0 group-hover:opacity-100 z-30 absolute right-2">
          <button
            onClick={handleToggleComplete}
            disabled={isUpdating}
            className={`p-2 rounded-full transition-colors ${
              task.isCompleted
                ? "bg-success-500 text-white hover:bg-success-600"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
            title={task.isCompleted ? "Mark as incomplete" : "Mark as complete"}
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-full bg-gray-500 text-primary-600 hover:bg-gray-400 transition-colors"
            title="Edit task"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 rounded-full bg-gray-500 text-danger-600 hover:bg-gray-400 transition-colors"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

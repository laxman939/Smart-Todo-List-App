import React from "react";
import TaskCard from "./TaskCard";
import { CheckCircle, Clock, XCircle } from "lucide-react";

const TaskBucket = ({ title, tasks, status, icon: Icon }) => {
  const statusColors = {
    ongoing: "bg-primary-50 border-primary-200",
    success: "bg-success-50 border-success-200",
    failure: "bg-danger-50 border-danger-200",
  };

  const titleColors = {
    ongoing: "text-primary-700",
    success: "text-success-700",
    failure: "text-danger-700",
  };

  return (
    <div className={`rounded-lg border-2 p-4 ${statusColors[status]}`}>
      <div className="flex items-center justify-between mb-4">
        <h2
          className={`text-xl font-semibold flex items-center ${titleColors[status]}`}
        >
          <Icon className="w-6 h-6 mr-2" />
          {title}
        </h2>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${titleColors[status]} bg-white`}
        >
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No tasks in this category</p>
          </div>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
};

export default TaskBucket;

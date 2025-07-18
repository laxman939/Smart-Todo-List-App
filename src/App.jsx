import React, { useState } from "react";
import { TaskProvider, useTask } from "./contexts/TaskContext";
import { Toaster } from "react-hot-toast";
import TaskForm from "./components/TaskForm";
import TaskBucket from "./components/TaskBucket";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import { Clock, CheckCircle, XCircle, Plus, Filter } from "lucide-react";

const AppContent = () => {
  const { getTasksByStatus, loading, error } = useTask();
  const [showForm, setShowForm] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const ongoingTasks = getTasksByStatus("ongoing");
  const successTasks = getTasksByStatus("success");
  const failureTasks = getTasksByStatus("failure");

  const filters = [
    {
      id: "all",
      label: "All Tasks",
      count: ongoingTasks.length + successTasks.length + failureTasks.length,
    },
    { id: "ongoing", label: "Ongoing", count: ongoingTasks.length },
    { id: "success", label: "Success", count: successTasks.length },
    { id: "failure", label: "Failure", count: failureTasks.length },
  ];

  const getFilteredBuckets = () => {
    const buckets = [
      {
        title: "Ongoing Tasks",
        tasks: ongoingTasks,
        status: "ongoing",
        icon: Clock,
      },
      {
        title: "Completed Tasks",
        tasks: successTasks,
        status: "success",
        icon: CheckCircle,
      },
      {
        title: "Overdue Tasks",
        tasks: failureTasks,
        status: "failure",
        icon: XCircle,
      },
    ];

    if (activeFilter === "all") return buckets;
    return buckets.filter((bucket) => bucket.status === activeFilter);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className={`container mx-auto px-4 py-8 relative`}>
        {/* Header */}
        <div className={`mb-8 text-center`}>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Smart Todo List
          </h1>
          <p className="text-gray-600">
            Organize your tasks with intelligent time-based categorization
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter.id
                    ? "bg-primary-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                } border`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>

          {/* Add Task Button */}
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Task
          </button>
        </div>

        {/* Task Form */}
        {showForm && (
          <div className="mb-8">
            <TaskForm onClose={() => setShowForm(false)} />
          </div>
        )}

        {/* Task Buckets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {getFilteredBuckets().map((bucket) => (
            <TaskBucket
              key={bucket.status}
              title={bucket.title}
              tasks={bucket.tasks}
              status={bucket.status}
              icon={bucket.icon}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Task Statistics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-primary-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary-600">
                {ongoingTasks.length}
              </div>
              <div className="text-sm text-primary-700">Ongoing Tasks</div>
            </div>
            <div className="bg-success-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-success-600">
                {successTasks.length}
              </div>
              <div className="text-sm text-success-700">Completed Tasks</div>
            </div>
            <div className="bg-danger-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-danger-600">
                {failureTasks.length}
              </div>
              <div className="text-sm text-danger-700">Overdue Tasks</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <TaskProvider>
      <AppContent />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </TaskProvider>
  );
};

export default App;

import { formatDistanceToNow, isPast, parseISO } from "date-fns";

export const getTaskStatus = (task) => {
  if (task.isCompleted) return "success";
  if (isPast(parseISO(task.deadline))) return "failure";
  return "ongoing";
};

export const isTaskOverdue = (task) => {
  return !task.isCompleted && isPast(parseISO(task.deadline));
};

export const getTimeUntilDeadline = (deadline) => {
  const deadlineDate = parseISO(deadline);
  const now = new Date();

  if (isPast(deadlineDate)) {
    return `Overdue by ${formatDistanceToNow(deadlineDate)}`;
  }

  return `Due in ${formatDistanceToNow(deadlineDate)}`;
};

export const getPriorityLevel = (deadline) => {
  const deadlineDate = parseISO(deadline);
  const now = new Date();
  const hoursUntilDeadline = (deadlineDate - now) / (1000 * 60 * 60);

  if (hoursUntilDeadline < 0) return "overdue";
  if (hoursUntilDeadline < 24) return "urgent";
  if (hoursUntilDeadline < 72) return "approaching";
  return "normal";
};

export const formatDeadlineForInput = (deadline) => {
  const date = parseISO(deadline);
  return date.toISOString().slice(0, 16);
};

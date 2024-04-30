const ApiError = require("../error/ApiError.js");

const Task = require("../model/task.model.js");

const handleCreateTask = async (taskData) => {
  const { title, description, project, assigns, due_date } = taskData;
  const user = req.user;

  if (!title) {
    throw new ApiError(400, "Title is required");
  }

  const newTask = await Task.create({
    title,
    description,
    project,
    creator: user._id,
    assigns: assigns || [],
    due_date,
  });

  return {
    task: newTask,
  };
};

const handleGetTasks = async () => {
  const tasks = await Task.find();

  return {
    tasks,
  };
};

const handleGetSingleTask = async (taskId) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return {
    task,
  };
};

const handleEditTask = async (taskId, taskData) => {
  const { title, description, project, assigns, due_date } = taskData;

  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    {
      title,
      description,
      project,
      assigns,
      due_date,
    },
    { new: true }
  );

  return {
    task: updatedTask,
  };
};

const handleDeleteTask = async (taskId) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  await Task.findByIdAndDelete(taskId);

  return;
};

const TaskService = {
  handleCreateTask,
  handleGetTasks,
  handleGetSingleTask,
  handleEditTask,
  handleDeleteTask,
};

module.exports = TaskService;

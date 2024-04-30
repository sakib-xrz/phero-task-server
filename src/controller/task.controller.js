const catchAsync = require("../utils/catchAsync.js");
const sendResponse = require("../utils/sendResponse.js");

const TaskService = require("../service/task.service.js");

const createTask = catchAsync(async (req, res) => {
  const { ...taskData } = req.body;

  const result = await TaskService.handleCreateTask(taskData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Task created successfully",
    data: {
      task: result.task,
    },
  });
});

const getTasks = catchAsync(async (_req, res) => {
  const result = await TaskService.handleGetTasks();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tasks retrieved successfully",
    data: {
      tasks: result.tasks,
    },
  });
});

const getSingleTask = catchAsync(async (req, res) => {
  const { taskId } = req.params;

  const result = await TaskService.handleGetSingleTask(taskId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Task retrieved successfully",
    data: {
      task: result.task,
    },
  });
});

const editTask = catchAsync(async (req, res) => {
  const { taskId } = req.params;
  const { ...taskData } = req.body;

  const result = await TaskService.handleEditTask(taskId, taskData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Task edited successfully",
    data: {
      task: result.task,
    },
  });
});

const deleteTask = catchAsync(async (req, res) => {
  const { taskId } = req.params;

  await TaskService.handleDeleteTask(taskId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Task deleted successfully",
  });
});

const taskController = {
  createTask,
  getTasks,
  getSingleTask,
  editTask,
  deleteTask,
};

module.exports = taskController;

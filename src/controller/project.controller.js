const catchAsync = require("../utils/catchAsync.js");
const sendResponse = require("../utils/sendResponse.js");

const ProjectService = require("../service/project.service.js");

const createProject = catchAsync(async (req, res) => {
  const { ...projectData } = req.body;
  const user = req.user;

  const result = await ProjectService.handleCreateProject(projectData, user);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Project created successfully",
    data: {
      project: result.project,
    },
  });
});

const getProjects = catchAsync(async (_req, res) => {
  const result = await ProjectService.handleGetProjects();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Projects retrieved successfully",
    data: {
      projects: result.projects,
    },
  });
});

const getSingleProject = catchAsync(async (req, res) => {
  const { projectId } = req.params;

  const result = await ProjectService.handleGetSingleProject(projectId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project retrieved successfully",
    data: {
      project: result.project,
    },
  });
});

const editProject = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const { ...projectData } = req.body;

  const result = await ProjectService.handleEditProject(projectId, projectData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project edited successfully",
    data: {
      project: result.project,
    },
  });
});

const deleteProject = catchAsync(async (req, res) => {
  const { projectId } = req.params;

  await ProjectService.handleDeleteProject(projectId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project deleted successfully",
  });
});

const ProjectController = {
  createProject,
  getProjects,
  getSingleProject,
  editProject,
  deleteProject,
};

module.exports = ProjectController;

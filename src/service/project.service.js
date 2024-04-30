const ApiError = require("../error/ApiError.js");
const Project = require("../model/project.model.js");
const Task = require("../model/task.model.js");

const handleCreateProject = async (projectData, user) => {
  const { title, description } = projectData;

  if (!title) {
    throw new ApiError(400, "Title is required");
  }

  const newProject = await Project.create({
    title,
    description,
    creator: user._id,
  });

  return {
    project: newProject,
  };
};

const handleGetProjects = async () => {
  const projects = await Project.find();

  return {
    projects,
  };
};

const handleGetSingleProject = async (projectId) => {
  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  console.log(project);

  return {
    project,
  };
};

const handleEditProject = async (projectId, projectData) => {
  const { title, description, collaborators } = projectData;

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  const updatedProject = await Project.findByIdAndUpdate(
    projectId,
    {
      title,
      description,
      collaborators,
    },
    { new: true }
  );

  return {
    project: updatedProject,
  };
};

const handleDeleteProject = async (projectId) => {
  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  await Project.findByIdAndDelete(projectId);

  await Task.deleteMany({ project: projectId });

  return;
};

const ProjectService = {
  handleCreateProject,
  handleGetProjects,
  handleGetSingleProject,
  handleEditProject,
  handleDeleteProject,
};

module.exports = ProjectService;

const express = require("express");

const ProjectController = require("../../controller/project.controller.js");

const authGuard = require("../../middleware/authGuard.js");

const projectRoutes = express.Router();

projectRoutes.post("/", authGuard(), ProjectController.createProject);

projectRoutes.get("/", authGuard(), ProjectController.getProjects);

projectRoutes.get(
  "/:projectId",
  authGuard(),
  ProjectController.getSingleProject
);

projectRoutes.patch("/:projectId", authGuard(), ProjectController.editProject);

projectRoutes.delete(
  "/:projectId",
  authGuard(),
  ProjectController.deleteProject
);

module.exports = projectRoutes;

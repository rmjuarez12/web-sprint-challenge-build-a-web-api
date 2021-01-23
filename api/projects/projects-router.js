//* Import express and setup the router
const express = require("express");
const router = express.Router();

//* Import Models
const Projects = require("./projects-model");

//* Import Middleware
const getMiddleware = require("../middleware/middleware");

//* Setup Endpoint Handlers

// GET - Get all projects
router.get("/", (req, res) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// GET - Get a specific project
router.get("/:id", getMiddleware.validateProjectID(Projects), (req, res) => {
  const project = req.project;

  res.status(200).json(project);
});

// GET - Get all actions from a project
router.get(
  "/:id/actions",
  getMiddleware.validateProjectID(Projects),
  (req, res) => {
    const { id } = req.params;

    Projects.getProjectActions(id)
      .then((actions) => {
        res.status(200).json(actions);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

// POST - Create a new project
router.post("/", getMiddleware.validateProjectBody, (req, res) => {
  const newProject = req.body;

  Projects.insert(newProject)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// PUT - Update a specific project
router.put(
  "/:id",
  [
    getMiddleware.validateProjectID(Projects),
    getMiddleware.validateProjectBody,
  ],
  (req, res) => {
    const { id } = req.params;
    const projectChanges = req.body;

    Projects.update(id, projectChanges)
      .then((project) => {
        res.status(200).json(project);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

// DELETE - Delete a specific project
router.delete("/:id", getMiddleware.validateProjectID(Projects), (req, res) => {
  const { id } = req.params;

  Projects.remove(id)
    .then(() => {
      res.status(200).json({ message: "Project has been deleted!" });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//* Export Module
module.exports = router;

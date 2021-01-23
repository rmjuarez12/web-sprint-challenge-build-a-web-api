//* Import express and setup router
const express = require("express");
const router = express.Router();

//* Import Models
const Actions = require("./actions-model");

//* Import Middleware
const getMiddleware = require("../middleware/middleware");

//* Setup Endpoint Handlers

// GET - Get all actions
router.get("/", (req, res) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// GET - Get a specific action
router.get("/:id", getMiddleware.validateActionID(Actions), (req, res) => {
  const actionData = req.action;

  res.status(200).json(actionData);
});

// POST - Create a new action to the appointed Project
router.post("/", getMiddleware.validateActionBody, (req, res) => {
  const newAction = req.body;

  Actions.insert(newAction)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// PUT - Updates a specific action
router.put(
  "/:id",
  [getMiddleware.validateActionID(Actions), getMiddleware.validateActionBody],
  (req, res) => {
    const { id } = req.params;
    const actionChanges = req.body;

    Actions.update(id, actionChanges)
      .then((action) => {
        res.status(200).json(action);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

// DELETE - Deletes a specific action
router.delete("/:id", getMiddleware.validateActionID(Actions), (req, res) => {
  const { id } = req.params;

  Actions.remove(id)
    .then(() => {
      res.status(200).json({ message: "Action has been deleted" });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//* Export Modules
module.exports = router;

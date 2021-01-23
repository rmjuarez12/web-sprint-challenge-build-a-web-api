//****** Middleware functions to be used for `projects` and `actions` routers ******/

//* Function to ensure an action with the specified ID is found
const validateActionID = (actionsModel) => (req, res, next) => {
  const { id } = req.params;

  actionsModel.get(id).then((action) => {
    if (action) {
      req.action = action;
      next();
    } else {
      res.status(404).json({ message: "Action Not Found!" });
    }
  });
};

//* Function to ensure the req.body for actions has valid data
const validateActionBody = (req, res, next) => {
  const newAction = req.body;

  if (!newAction.project_id || newAction.project_id === "") {
    res.status(400).json({ message: "Project ID not specified in the body" });
  } else if (!newAction.description || newAction.description === "") {
    res
      .status(400)
      .json({ message: "Please enter a description for the action" });
  } else if (!newAction.notes || newAction.notes === "") {
    res.status(400).json({ message: "Please enter notes for the action" });
  } else {
    next();
  }
};

//* Function to ensure an action with the specified ID is found
const validateProjectID = (projectModel) => (req, res, next) => {
  const { id } = req.params;

  projectModel.get(id).then((project) => {
    if (project) {
      req.project = project;
      next();
    } else {
      res.status(404).json({ message: "Project Not Found!" });
    }
  });
};

//* Function to ensure the req.body for projects has valid data
const validateProjectBody = (req, res, next) => {
  const newProject = req.body;

  if (!newProject.name || newProject.name === "") {
    res.status(400).json({ message: "Please enter a name for the project" });
  } else if (!newProject.description || newProject.description === "") {
    res
      .status(400)
      .json({ message: "Please enter a description for the project" });
  } else {
    next();
  }
};

//* Export all modules
module.exports = {
  validateActionID,
  validateActionBody,
  validateProjectID,
  validateProjectBody,
};

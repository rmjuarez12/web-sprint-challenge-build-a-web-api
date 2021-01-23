//****** Middleware functions to be used for `projects` and `actions` routers ******/

//* Function to ensure an action with the specified ID is found
const validateActionID = (actionsModel) => (req, res, next) => {
  const { id } = req.params;

  actionsModel.get(id).then((action) => {
    if (action) {
      req.action = action;
      next();
    } else {
      res.status(500).json({ message: "Action Not Found!" });
    }
  });
};

//* Function to ensure the req.body has valid data
const validateActionBody = (req, res, next) => {
  const newAction = req.body;

  if (!newAction.project_id || newAction.project_id === "") {
    res.status(400).json({ message: "Project ID not specified in the body" });
  } else if (!newAction.description || newAction.description === "") {
    res
      .status(400)
      .json({ message: "Please provide a description for the action" });
  } else if (!newAction.notes || newAction.notes === "") {
    res.status(400).json({ message: "Please provide notes for the action" });
  } else {
    next();
  }
};

//* Export all modules
module.exports = {
  validateActionID,
  validateActionBody,
};

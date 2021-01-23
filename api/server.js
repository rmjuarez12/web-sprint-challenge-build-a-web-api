//* Import express and setup server
const express = require("express");
const server = express();

//* Ensure we use JSON parser
server.use(express.json());

//* Import Routers
const actionsRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");

//* Setup The Routers
server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

//* Export Server
module.exports = server;

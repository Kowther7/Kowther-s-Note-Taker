// Importing the Express framework
const express = require("express");

// Importing the router for handling note-related routes
const notesRouter = require("./notes");

// Creating an instance of the Express application
const app = express();

// Mounting the notesRouter under the "/notes" path
app.use("/notes", notesRouter);

// Exporting the configured Express application for use in other parts of the application
module.exports = app;

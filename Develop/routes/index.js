const express = require("express");

// Importing separate routers for the /notes endpoint
const notesRouter = require("./notes");

const app = express();

// Mounting the notesRouter for handling routes under /notes
app.use("/notes", notesRouter);

module.exports = app;

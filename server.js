// Importing required modules
const express = require("express");
const path = require("path");
const { myMiddleware } = require("./middleware/middleware");
const api = require("./routes/index.js");

// Setting up the port for the server to listen on
const PORT = process.env.PORT || 3001;

// Creating an Express application
const app = express();

// Using custom middleware, "myMiddleware"
app.use(myMiddleware);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mounting the API routes under the "/api" path
app.use("/api", api);

// Serving static files from the "public" directory
app.use(express.static("public"));

// GET Route for serving the notes page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// GET Route for serving the homepage
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// Starting the server and listening on the specified port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

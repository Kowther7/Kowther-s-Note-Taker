// Importing the Express Router and UUID library
const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");

// Importing file handling functions for reading and writing notes
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../fileUtilities/fileHandler");

// GET Route to retrieve all notes
notes.get("/", (req, res) => {
  // Reading data from the JSON file containing notes and responding with parsed JSON
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// GET Route to retrieve a specific note by ID
notes.get("/:note_id", (req, res) => {
  // Extracting the note ID from the request parameters
  const noteId = req.params.note_id;

  // Reading and parsing data from the JSON file
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Filtering notes based on the provided ID
      const result = json.filter((note) => note.note_id === noteId);

      // Responding with the filtered result or an indication if no matching note is found
      return result.length > 0
        ? res.json(result)
        : res.json("No note with that ID");
    });
});


// POST Route to add a new note
notes.post("/", (req, res) => {
  // Logging the request body and extracting title and text
  console.log(req.body);
  const { title, text } = req.body;

  // Checking if the request body is not empty
  if (req.body) {
    // Creating a new note object with a unique ID using UUID
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };

    // Appending the new note to the JSON file
    readAndAppend(newNote, "./db/db.json");

    // Responding with a success message
    res.json(`Note added successfully`);
  } else {
    // Responding with an error if the request body is empty
    res.error("Error in adding note");
  }
});

// Exporting the notes Router for use in other parts of the application
module.exports = notes;

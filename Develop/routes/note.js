const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");

// Endpoint: GET all notes
notes.get("/", (req, res) => {
  // Retrieve and respond with all notes from the database file
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// Endpoint: GET a specific note by its ID
notes.get("/:note_id", (req, res) => {
  const noteId = req.params.note_id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Filter notes to find the one matching the provided ID
      const result = json.filter((note) => note.note_id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json("No note with that ID found");
    });
});

// Endpoint: DELETE a note by its ID
notes.delete("/:note_id", (req, res) => {
  const noteId = req.params.note_id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Filter out the note matching the provided ID and save the updated list
      const result = json.filter((note) => note.note_id !== noteId);
      writeToFile("./db/db.json", result);
      res.json(`Note ${noteId} has been deleted 🗑️`);
    });
});

// Endpoint: POST a new note
notes.post("/", (req, res) => {
  // Extract title and text from the request body
  const { title, text } = req.body;
  
  // Check if the request body contains valid data
  if (req.body) {
    // Create a new note object with a unique ID using uuidv4
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };
    
    // Append the new note to the database file
    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully`);
  } else {
    // Handle error if request body is invalid
    res.error("Error in adding note");
  }
});

module.exports = notes;

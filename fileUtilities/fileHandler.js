// Using the built-in 'fs' module for file system operations
const fs = require("fs");

// Employing the 'util' module to enable promise-based functionality
const util = require("util");

// Creating a promise-based version of fs.readFile for asynchronous file reading
const readFromFile = util.promisify(fs.readFile);

/**
 * Writes data to a JSON file given the destination and content.
 * @param {string} destination - The target file path.
 * @param {object} content - The data to be written to the file.
 * @returns {void} No return value.
 */
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

/**
 * Reads data from a file and appends additional content.
 * @param {object} content - The data to append.
 * @param {string} file - The path to the file.
 * @returns {void} No return value.
 */
const readAndAppend = (content, file) => {
  // Asynchronously reads the file
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      // Handles errors during file reading
      console.error(err);
    } else {
      // Parses existing JSON data, appends new content, and writes back to the file
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

// Exports the functions for use in other parts of the application
module.exports = { readFromFile, writeToFile, readAndAppend };

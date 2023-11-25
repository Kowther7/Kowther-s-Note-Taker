const fs = require("fs");
const util = require("util");

const readFromFile = util.promisify(fs.readFile);
/**
 * Writes provided content to the specified JSON file.
 * @param {string} destination The file path for writing content.
 * @param {object} content The data to be written to the file.
 * @returns {void} No return value.
 */
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
/**
 * Reads data from a file and appends provided content.
 * @param {object} content The data to append to the file.
 * @param {string} file The file path to read from and save to.
 * @returns {void} No return value.
 */
const readAndAppend = (content, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend };

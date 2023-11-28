// Custom middleware that logs out the type and path of each request to the server
const myMiddleware = (req, res, next) => {
    // ANSI escape code for magenta color
    const fgMagenta = "\x1b[35m";
  
    // Switch statement to handle different HTTP methods
    switch (req.method) {
      case "GET": {
        // Logging GET requests with magenta color and modified log message
        console.info(`${fgMagenta}Received a ${req.method} request to ${req.path}`);
        break;
      }
      case "POST": {
        // Logging POST requests with magenta color and modified log message
        console.info(`${fgMagenta}Received a ${req.method} request to ${req.path}`);
        break;
      }
      default:
        // Logging other requests with magenta color and modified log message
        console.log(`${fgMagenta}Received a ${req.method} request to ${req.path}`);
    }
  
    // Move to the next middleware in the stack
    next();
  };
  
  // Exporting the custom middleware for use in other parts of the application
  exports.myMiddleware = myMiddleware;
  
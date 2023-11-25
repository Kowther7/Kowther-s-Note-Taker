// Custom middleware that logs the type and path of each request made to the server
const myMiddleware = (req, res, next) => {
    // Define a color for console output (cyan)
    const fgCyan = "\x1b[36m";
    
    // Log different types of HTTP requests along with their paths
    switch (req.method) {
      case "GET": {
        // Log a GET request with its method and path
        console.info(` ${fgCyan}${req.method} request to ${req.path}`);
        break;
      }
      case "POST": {
        // Log a POST request with its method and path
        console.info(` ${fgCyan}${req.method} request to ${req.path}`);
        break;
      }
      default:
        // Log any other type of request with its method and path
        console.log(`${fgCyan}${req.method} request to ${req.path}`);
    }
  
    // Proceed to the next middleware or route handler
    next();
  };
  
  exports.myMiddleware = myMiddleware;
  
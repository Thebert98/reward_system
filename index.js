const express = require("express") // Importing the express module
const app = express(); // Creating an instance of express

const configRoutes = require('./routes'); // Importing the routes c onfiguration

const cors = require("cors") // Importing the CORS middleware

// Middleware to parse JSON bodies
app.use(express.json());
// Enabling CORS for all requests
app.use(cors())
// Configuring routes as defined in the routes configuration file
configRoutes(app);
// Starting the server on the port defined in the environment variable or 3100 if not defined
app.listen(process.env.PORT || 3100,() => {
  console.log("We've now got a server!"); // Logging server start confirmation
  console.log('Your routes will be running on http://localhost:3100'); // Logging the base URL for routes
});
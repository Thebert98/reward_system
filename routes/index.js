// Require the receipts route module
const receiptsRoutes = require("./receipts")


// Define the constructor method for setting up routes
const constructorMethod = (app) => {
  // Use the products route for any requests to '/characters'
  app.use('/receipts',receiptsRoutes)
  // Use a wildcard route to catch all other requests and return a 404 error
  app.use('*', (req, res) => {
    res.status(404).json({error: 'Not found'});
  });
};

// Export the constructor method to be used in other parts of the application
module.exports = constructorMethod;
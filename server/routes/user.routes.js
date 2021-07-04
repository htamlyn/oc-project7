module.exports = app => {
    const users = require('../controllers/user.controller');

    // Create a new Customer
    app.post("/users", users.create);

    // Retrieve all Customers
    app.get("/users", users.findAll);

    // Retrieve a single Customer with customerId
    app.get("/users/:id", users.findOne);

    // Update a Customer with customerId 
    app.put("/users/:id", users.update);

    // Delete a Customer with customerId
    app.delete("/users/:id", users.delete);

}
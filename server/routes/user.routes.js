module.exports = app => {
    const users = require('../controllers/user.controller');

    // Create a new User
    app.post("/users/signup", users.create);

    // Login User
    app.post("/users/login", users.login);

    // Retrieve all Users
    app.get("/users", users.findAll);

    // Retrieve a single User with userId
    app.get("/users/:id", users.findOne);

    // Update a User with userId 
    app.put("/users/:id", users.update);

    // Update a User's Liked Posts
    app.put("/users/like/:id", users.likedPosts);

    // Set a Users last login
    app.put("/users/logout/:id", users.setLastLogin);

    // Delete a User with userId
    app.delete("/users/:id", users.delete);

}
module.exports = app => {
    const posts = require('../controllers/post.controller');
    const auth = require('../middleware/auth');

    // Create a new Post
    app.post("/post", posts.create);

    // Retrieve all Posts
    app.get("/post", posts.findAll);

    // Retrieve a single Post with postId
    app.get("/post/:id", posts.findOne);

    // Edit a Post with postId
    app.put("/post/:id", posts.update);

    // Like a Post with postId
    app.put("/post/like/:id", posts.like);

    // Delete a Post with postId
    app.delete("/post/:id", posts.delete);
}
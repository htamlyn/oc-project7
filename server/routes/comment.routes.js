module.exports = app => {
    const comments = require('../controllers/comment.controller');

    // Get all Comments
    app.get("/comment", comments.findAll);

    // Create a new Comment
    app.post("/comment", comments.create);

    // Retrieve all comments with postId
    app.get("/comment/:id", comments.findPostComments);

    // Delete a comment with specified id
    app.delete("/comment/:id", comments.delete);
}
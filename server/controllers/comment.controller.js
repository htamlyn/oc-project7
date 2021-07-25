const Comment = require ('../models/comment.model');

// Create and Save a new Comment
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Comment
    const comment = new Comment({
        postID: req.body.postID,
        employeeID: req.body.employeeID,
        content: req.body.content,
        timeStamp: req.body.timeStamp,
    });

    // Save Comment in the database
    Comment.create(comment, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Comment."
            });
        else res.send(data);
    });

}

// Retrieve all users from the database.
exports.findAll = (req, res) => {
    Comment.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving comments."
            });
        else res.send(data);
    });
};

// Find all Comments by Post id
exports.findPostComments = (req, res) => {
    const { id } = req.params;
    Comment.findById(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No Post found with id ${id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Post with id " + id
                });
            }
        } else res.send(data);
    });
};

// Delete a Comment with the specified id in the request
exports.delete = (req, res) => {
    const { id } = req.params
    Comment.remove(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No Comment found with id ${id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Comment with id " + id
                });
            }
        } else res.send({ message: `Comment was deleted successfully!` });
    });
};
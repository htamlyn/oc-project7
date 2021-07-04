const Post = require('../models/post.model');

// Create and Save a new Post
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Post
    const post = new Post({
        employeeId: req.body.employeeId,
        title: req.body.title,
        content: req.body.content,
        imagePath: req.body.imagePath,
        timeStamp: req.body.timeStamp,
        likes: req.body.likes
    });

    // Save Post in the database
    Post.create(post, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Post."
            });
        else res.send(data);
    });

}

// Retrieve all posts from the database.
exports.findAll = (req, res) => {
    Post.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving posts."
            });
        else res.send(data);
    });
};

// Find a single Post by id
exports.findOne = (req, res) => {
    const { id } = req.params;
    Post.findById(id, (err, data) => {
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

// Edit a Post identified by the id in the request
exports.update = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const { id } = req.params;
    Post.updateById(
        id,
        new Post(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `No Post found with id ${id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Post with id " + id
                    });
                }
            } else res.send(data);
        }
    );
};

// Like a Post with the specified id in the request
exports.like = (req, res) => {
    const { id } = req.params;
    if (req.body.like === 1) {
        Post.likePost(
            id,
            (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `No Post found with id ${id}.`
                        });
                    } else {
                        res.status(500).send({
                            message: "Error liking Post with id " + id
                        });
                    }
                } else res.send(data);
            } 
        );
    } else if (req.body.like === 0) {
        Post.cancelLike(
            id,
            (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `No Post found with id ${id}.`
                        });
                    } else {
                        res.status(500).send({
                            message: "Error liking Post with id " + id
                        });
                    }
                } else res.send(data);
            } 
        );
    } else {
        console.log('error')
    }
};

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
    const { id } = req.params
    Post.remove(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No Post found with id ${id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Post with id " + id
                });
            }
        } else res.send({ message: `Post was deleted successfully!` });
    });
};
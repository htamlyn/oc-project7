const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (Object.keys(req.body).length === 0) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Encrypt Password
    const password = req.body.password;
    const hash = bcrypt.hashSync(password, saltRounds);

    // Create a User
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: hash,
        email: req.body.email,
        lastLogin: req.body.lastLogin
    });

    // Save User in the database
    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        else res.send(data);
    });
};

// Login User
exports.login = (req, res) => {
    const username = req.body.username;
    User.findByUsername(username, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No User found with username ${req.body.username}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with username " + req.body.username
                });
            }
        } else {
            if (bcrypt.compareSync(req.body.password, data.password) === true) {
                const token = jwt.sign(
                    { userId: data.employeeID },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' });
                res.status(200).json({
                    userId: data.employeeID,
                    token: token
                });
            } else {
                res.status(401).send({
                    message: "Incorrect Password"
                })
            }
        }
    })
}



// Retrieve all users from the database.
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

// Find a single User by id
exports.findOne = (req, res) => {
    const { id } = req.params;
    User.findById(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No User found with id ${req.params}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.params
                });
            }
        } else res.send(data);
    });
};

// Update a User identified by the id in the request
exports.update = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const { id } = req.params;
    User.updateById(
        id,
        new User(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `No User found with id ${id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating User with id " + id
                    });
                }
            } else res.send(data);
        }
    );
};

// Update Users last login time
exports.setLastLogin = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const { id } = req.params;
    User.setLogout(
        id,
        new User(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `No User found with id ${id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating User with id " + id
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    console.log('delete user')
    const { id } = req.params
    User.remove(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No User found with id ${id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete User with id " + id
                });
            }
        } else res.send({ message: `User was deleted successfully!` });
    });
};
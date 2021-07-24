const sql = require('./db');

const User = function (user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.lastLogin = user.lastLogin;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO employee SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};

User.getAll = result => {
    sql.query("SELECT * FROM employee", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("users: ", res);
        result(null, res);
    });
};

User.findById = (userId, result) => {
    sql.query(`SELECT * FROM employee WHERE employeeID = ${userId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        // no user found with the id
        result({ kind: "not_found" }, null);
    });
};

User.findByUsername = (username, result) => {
    sql.query(`SELECT * FROM employee WHERE username = '${username}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        // No user found with the username
        result({ kind: "not_found" }, null);
    });
};

User.updateById = (id, user, result) => {
    sql.query(
        "UPDATE employee SET email = CASE WHEN ? IS NOT NULL THEN ? ELSE email END, firstName = CASE WHEN ? IS NOT NULL THEN ? ELSE firstName END, lastName = CASE WHEN ? IS NOT NULL THEN ? ELSE lastName END, username = CASE WHEN ? IS NOT NULL THEN ? ELSE username END WHERE employeeID = ?",
        [user.email, user.email, user.firstName, user.firstName, user.lastName, user.lastName, user.username, user.username, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found User with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated user: ", { id: id, ...user });
            result(null, { id: id, ...user });
        }
    );
};

User.setLogout = (id, user, result) => {
    sql.query(
        "UPDATE employee SET lastLogin = ? WHERE employeeID = ?",
        [user.lastLogin, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found User with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated user logout: ", { id: id, ...user });
            result(null, { id: id, ...user });
        }
    );
};

User.remove = (id, result) => {
    sql.query("DELETE from employee WHERE employeeID = ?", [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // no User found with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted user with id: ", id);
        result(null, res);
    });
};

module.exports = User;
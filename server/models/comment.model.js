const sql = require('./db');

const Comment = function (comment) {
    this.postID = comment.postID
    this.employeeID = comment.employeeID;
    this.content = comment.content;
    this.timeStamp = comment.timeStamp;
};

Comment.create = (newComment, result) => {
    sql.query("INSERT INTO comments SET ?", newComment, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created comment: ", { id: res.insertId, ...newComment });
        result(null, { id: res.insertId, ...newComment });
    });
};

Comment.getAll = result => {
    sql.query("SELECT * FROM comments", (err, res) => {
        if (err) {
            console.log("comments: ", err);
            result(null, err);
            return;
        }

        console.log("comments: ", res);
        result(null, res);
    });
};



Comment.findById = (postId, result) => {
    sql.query(`SELECT comments.*, employee.username FROM comments INNER JOIN employee ON comments.employeeID=employee.employeeID WHERE postID = ${postId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found comments: ", res);
            result(null, res);
            return;
        }

        // no Post found with the id
        result({ kind: "not_found" }, null);
    });
};

Comment.remove = (id, result) => {
    sql.query("DELETE from comments WHERE commentID = ?", [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // no comment found with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Deleted Comment with id: ", id);
        result(null, res);
    });
};

module.exports = Comment;
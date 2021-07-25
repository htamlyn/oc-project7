const sql = require('./db');

const Post = function (post) {
    this.employeeID = post.employeeID;
    this.title = post.title;
    this.content = post.content;
    this.imagePath = post.imagePath;
    this.imageId = post.imageId;
    this.timeStamp = post.timeStamp;
    this.likes = post.likes;
};

Post.create = (newPost, result) => {
    sql.query("INSERT INTO posts SET ?", newPost, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created post: ", { id: res.insertId, ...newPost });
        result(null, { id: res.insertId, ...newPost });
    });
};

Post.getAll = result => {
    sql.query("SELECT posts.*, employee.username FROM posts INNER JOIN employee ON posts.employeeID=employee.employeeID", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("posts: ", res);
        result(null, res);
    });
};

Post.findById = (postId, result) => {
    sql.query(`SELECT posts.*, employee.username FROM posts INNER JOIN employee ON posts.employeeID=employee.employeeID WHERE postID = ${postId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found post: ", res[0]);
            result(null, res[0]);
            return;
        }

        // no Post found with the id
        result({ kind: "not_found" }, null);
    });
};

Post.updateById = (id, post, result) => {
    sql.query(
        "UPDATE posts SET title = CASE WHEN ? IS NOT NULL THEN ? ELSE title END, content = CASE WHEN ? IS NOT NULL THEN ? ELSE content END WHERE postID = ?",
        [post.title, post.title, post.content, post.content, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // no Post found with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated post: ", { id: id, ...post });
            result(null, { id: id, ...post });
        }
    );
};

Post.likePost = (id, result) => {
    sql.query("UPDATE posts SET likes = likes + 1 WHERE postID = ?",
        [id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // no Post found with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("liked post: ", { id: id});
            result(null, { id: id});
        }
    );
};

Post.cancelLike = (id, result) => {
    sql.query("UPDATE posts SET likes = likes - 1 WHERE postID = ? AND likes > 0",
        [id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // no Post found with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("cancelled post like: ", { id: id });
            result(null, { id: id});
        }
    );
}

Post.remove = (id, result) => {
    sql.query("DELETE from posts WHERE postID = ?", [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // no Post found with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Deleted Post with id: ", id);
        result(null, res);
    });
};

module.exports = Post;
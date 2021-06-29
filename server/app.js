const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use((req, res) => {
    // res.json({ message: 'Your request was successful!' });
// });

require('./routes/user.routes')(app);
require('./routes/post.routes')(app);

module.exports = app;
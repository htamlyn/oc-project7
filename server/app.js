const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use((req, res) => {
    // res.json({ message: 'Your request was successful!' });
// });

require('./routes/user.routes')(app);
require('./routes/post.routes')(app);

module.exports = app;
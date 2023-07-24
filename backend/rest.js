const express = require('express');

const app = express();

app.use('/diary-entries', (req, res, next) => {
    res.send('Hello from Express');
});

module.exports = app;

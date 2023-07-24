const express = require('express');

const app = express();

diaryEntries = [
    { id: 1, date: 'March 1st', entry: 'Archery' },
    { id: 2, date: 'March 2nd', entry: 'Swimming' },
    { id: 3, date: 'March 3rd', entry: 'Football' },
];

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/diary-entries', (req, res, next) => {
    res.json({
        diaryEntries,
    });
    res.send('Hello from Express');
});

module.exports = app;

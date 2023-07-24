const express = require('express');
const bodyParser = require('body-parser');
const app = express();

diaryEntries = [
    { id: 1, date: 'March 1st', entry: 'Archery' },
    { id: 2, date: 'March 2nd', entry: 'Swimming' },
    { id: 3, date: 'March 3rd', entry: 'Football' },
];

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.get('/diary-entries', (req, res, next) => {
    res.json({
        diaryEntries,
    });
    res.send('Hello from Express');
});
app.post('/add-entry', (req, res) => {
    diaryEntries.push({
        id: req.body.id,
        date: req.body.date,
        entry: req.body.entry,
    });
    res.status(200).json({
        message: 'Post submitted',
    });
});
app.get('/max-id', (req, res) => {
    let max = 0;
    for (let i = 0; i < diaryEntries.length; i++) {
        if (diaryEntries[i].id > max) {
            max = diaryEntries[i].id;
        }
    }
    res.json({
        maxId: max,
    });
});
app.delete('/remove-entry/:id', (req, res) => {
    const index = diaryEntries.findIndex(el => el.id == req.params.id);
    diaryEntries.splice(index, 1);
    res.status(200).json({
        message: 'Post deleted',
    });
});

module.exports = app;

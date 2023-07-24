const express = require('express');
const bodyParser = require('body-parser');
const DiaryEntryModel = require('./entry-schema');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb+srv://admin:RLtPdWj28yI3mQZJ@mustercluster.0wrmhlo.mongodb.net/diarydb?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected');
    })
    .catch(() => {
        console.log('Failed to connect');
    });

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

// GET Diary Entries
app.get('/diary-entries', (req, res, next) => {
    res.json({
        diaryEntries,
    });
});

// POST Diary Entries
app.post('/add-entry', (req, res) => {
    const diaryEntry = new DiaryEntryModel({
        date: req.body.date,
        entry: req.body.entry,
    });
    diaryEntry.save();
    console.log(diaryEntry);
    diaryEntries.push({
        id: req.body.id,
        date: req.body.date,
        entry: req.body.entry,
    });
    res.status(200).json({
        message: 'Post submitted',
    });
});


// GET Max ID - Diary Entries
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

// DELETE Diary Entries
app.delete('/remove-entry/:id', (req, res) => {
    const index = diaryEntries.findIndex(el => el.id == req.params.id);
    diaryEntries.splice(index, 1);
    res.status(200).json({
        message: 'Post deleted',
    });
});

// PUT Diary Entries
app.put('/update-entry/:id', (req, res) => {
    const index = diaryEntries.findIndex(el => el.id == req.params.id);
    diaryEntries[index] = {
        id: req.body.id,
        date: req.body.date,
        entry: req.body.entry,
    };
    res.status(200).json({
        message: 'Update completed',
    });
});

module.exports = app;

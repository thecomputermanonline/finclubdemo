const express = require('express');
const cors = require('cors');
const pagesRouter = require('./routes/pages');
const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());
//app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/pages', pagesRouter);

module.exports = app;

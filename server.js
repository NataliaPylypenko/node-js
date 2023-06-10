const express = require('express');
const path = require('path');

const app = express();

const PORT = 3000;

const createPath = page => path.resolve(__dirname, 'views', `${page}.html`);

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.get('/', (req, res) => {
    res.sendfile(createPath('index'));
});

app.get('/about', (req, res) => {
    res.sendfile(createPath('about'));
});

app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

app.use( (req, res) => {
    res
        .status(404)
        .sendfile(createPath('error'));
});
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log('Server request');
    console.log('Just for test');

    res.setHeader('Content-Type', 'text/html');

    const createPath = page => path.resolve(__dirname, 'views', `${page}.html`);

    let basePath = '';

    switch (req.url) {
        case '/':
        case '/home':
        case '/index.html':
            basePath = createPath('index');
            break;
        case '/about-us':
            res.setHeader('Location', '/about');
            res.end();
            break;
        case '/about':
            basePath = createPath('about');
            break;
        default:
            basePath = createPath('error');
            break;
    }

    fs.readFile(basePath, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        }
        else {
            res.write(data);
            res.end();
        }
    })
})

server.listen(3000, 'localhost', (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
})

<h1>Node.js</h1>
<p>
Node.js — программная платформа, основанная на движке V8 (компилирующем JavaScript в машинный код), превращающая JavaScript из узкоспециализированного языка в язык общего назначения. Node.js добавляет возможность JavaScript взаимодействовать с устройствами ввода-вывода через свой API, написанный на C++, подключать другие внешние библиотеки, написанные на разных языках, обеспечивая вызовы к ним из JavaScript-кода. Node.js применяется преимущественно на сервере, выполняя роль веб-сервера, но есть возможность разрабатывать на Node.js и десктопные оконные приложения (при помощи NW.js, AppJS или Electron для Linux, Windows и macOS) и даже программировать микроконтроллеры (например, tessel, low.js и Espruino). В основе Node.js лежит событийно-ориентированное и асинхронное (или реактивное) программирование с неблокирующим вводом/выводом.
</p>

## Глобальные объекты (Global Objects)

```js
console.log(global);
console.log(__dirname);
console.log(__filename);
console.log(process);
console.log(`Hello, ${process.argv[2]}`);

const url = new URL('https://www.miyklas.com.ua/notifications/p#test');
console.log(url.href);
console.log(url.hostname);
console.log(url.pathname);
console.log(url.hash);
```

## Модули (импорт и экспорт) (Modules & Require)

```js
module.exports = name;
module.exports = {
    userName,
    sayHi
};

const os = require('os')
const {userName: user, sayHi} = require('./test');
```

## Node.js и файловая система (Node.js & File System)

```js
const fs = require('fs');

fs.readFile('./test.txt', (error, data) => {
    console.log(data.toString());
});

fs.readFile('./test.txt', 'utf8', (error, data) => {
    console.log(data);
});

fs.readFile('./test.txt', 'utf8', (error, data) => {
    fs.mkdir('./files', () => {
        fs.writeFile('./files/test2.txt', `${data} New text!`, (error) => {
            error ? console.log(error) : null;
        });
    });
});

fs.readFile('./test.txt', 'utf8', (error, data) => {
    fs.mkdirSync('./files', () => {});

    fs.writeFileSync('./files/test2.txt', `${data} New text!`, (error) => {
        error ? console.log(error) : null;
    })
});

setTimeout( () => {
    if (fs.existsSync('./files/test2.txt')) {
        fs.unlink('./files/test2.txt', () => {});
    }
}, 4000);

setTimeout( () => {
    if (fs.existsSync('./files')) {
        fs.rmdir('./files', () => {});
    }
}, 6000);
```

## Модуль событий (Event Module)
```js
// log.js
const EventEmitter = require('events');
class Logger extends EventEmitter {
    log = (msg) => {
        console.log(msg);
        this.emit('some_event', { id: 1, text: 'Event test text!' });
    }
}
module.exports = Logger;

// app.js
const Logger = require('./log');
const logger = new Logger();
logger.on('some_event', (args) => {
    const { id, text } = args;
    console.log(id, text);
});
logger.log('User Logged!')
```

##  Буфер и потоки (Buffer & Streams)
```js
// Readable
// Writable
// Duplex
// Transform

const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('./docs/text.txt');
const writeStream = fs.createWriteStream('./docs/new-text.txt');
const compressStream = zlib.createGzip();

// readStream.on('data', (chunk) => {
//     writeStream.write(chunk);
// })

const handleError = () => {
    console.log('Error');
    readStream.destroy();
    writeStream.end('Finished with error...');
}

readStream
    .on('error', handleError)
    .pipe(compressStream)
    .pipe(writeStream)
    .on('error', handleError);
```

## Клиент и сервер (Client & Server)
```js

```

## Создание сервера (Create Server)
```js
const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log('Server request');
    console.log(req.url, req.method);

    // res.setHeader('Content-Type', 'text/html');
    // res.write('<head><link rel="stylesheet" href="#"></head>');
    // res.write('<h1>Hello world!</h1>');
    // res.end();

    res.setHeader('Content-Type', 'application/json');
    const data = JSON.stringify([
        { name: 'Sem', age: 35 },
        { name: 'Din', age: 40 },
    ])
    res.end(data);
})

server.listen(3000, 'localhost', (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
})
```

## Создание базового роутинга (Create Base Routing)
```js
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log('Server request');

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
```

## Пакетный менеджер (NPM & Packages)

* `npm init` - npm initialization
* `npm install` - installing all project dependencies
* `npm install -g <package>` - install package globally
* `npm install -save-dev <package>` - install with develop dependency


* `nodemon` - is a utility that will monitor for any changes in your source and automatically restart your server.
* `ejs` - is a simple templating language that lets you generate HTML markup with plain JavaScript. No religiousness about how to organize things. No reinvention of iteration and control-flow. It's just plain JavaScript.
* `express` - fast, unopinionated, minimalist web framework for Node.js.

## Node.js & Express (Node.js & Express)

```js
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
```

## Подключение шаблонизатора (View Engine)

* `<% (...) %>` - Теги служат для определения операций JavaScript
* `<%= (...) %>` - Теги служат для экранирования HTML-конструкций
* `<%- (...) %>` - Теги служат для вывода информации с буферизацией без экранирования
* `<%# (...) %>` - Теги служат для выделения комментариев


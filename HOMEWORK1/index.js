// Напишите HTTP сервер и реализуйте два обработчика, где:
// — По URL “/” будет возвращаться страница, на которой есть гиперссылка на вторую страницу по ссылке “/about”
// — А по URL “/about” будет возвращаться страница, на которой есть гиперссылка на первую страницу “/”
// — Также реализуйте обработку несуществующих роутов (404).
// — * На каждой странице реализуйте счетчик просмотров. Значение счетчика должно увеличиваться на единицу каждый раз, когда загружается страница.

class Counter {
    value = 0;

    increaseCounter() {
        this.value++;
    }

    getCounterValue() {
        return this.value;
    }
}

let counterHome = new Counter();
let counterAbout = new Counter();

const http = require('http');

const server = http.createServer((req, res) => {
    console.log('Запрос получен');
    if (req.url === '/') {
        counterHome.increaseCounter();
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(`<a class="link__home" href="http://127.0.0.1:5555/">Home</a>
        <a class="link__about" href="http://127.0.0.1:5555/about">About</a>
        <br>
        <h1>Добро пожаловать на главную страницу!</h1>
        <p>Кол-во переходов на эту страницу: ${counterHome.getCounterValue()}</p>`);
    } else if (req.url === '/about') {
        counterAbout.increaseCounter();
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(`<a class="link__home" href="http://127.0.0.1:5555/">Home</a>
        <a class="link__about" href="http://127.0.0.1:5555/about">About</a>
        <br>
        <h1>Добро пожаловать на страницу About!</h1>
        <p>Кол-во переходов на эту страницу: ${counterAbout.getCounterValue()}</p>`);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end('<h1>Не найдена такая страница!</h1>');
    }
});

const port = 5555;
server.listen(port, () => {
    console.log(`Сервер запущен на порте ${port}`);
});


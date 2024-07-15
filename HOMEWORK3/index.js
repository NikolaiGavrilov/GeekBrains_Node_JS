// Напишите HTTP сервер на express и реализуйте два обработчика “/” и “/about”, где:

// — На каждой странице реализован счетчик просмотров
// — Значение счетчика необходимо сохранять в файл каждый раз, когда обновляется страница
// — Также значение счетчика должно загружаться из файла, когда запускается обработчик страницы
// — Таким образом счетчик не должен обнуляться каждый раз, когда перезапускается сервер.

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'counter.json')

class Counter {
    value = JSON.parse(fs.readFileSync(filePath, 'utf-8')).value;

    increaseCounter() {
        this.value++;
    }

    getCounterValue() {
        return this.value;
    }
}

let counter = new Counter();

const express = require('express');

const app = express();

app.get('/', (req, res) => {
    counter.increaseCounter();
    res.send(`<h1>Добро пожаловать на сайт! Это главная страница.</h1>
			<a href="/about">Перейти на страницу About</a>
            <br><span>Число переходов по сайту: ${counter.getCounterValue()}</span>`)
    fs.writeFileSync(filePath, JSON.stringify(counter));


})

app.get('/about', (req, res) => {
    counter.increaseCounter();
    res.send(`<h1>Добро пожаловать! Это страница About.</h1>
			<a href="/">Перейти на главную страницу</a>
            <br><span>Число переходов по сайту: ${counter.getCounterValue()}</span>`)
    fs.writeFileSync(filePath, JSON.stringify(counter));


})

const port = 7777;

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
})
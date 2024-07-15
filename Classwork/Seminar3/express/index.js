const express = require('express');

const app = express();

// корневая страница
app.get('/', (req, res) => {
	res.send(`<h1>Добро пожаловать на сайт!</h1>
			<a href="/about">Перейти на страницу About</a>`)
})
// Страница обо мне
app.get('/about', (req, res) => {
	res.send(`<h1>Страница обо мне!</h1>
			<a href="/">Перейти на главную страницу</a>`)
})
const port = 3000;

app.listen(port, () => {
	console.log(`Сервер запущен на порту ${port}`);
})
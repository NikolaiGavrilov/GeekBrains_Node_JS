const express = require('express');

const app = express();

app.use(express.static('./static')); // все файлы сайта будут тут

const port = 3000;

app.listen(port, () => {
	console.log(`Сервер запущен на порту ${port}`);
})

// WebPack - можно сделать код кроссбраузерным
// Vite
// Gulp


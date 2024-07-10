const http = require('http');

const server = http.createServer((req, res) => {
    console.log('Запрос получен');
})

const port = 3000;

server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
})
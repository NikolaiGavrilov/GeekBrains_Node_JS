const express = require('express');
const path = require('path');
const fs = require('fs');
const Joi = require('joi');
const uuid = require('uuid');

const app = express();

const usersSchema = Joi.object({
    firstName: Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(3).required(),
    age: Joi.number().min(0).required(),
    sex: Joi.string().min(1).max(1).required(),
    city: Joi.string().min(2)
});

const usersListPath = path.join(__dirname, 'users.json')
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the main page');
})

//Получение всех юзеров
app.get('/users', (req, res) => {
    const usersJson = fs.readFileSync(usersListPath, 'utf-8');
    const usersData = JSON.parse(usersJson);
    res.send({ users: usersData });
})

//Получение конкретного юзера по id
app.get('/users/:id', (req, res) => {
    const usersJson = fs.readFileSync(usersListPath, 'utf-8');
    const usersData = JSON.parse(usersJson);
    const user = usersData.find((user) => user.id === req.params.id);
    if (user) {
        res.send({ user });
    } else {
        res.status(404);
        res.send({
            user: null,
            message: "Пользователь не найден"
        });
    }
})

//Добавление нового юзера
app.post('/users', (req, res) => {
    const validateData = usersSchema.validate(req.body);
    if (validateData.error) {
        return res.status(400).send({ error: validateData.error.details })
    }
    const usersJson = fs.readFileSync(usersListPath, 'utf-8');
    const usersData = JSON.parse(usersJson);
    //Задаю уникальный id через модуль uuid
    let unId = uuid.v4();
    usersData.push({
        id: unId,
        ...req.body
    });
    fs.writeFileSync(usersListPath, JSON.stringify(usersData));
    res.send({
        id: unId
    })
})

//Редактирование информации о конкретном юзере
app.put('/users/:id', (req, res) => {
    const validateData = usersSchema.validate(req.body);
    if (validateData.error) {
        return res.status(400).send({ error: validateData.error.details })
    }
    const usersJson = fs.readFileSync(usersListPath, 'utf-8');
    const usersData = JSON.parse(usersJson);

    const user = usersData.find((user) => user.id === req.params.id);
    if (user) {
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.age = req.body.age;
        user.sex = req.body.sex;
        user.city = req.body.city;
        fs.writeFileSync(usersListPath, JSON.stringify(usersData));
        res.send({ user });
    } else {
        res.status(404);
        res.send({
            user: null,
            message: "Пользователь не найден"
        });
    }
})

//Удаление конкретного юзера
app.delete('/users/:id', (req, res) => {
    const usersJson = fs.readFileSync(usersListPath, 'utf-8');
    const usersData = JSON.parse(usersJson);

    const userIndex = usersData.findIndex((user) => user.id === req.params.id);

    if (userIndex > -1) {
        usersData.splice(userIndex, 1);
        fs.writeFileSync(usersListPath, JSON.stringify(usersData));

        res.send({ message: `Пользователь c id: ${req.params.id} успешно удален!` });
    } else {
        res.status(404);
        res.send({ message: 'Пользователь не найден!' });
    }
})

app.use((req, res) => {
    res.status(404).send({
        message: 'URL not found'
    })
})

const serverPort = 7777;
app.listen(serverPort, () => {
    console.log(`Сервер запущен на порте ${serverPort}`);
});
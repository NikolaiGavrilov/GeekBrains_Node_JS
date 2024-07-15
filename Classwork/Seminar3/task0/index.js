const fs = require('fs');
const path = require('path');

// const person = {
//     "name": "Ivan",
//     "surname": "Ivanov",
//     "age": 30,
//     "city": "Moscow"
// }
const filePath = path.join(__dirname, 'person.json')

// fs.writeFileSync(filePath, JSON.stringify(person, ['name', 'age'], 2));
//  если указать null вместо  массива передаст все содержимое
// ['name', 'age'] - оставит только 2 параметра

// fs.writeFileSync(filePath, JSON.stringify(person));

const dataJson = fs.readFileSync(filePath, 'utf-8');
const data = JSON.parse(dataJson);
data.age -= 10;
data.city = 'Ekaterinburg';

fs.writeFileSync(filePath, JSON.stringify(data, null, 2)); // для читабельности (обчно так не делают)



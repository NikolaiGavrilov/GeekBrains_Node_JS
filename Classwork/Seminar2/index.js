// const Color = require('color');
import calculateResultSum from './calculate.js';
import chalk from 'chalk';

// Должен быть результат 78.66
const total = calculateResultSum([12.1, 2.2, 3.1], 0.9);
const info = "Общая стоимость покупок: " + total + " рублей";

const result = (total >= 50) ? chalk.red(info) : chalk.green(info);

// По факту получаем 78.66000000000001

console.log(result);

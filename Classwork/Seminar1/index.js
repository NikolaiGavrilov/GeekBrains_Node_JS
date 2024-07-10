const numArr = [1,2,23,3,4,5,56,67,78,5];
const sum = numArr.reduce((acc, number) => acc += number, 0);
console.log("Результат сложения чисел массива:", sum);

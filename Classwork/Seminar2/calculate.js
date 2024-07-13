// const np = require("number-precision");
import np from "number-precision"
function calculateResultSum(purchases, discount) {
    let total = purchases.reduce((acc, purchase) => np.plus(acc, purchase), 0);
    total = np.times(total, discount); // применяем скидку
    return total;
}
// module.exports = { calculateResultSum };
export default calculateResultSum

// если много функций лучше оборачивать в объект где все функции
// если не предвидится добавлять функции, то можно просто = calculateResultSum
// если мы хотим использовать import np from number-precision, то нужно в package.json прописать свойство "type": "module", а на 7 строке будет export default;
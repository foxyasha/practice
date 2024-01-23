import { print } from './utils/print.js';

const main = () => {
    let result = 0;

    const addDot = (value) => {
        if (value === '.' && result.includes('.')) return;
        result = result === 0 ? value : result + value;
    };

    const allClear = () => {
        result = 0;
    };

    const removeChar = () => {
        result = result.length > 1 ? result.slice(0, -1) : 0;
    };

    const calculate = () => {
        try {
            result = String(eval(result));
        } catch (e) {
            result = 'Ошибка';
        }
    };

    const operations = {
        '+': '+',
        '-': '-',
        'x': '*',
        '/': '/',
        '.': '.'
    };

    const isOperator = (value) => {
        return Object.values(operations).includes(value);
    };

    return (state) => {
        if (state === 'АС') {
            allClear();
        } else if (state === 'С') {
            removeChar();
        } else if (state === '=') {
            calculate();
        } else if (operations[state] && !isOperator(result.slice(-1))) {
            addDot(operations[state]);
        } else if (!isNaN(state)) {
            addDot(state);
        }

        print(result);
    };
};

export default main;
import fs from 'fs';

fs.readFile('javascript/2024/day3/input.txt', 'utf8', (err, data) => {
    let counter = 0;
    const mulFunctions = findAllMulFunctions(data);
    for (let i = 0; i < mulFunctions.length; i++) {
        const params = parseParams(mulFunctions[i]);
        counter += params[0] * params[1];
    }
    console.log(counter);
})

function findAllMulFunctions(data) {
    return data.match(/mul\(\d{1,3},\d{1,3}\)/g);
}

function parseParams(mulFunction) {
    return mulFunction.match(/\d+/g).map(Number)
}
import fs from 'fs';

fs.readFile('javascript/2024/day3/input.txt', 'utf8', (err, data) => {
    let counter = 0;
    // Creates an array with only items that start in a state that needs to be executed
    const parts = data.split(/do\(\)/g);
    for (let i = 0; i < parts.length; i++) {
        // Cut off everything that doesn't need to be executed
        const doPart = parts[i].split(/don't\(\)/g, 1)[0];

        const mulFunctions = findAllMulFunctions(doPart);
        for (let j = 0; j < mulFunctions.length; j++) {
            const params = parseParams(mulFunctions[j]);
            counter += params[0] * params[1];
        }
    }
    console.log(counter);
})

function findAllMulFunctions(data) {
    return data.match(/mul\(\d{1,3},\d{1,3}\)/g);
}

function parseParams(mulFunction) {
    return mulFunction.match(/\d+/g).map(Number)
}
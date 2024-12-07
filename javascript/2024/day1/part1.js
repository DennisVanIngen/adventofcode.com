import fs from 'fs';
import readline from 'readline';

let counter = 0;
const leftSide = [];
const rightSide = [];

const rd = readline.createInterface({
    input: fs.createReadStream('javascript/2024/day1/input.txt'),
    console: false
});

rd.on('line', function (line) {
    const [, leftNumber, rightNumber] = line.match(/(\d+)\s+(\d+)/);
    leftSide.push(parseInt(leftNumber));
    rightSide.push(parseInt(rightNumber));
});

rd.on('close', function () {
    leftSide.sort((a, b) => a - b);
    rightSide.sort((a, b) => a - b);
    for (let i = 0; i < leftSide.length; i++) {
        counter += Math.abs(leftSide[i] - rightSide[i]);
    }
    console.log("Total difference: " + counter);
});

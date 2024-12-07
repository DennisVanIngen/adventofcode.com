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

    // get all left side values
    const repetitionCounter = new Map();
    for (let i = 0; i < leftSide.length; i++) {
        repetitionCounter.set(leftSide[i], 0);
    }

    // count the right side value repetitions
    for (let i = 0; i < rightSide.length; i++) {
        repetitionCounter.set(
            rightSide[i],
            repetitionCounter.get(rightSide[i]) + 1
        );
    }

    //add all up
    for (let i = 0; i < leftSide.length; i++) {
        counter += leftSide[i] * repetitionCounter.get(leftSide[i]);
    }

    console.log(counter);
});

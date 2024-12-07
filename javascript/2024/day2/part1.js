import fs from 'fs';
import readline from 'readline';

let counter = 0;

const rd = readline.createInterface({
    input: fs.createReadStream('javascript/2024/day2/input.txt'),
    console: false
});

rd.on('line', function (line) {
    let prevNumber = null;
    let hasIncrementingSteps = false;
    let hadDecrementingSteps = false;
    let containsIncorrectStepSize = false;

    line.split(' ')
        .map(number => {
            number = parseInt(number);
            if (prevNumber !== null) {
                const stepSize = Math.abs(number - prevNumber);
                if (stepSize > 3) {
                    containsIncorrectStepSize = true;
                }
                if (stepSize === 0) {
                    containsIncorrectStepSize = true;
                } else if (number < prevNumber) {
                    hadDecrementingSteps = true;
                } else {
                    hasIncrementingSteps = true;
                }
            }
            prevNumber = number;
        });
    if ((hasIncrementingSteps && hadDecrementingSteps) || containsIncorrectStepSize) {
        return;
    }
    counter++;
});

rd.on('close', function () {
    console.log(counter);
});

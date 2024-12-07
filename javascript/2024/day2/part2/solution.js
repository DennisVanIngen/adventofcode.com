import fs from 'fs';
import readline from 'readline';

let counter = 0;

const rd = readline.createInterface({
    input: fs.createReadStream('javascript/2024/day2/input.txt'),
    console: false
});

function copyArrayExceptIndex(array, indexToRemove) {
    return array.filter((_, index) => index !== indexToRemove);
}

function isSecuenceAccepted(numbers) {
    let hasIncrementingSteps = false;
    let hasDecrementingSteps = false;

    for (let i = 1; i < numbers.length; i++) {
        const stepSize = Math.abs(numbers[i] - numbers[i - 1]);
        if (stepSize === 0 || stepSize > 3) {
            return false;
        }
        if (numbers[i] < numbers[i - 1]) {
            hasDecrementingSteps = true;
        } else {
            hasIncrementingSteps = true;
        }
        if (hasIncrementingSteps && hasDecrementingSteps) {
            return false;
        }
    }
    return !(hasIncrementingSteps && hasDecrementingSteps);
}

function hasAcceptedPermutation(numbers) {
    for (let i = 0; i < numbers.length; i++) {
        const modifiedArray = copyArrayExceptIndex(numbers, i);
        if (isSecuenceAccepted(modifiedArray)) {
            return true;
        }
    }
    return false;
}

rd.on('line', function (line) {
    const numbers = line.trim().split(/\s+/).map(Number);
    if (isSecuenceAccepted(numbers) || hasAcceptedPermutation(numbers)) {
        counter++;
    }
});

rd.on('close', function () {
    console.log(counter);
});

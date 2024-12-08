import fs from 'fs';
import readline from 'readline';

function readInput(filePath) {
    return new Promise((resolve) => {
        const cases = [];
        const rulesToTheLeft = new Map();
        const rulesToTheRight = new Map();
        let isParsingRules = true;
        const rd = readline.createInterface({
            input: fs.createReadStream(filePath),
            console: false
        });
        rd.on('line', (line) => {
            if (isParsingRules) {
                const [leftValue, rightValue] = line.split('|').map(Number);
                if (rightValue === undefined) {
                    isParsingRules = false;
                    return;
                }
                if (!rulesToTheRight.has(leftValue)) {
                    rulesToTheRight.set(leftValue, [])
                }
                rulesToTheRight.get(leftValue).push(rightValue);

                if (!rulesToTheLeft.has(rightValue)) {
                    rulesToTheLeft.set(rightValue, [])
                }
                rulesToTheLeft.get(rightValue).push(leftValue);
            } else {
                cases.push(line.split(',').map(Number));
            }
        });
        rd.on('close', () => resolve({
            rulesToTheRight,
            rulesToTheLeft,
            cases
        }));
    });
}

function isOrderOfValuesIsValid(rulesToTheLeft, rulesToTheRight, item) {
    for (let i = 0; i < item.length; i++) {
        // check to the left
        if (rulesToTheLeft.has(item[i])) {
            const allowedLeftValues = rulesToTheLeft.get(item[i]);
            for (let j = 0; j < i; j++) {
                if (!allowedLeftValues.includes(item[j])) {
                    return false;
                }
            }
        }
        // check to the right
        if (rulesToTheRight.has(item[i])) {
            const allowedRightValues = rulesToTheRight.get(item[i]);
            for (let j = i + 1; j < item.length; j++) {
                if (!allowedRightValues.includes(item[j])) {
                    return false;
                }
            }
        }
    }
    return true;
}

function getMiddleOfArray(item) {
    return item[(Math.round(item.length - 1) / 2)];
}

(async function main() {
    const {rulesToTheLeft, rulesToTheRight, cases} = await readInput('javascript/2024/day5/input.txt');
    let counter = 0;
    for (const item of cases) {
        if (isOrderOfValuesIsValid(rulesToTheLeft, rulesToTheRight, item)) {
            counter += getMiddleOfArray(item);
        }
    }
    console.log(counter);
})();
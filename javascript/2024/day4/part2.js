import fs from 'fs';
import readline from 'readline';

function readInput(filePath) {
    return new Promise((resolve) => {
        const data = [];
        const rd = readline.createInterface({
            input: fs.createReadStream(filePath),
            console: false
        });
        rd.on('line', (line) => data.push(line.split('')));
        rd.on('close', () => resolve(data));
    });
}

class XmasFinder {
    constructor(data) {
        this.data = data;
    }

    getFoundXmaxCount() {
        let count = 0;
        for (let x = 1; x < this.data.length - 1; x++) {
            for (let y = 1; y < this.data[x].length - 1; y++) {
                if (this.data[x][y] === 'A') {
                    count += this.checkXshape(x, y);
                }
            }
        }
        return count;
    }

    checkXshape(x, y) {
        const topLeft = this.data[x - 1][y - 1];
        const topRight = this.data[x + 1][y - 1];
        const bottomLeft = this.data[x - 1][y + 1];
        const bottomRight = this.data[x + 1][y + 1];
        //all letters are M or S
        for (const letter of [topLeft, topRight, bottomLeft, bottomRight]) {
            if (letter !== 'M' && letter !== 'S') {
                return false;
            }
        }
        // Pairs should not be the same letter
        return !(topLeft === bottomRight || topRight === bottomLeft);

    }
}

(async function main() {
    const data = await readInput('javascript/2024/day4/input.txt');

    const xmaxFinder = new XmasFinder(data);
    console.log(xmaxFinder.getFoundXmaxCount());
})();
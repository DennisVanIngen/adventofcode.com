import fs from 'fs';
import readline from 'readline';

const data = [];

const rd = readline.createInterface({
    input: fs.createReadStream('javascript/2024/day4/input.txt'),
    console: false
});

rd.on('line', function (line) {
    data.push(line.split(''));
});

rd.on('close', function () {
    const xmaxFinder = new WordFinder(data, 'XMAS');
    console.log(xmaxFinder.getFoundWordCount());
});

class WordFinder {
    constructor(data, needle) {
        this.data = data;
        this.word = needle;
        this.directions = [
            [1, 0],    // Right
            [1, -1],    // Bottom-right
            [0, -1],    // Bottom
            [-1, -1],   // Bottom-left
            [-1, 0],   // Left
            [-1, 1],  // Top-left
            [0, 1],   // Top
            [1, 1]    // Top-right
        ]
    }

    getFoundWordCount() {
        let count = 0;
        for (let x = 0; x < this.data.length; x++) {
            for (let y = 0; y < this.data[x].length; y++) {
                if (this.data[x][y] === this.word[0]) {
                    count += this.countWordsFromPosition(x, y);
                }
            }
        }
        return count;
    }

    countWordsFromPosition(x, y) {
        let wordCount = 0;
        for (const [directionX, directionY] of this.directions) {
            if (this.checkWord(x, y, directionX, directionY)) {
                wordCount++;
            }
        }
        return wordCount;
    }

    checkWord(x, y, directionX, directionY) {
        const wordLength = this.word.length;
        const endX = x + directionX * (wordLength - 1);
        const endY = y + directionY * (wordLength - 1);

        if (!this.isCellInBounds(endX, endY)) {
            return false;
        }

        for (let i = 0; i < wordLength; i++) {
            const newX = x + i * directionX;
            const newY = y + i * directionY;
            if (this.data[newX][newY] !== this.word[i]) {
                return false;
            }
        }
        return true;
    }

    isCellInBounds(x, y) {
        return x >= 0 && y >= 0 && x < this.data.length && y < this.data[0].length;
    }
}
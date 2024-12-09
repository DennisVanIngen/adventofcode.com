import fs from 'fs';
import readline from 'readline';

function readInput(filePath) {
    return new Promise((resolve) => {
        const startPosition = [0, 0];
        let startPositionFound = false;
        const map = [];
        const rd = readline.createInterface({
            input: fs.createReadStream(filePath),
            console: false
        });
        rd.on('line', (line) => {
            const row = line.split('');
            const mapRow = [];
            for (let i = 0; i < row.length; i++) {
                switch (row[i]) {
                    case '.':
                        mapRow.push(null);
                        break;
                    case '#':
                        //object
                        mapRow.push('o');
                        break;
                    case '^':
                        startPositionFound = true;
                        startPosition[0] = i;
                        mapRow.push(null);
                        break;
                }
            }
            if (!startPositionFound) {
                startPosition[1]++;
            }
            map.push(mapRow);
        });
        rd.on('close', () => resolve({map, startPosition}));
    });
}

const direction = {
    UP: 'up',
    RIGHT: "right",
    DOWN: "down",
    LEFT: "left"
};

class GuardMap {
    constructor(map, startPositionGuard) {
        this.map = map;

        this.guard = {
            direction: direction.UP,
            y: startPositionGuard[1],
            x: startPositionGuard[0]
        };
        this.mapHeight = map.length;
        this.mapWidth = map[0].length;
    }

    isGuardWalkingInACircle() {
        while (true) {
            // when already visited while looking in this direction
            if (this.map[this.guard.y][this.guard.x]?.[this.guard.direction]) {
                return true;
            }

            if (!this.map[this.guard.y][this.guard.x]) {
                this.map[this.guard.y][this.guard.x] = {};
            }

            this.map[this.guard.y][this.guard.x][this.guard.direction] = true;

            const lookingAt = this.getLookingAt(this.guard);
            if (this.isPositionOfTheMap(lookingAt)) {
                return false;
            }

            if (this.map[lookingAt.y][lookingAt.x] === 'o') {
                this.turnTheGuard();
            } else {
                this.guard.x = lookingAt.x;
                this.guard.y = lookingAt.y;
            }
        }
    }

    getLookingAt() {
        switch (this.guard.direction) {
            case direction.UP:
                return {
                    x: this.guard.x,
                    y: this.guard.y - 1
                };
            case direction.RIGHT:
                return {
                    x: this.guard.x + 1,
                    y: this.guard.y
                }
            case direction.DOWN:
                return {
                    x: this.guard.x,
                    y: this.guard.y + 1
                }
            case direction.LEFT:
                return {
                    x: this.guard.x - 1,
                    y: this.guard.y
                }
        }
    }

    isPositionOfTheMap(position) {
        return position.x < 0 || position.y < 0 || position.x >= this.mapWidth || position.y >= this.mapHeight;
    }

    turnTheGuard() {
        switch (this.guard.direction) {
            case direction.UP:
                this.guard.direction = direction.RIGHT;
                break;
            case direction.RIGHT:
                this.guard.direction = direction.DOWN;
                break;
            case direction.DOWN:
                this.guard.direction = direction.LEFT;
                break;
            case direction.LEFT:
                this.guard.direction = direction.UP;
                break;
        }
    }
}

(async function main() {
    const {map, startPosition} = await readInput('javascript/2024/day6/input.txt');
    let counter = 0;
    for (let x = 0; x < map.length; x++) {
        for (let y = 0; y < map[x].length; y++) {
            const newStartPosition = {...startPosition}
            //if spot is empty and not the start position
            if (map[x][y] === null && (y !== newStartPosition[0] || x !== newStartPosition[1])) {
                const newMap = JSON.parse(JSON.stringify(map));
                newMap[x][y] = 'o';
                const guardMap = new GuardMap(newMap, newStartPosition);
                counter += guardMap.isGuardWalkingInACircle();
            }
        }
    }
    console.log(counter);
})();
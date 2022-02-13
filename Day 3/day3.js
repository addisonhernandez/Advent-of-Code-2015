function init() {
  require('dotenv').config();
  const aocLoader = require('aoc-loader');

  const year = 2015;
  const day = 3;
  const session = process.env.AOC_SESSION;

  aocLoader(year, day, session).then(input => {
    partOne(input);
    partTwo(input);
  });
}

function partOne(input) {
  const visitedHouses = new Set();
  const pos = new Point();

  visitedHouses.add(pos.coordinates);

  for (const direction of input) {
    pos.parseDirection(direction);

    visitedHouses.add(pos.coordinates);
  }

  console.log(`Number of housees that got at least one present: ${visitedHouses.size}`);
}

function partTwo(input) {
  const visitedHouses = new Set();

  const santaPos = new Point();
  const robotPos = new Point();

  visitedHouses.add(santaPos.coordinates);

  for (let i = 0; i < input.length; i++) {
    if (i % 2) {
      santaPos.parseDirection(input[i]);
      visitedHouses.add(santaPos.coordinates);
    } else {
      robotPos.parseDirection(input[i]);
      visitedHouses.add(robotPos.coordinates);
    }
  }

  console.log(`Number of housees that got at least one present: ${visitedHouses.size}`);
}

class Point {
  constructor(x = 0, y = 0) {
    this.xPos = x;
    this.yPos = y;
  }

  goNorth() { this.yPos += 1; }

  goSouth() { this.yPos -= 1; }

  goEast() { this.xPos += 1; }

  goWest() { this.xPos -= 1; }

  parseDirection(direction) {
    switch (direction) {
      case '>':
        this.goEast();
        break;
      case '<':
        this.goWest();
        break;
      case '^':
        this.goNorth();
        break;
      case 'v':
        this.goSouth();
        break;
      default:
        throw new InputError(`Unexpected input: ${direction}`);
    }
  }

  get coordinates() {
    return `(${this.xPos},${this.yPos})`;
  }
}

init();

(function testPartOne() {
  partOne('>');           // Should be 2
  partOne('^>v<');        // Should be 4
  partOne('^v^v^v^v^v');  // Should be 2
});//();

(function testPartTwo() {
  partTwo('^v');          // 3
  partTwo('^>v<');        // 3
  partTwo('^v^v^v^v^v');  // 11
});//();
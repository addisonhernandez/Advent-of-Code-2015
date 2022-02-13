function init() {
  require('dotenv').config();
  const aocLoader = require('aoc-loader');

  const year = 2015;
  const day = 3;
  const session = process.env.AOC_SESSION;

  aocLoader(year, day, session).then(input => main(input));
}

function main(input) {
  // visitedHouses maps <house pos ~> # of visits>
  const visitedHouses = new Map();

  const pos = new Point();

  visitedHouses.set(pos.coordinates, 1);

  for (const direction of input) {
    switch (direction) {
      case '>':
        pos.goEast();
        break;
      case '<':
        pos.goWest();
        break;
      case '^':
        pos.goNorth();
        break;
      case 'v':
        pos.goSouth();
        break;
      default:
        throw new InputError(`Unexpected input: ${direction}`);
    }

    const numberOfVisits = (visitedHouses.get(pos.coordinates) ?? 0) + 1;

    visitedHouses.set(pos.coordinates, numberOfVisits);
  }

  // solution for part one
  console.log(`Number of housees that got at least one present: ${visitedHouses.size}`);
}

class Point {
  constructor(x = 0, y = 0) {
    this.xPos = x;
    this.yPos = y;
  }

  goNorth() {
    this.yPos += 1;
  }

  goEast() {
    this.xPos += 1;
  }

  goSouth() {
    this.yPos -= 1;
  }

  goWest() {
    this.xPos -= 1;
  }

  get coordinates() {
    return `(${this.xPos},${this.yPos})`;
  }
}

init();
function init() {
  require('dotenv').config();
  const aocLoader = require('aoc-loader');

  const year = 2015;
  const day = 6;
  const session = process.env.AOC_SESSION;

  aocLoader(year, day, session).then(input => {
    partOne(input.split('\n'));
  });
}

function partOne(instructions) {
  const grid = new LightGrid();

  instructions.forEach(line => {
    const instruction = line.match(/^(.+?)(?:\s\d)/)[1];
    const coordinates = line.match(/(\d+)/g).map(Number);

    if (instruction === 'turn on') {
      grid.turnOn(coordinates);
    } else if (instruction === 'turn off') {
      grid.turnOff(coordinates);
    } else if (instruction === 'toggle') {
      grid.toggle(coordinates);
    } else {
      throw new InstructionError(`Invalid instruction: ${instruction}`);
    }
  });

  console.log(`After ${instructions.length} instructions, ${grid.numberOfLightsOn} lights are on.`);
}

class LightGrid {
  constructor(length = 1000, width = 1000) {
    // lights tracks the status of each light in the grid
    // `false` -> off, `true` -> on
    this.lights = new Array(length).fill(0).map(() => new Array(width).fill(false));
  }

  turnOn([startX, startY, endX, endY]) {
    for (let i = startX; i <= endX; i++) {
      for (let j = startY; j <= endY; j++) {
        this.lights[i][j] = true;
      }
    }
  }

  turnOff([startX, startY, endX, endY]) {
    for (let i = startX; i <= endX; i++) {
      for (let j = startY; j <= endY; j++) {
        this.lights[i][j] = false;
      }
    }
  }

  toggle([startX, startY, endX, endY]) {
    for (let i = startX; i <= endX; i++) {
      for (let j = startY; j <= endY; j++) {
        this.lights[i][j] = !this.lights[i][j];
      }
    }
  }

  get numberOfLightsOn() {
    const sum = (arr) => arr.reduce((a, b) => a + b);

    return sum(this.lights.map(row => sum(row)));
  }
}

init();

(function testGrid() {
  const grid = new LightGrid(5, 5);
  console.log('all off: ' + grid.numberOfLightsOn); // 0

  grid.turnOn([0, 0, 4, 4]);
  console.log('25: ' + grid.numberOfLightsOn);

  grid.toggle([0, 0, 1, 1]);
  console.log('21: ' + grid.numberOfLightsOn);

  grid.turnOff([3, 3, 4, 4]);
  console.log('17: ' + grid.numberOfLightsOn);
});//();

(function testPartOne() {
  partOne([
    'turn on 0,0 through 999,999',
    'toggle 0,0 through 999,0',
    'turn off 499,499 through 500,500'
  ]);
});//();
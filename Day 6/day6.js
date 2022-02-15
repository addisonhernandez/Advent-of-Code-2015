function init() {
  require('dotenv').config();
  const aocLoader = require('aoc-loader');

  const year = 2015;
  const day = 6;
  const session = process.env.AOC_SESSION;

  aocLoader(year, day, session).then(input => {
    partOne(input.split('\n'));
    partTwo(input.split('\n'));
  });
}

function partOne(instructions) {
  const grid = new LightGrid();

  // Add part one grid methods
  const partOneMethods = {
    'turn on':  () => 1,
    'turn off': () => 0,
    'toggle':   (light) => +!light,
  };

  // parse instructions
  instructions.forEach(line => {
    /*  Each instruction is of the form
     *  [instruction] [###],[###] through [###],[###]
     */
    // match the words before the first set of numbers
    const instruction = line.match(/^(.+?)(?:\s\d)/)[1];
    // match each grouping of digits
    const coordinates = line.match(/(\d+)/g).map(Number);

    grid.switchLights(partOneMethods[instruction], coordinates);
  });

  console.log(`After ${instructions.length} instructions, ${grid.sumOfLights} lights are on.`);
}

function partTwo(instructions) {
  const grid = new LightGrid();

  // Add part two methods
  const partTwoMethods = {
    'turn on':  (light) => light + 1,
    'turn off': (light) => Math.max(light - 1, 0),
    'toggle':   (light) => light + 2,
  };

  // parse instructions
  instructions.forEach(line => {
    const instruction = line.match(/^(.+?)(?:\s\d)/)[1];
    const coordinates = line.match(/(\d+)/g).map(Number);

    grid.switchLights(partTwoMethods[instruction], coordinates);
  });

  console.log(`After ${instructions.length} instructions, total brightness is ${grid.sumOfLights}.`);
}

class LightGrid {
  constructor(length = 1000, width = 1000) {
    this.lights = new Array(length).fill(0).map(() => new Array(width).fill(0));
  }

  switchLights(lightFunc, [startX, startY, endX, endY]) {
    for (let i = startX; i <= endX; i++) {
      for (let j = startY; j <= endY; j++) {
        this.lights[i][j] = lightFunc(this.lights[i][j]);
      }
    }
  }

  get sumOfLights() {
    const sum = (arr) => arr.reduce((a, b) => a + b);

    // calculate: the sum of the sum of each row
    return sum(this.lights.map(row => sum(row)));
  }
}

init();

(function testGrid() {
  const grid = new LightGrid(5, 5);
  console.log('all off: ' + grid.sumOfLights); // 0

  grid.turnOn([0, 0, 4, 4]);
  console.log('25: ' + grid.sumOfLights);

  grid.toggle([0, 0, 1, 1]);
  console.log('21: ' + grid.sumOfLights);

  grid.turnOff([3, 3, 4, 4]);
  console.log('17: ' + grid.sumOfLights);
});//();

(function testPartOne() {
  partOne([
    'turn on 0,0 through 999,999',
    'toggle 0,0 through 999,0',
    'turn off 499,499 through 500,500'
  ]);
});//();
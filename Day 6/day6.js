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
  const onFunc = () => 1;
  const offFunc = () => 0;
  const toggleFunc = (light) => +!light;

  // parse instructions
  instructions.forEach(line => {
    const instruction = line.match(/^(.+?)(?:\s\d)/)[1];
    const coordinates = line.match(/(\d+)/g).map(Number);

    if (instruction === 'turn on') {
      grid.turnOn(coordinates, onFunc);
    } else if (instruction === 'turn off') {
      grid.turnOff(coordinates, offFunc);
    } else if (instruction === 'toggle') {
      grid.toggle(coordinates, toggleFunc);
    } else {
      throw new InstructionError(`Invalid instruction: ${instruction}`);
    }
  });

  console.log(`After ${instructions.length} instructions, ${grid.sumOfLights} lights are on.`);
}

function partTwo(instructions) {
  const grid = new LightGrid();

  // Add part two methods
  const onFunc = (light) => light + 1;
  const offFunc = (light) => Math.max(light - 1, 0);
  const toggleFunc = (light) => light + 2;

  // parse instructions
  instructions.forEach(line => {
    const instruction = line.match(/^(.+?)(?:\s\d)/)[1];
    const coordinates = line.match(/(\d+)/g).map(Number);

    if (instruction === 'turn on') {
      grid.turnOn(coordinates, onFunc);
    } else if (instruction === 'turn off') {
      grid.turnOff(coordinates, offFunc);
    } else if (instruction === 'toggle') {
      grid.toggle(coordinates, toggleFunc);
    } else {
      throw new InstructionError(`Invalid instruction: ${instruction}`);
    }
  });

  console.log(`After ${instructions.length} instructions, total brightness is ${grid.sumOfLights}.`);
}

class LightGrid {
  constructor(length = 1000, width = 1000) {
    this.lights = new Array(length).fill(0).map(() => new Array(width).fill(0));
  }

  turnOn([startX, startY, endX, endY], onFunc) {
    for (let i = startX; i <= endX; i++) {
      for (let j = startY; j <= endY; j++) {
        // this.lights[i][j] = 1;
        this.lights[i][j] = onFunc(this.lights[i][j]);
      }
    }
  };

  turnOff([startX, startY, endX, endY], offFunc) {
    for (let i = startX; i <= endX; i++) {
      for (let j = startY; j <= endY; j++) {
        // this.lights[i][j] = 0;
        this.lights[i][j] = offFunc(this.lights[i][j]);
      }
    }
  };

  toggle([startX, startY, endX, endY], toggleFunc) {
    for (let i = startX; i <= endX; i++) {
      for (let j = startY; j <= endY; j++) {
        // this.lights[i][j] = +!this.lights[i][j];
        this.lights[i][j] = toggleFunc(this.lights[i][j]);
      }
    }
  };


  get sumOfLights() {
    const sum = (arr) => arr.reduce((a, b) => a + b);

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
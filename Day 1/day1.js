function main() {
  require('dotenv').config();
  const aocLoader = require('aoc-loader');

  const year = 2015;
  const day = 1;
  const session = process.env.AOC_SESSION;

  aocLoader(year, day, session).then(function (data) {
    const floorData = parseFloors(data);

    console.log(`Final Floor: ${floorData.finalFloor}`);
    console.log(`Enter the basement on step ${floorData.basementStep}`);
  });
}

/**
 * Parses a string of directions to an apartment in a very tall building.
 * `(` means go up one floor.
 * `)` means go down one floor.
 * Santa starts on floor 0.
 * @param {string} parens - A string of parentheses giving Santa directions.
 * @returns {Object} The floor that the directions end on, and the step that Santa to enters the basement.
 */
const parseFloors = function (parens) {
  let currentFloor = 0;
  let basementStep = 0;

  // for (const paren of parens) {
  for (let i = 0; i < parens.length; i++) {
    if (parens[i] === '(') { 
      currentFloor++;
    } else if (parens[i] === ')') {
      currentFloor--;

      if (basementStep === 0 && currentFloor === -1) {
        basementStep = i + 1;
      }
    }
  }

  return { finalFloor: currentFloor, basementStep };
}

main();
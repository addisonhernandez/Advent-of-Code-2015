
require('dotenv').config();
const aocLoader = require('aoc-loader');

const year = 2015;
const day = 1;
const session = process.env.AOC_SESSION;

aocLoader(year, day, session).then(function (data) {
  const finalFloor = parseFloors(data);

  console.log(`Final Floor: ${finalFloor}`)
});

/**
 * Parses a string of directions to an apartment in a very tall building.
 * `(` means go up one floor.
 * `)` means go down one floor.
 * Santa starts on floor 0.
 * @param {string} parens - A string of parentheses giving Santa directions.
 * @returns {number} The floor that the directions end on.
 */
const parseFloors = function (parens) {
  let currentFloor = 0;

  for (const paren of parens) {
    if (paren === '(') { 
      currentFloor++;
    } else if (paren === ')') {
      currentFloor--;
    }
  }

  return currentFloor;
}
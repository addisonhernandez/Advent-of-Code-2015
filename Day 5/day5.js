function init() {
  require('dotenv').config();
  const aocLoader = require('aoc-loader');

  const year = 2015;
  const day = 5;
  const session = process.env.AOC_SESSION;

  aocLoader(year, day, session).then(input => {
    partOne(input.split('\n'));
    partTwo(input.split('\n'));
  });
}

function partOne(naughtyOrNice) {
  const threeVowelsRE = /[aeiou].*[aeiou].*[aeiou]/;
  const repeatedCharRE = /(.)\1/;
  const forbiddenRE = /ab|cd|pq|xy/;

  let numberOfNiceStrings = 0;

  naughtyOrNice.forEach(line => {
    if (
      threeVowelsRE.test(line) &&
      repeatedCharRE.test(line) &&
      !forbiddenRE.test(line)
    ) {
      numberOfNiceStrings++;
    }
  });

  console.log(`Number of nice strings: ${numberOfNiceStrings}`);
}

function partTwo(naughtyOrNice) {
  const twoCharsThatAppearTwiceRE = /(.)(.).*\1\2/
  const repeatedCharWithOneBetweenRE = /(.).\1/

  let numberOfNiceStrings = 0;

  naughtyOrNice.forEach(line => {
    if (
      twoCharsThatAppearTwiceRE.test(line) &&
      repeatedCharWithOneBetweenRE.test(line)
    ) {
      numberOfNiceStrings++;
    }
  });

  console.log(`New number of nice strings: ${numberOfNiceStrings}`);
}

init();

(function testPartOne() {
  partOne(['ugknbfddgicrmopn']);  // nice
  partOne(['aaa']);               // nice
  partOne(['jchzalrnumimnmhp']);  // naughty
  partOne(['haegwjzuvuyypxyu']);  // naughty
  partOne(['dvszwmarrgswjxmb']);  // naughty
});//();

(function testPartTwo() {
  partTwo(['qjhvhtzxzqqjkmpb']);  // nice
  partTwo(['xxyxx']);             // nice
  partTwo(['uurcxstgmygtbstg']);  // naughty
  partTwo(['ieodomkazucvgmuy']);  // naughty
});//();
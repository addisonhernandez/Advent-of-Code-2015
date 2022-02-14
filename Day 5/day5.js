function init() {
  require('dotenv').config();
  const aocLoader = require('aoc-loader');

  const year = 2015;
  const day = 5;
  const session = process.env.AOC_SESSION;

  aocLoader(year, day, session).then(input => {
    partOne(input.split('\n'));
  });
}

function partOne(input) {
  const threeVowelsRE = /[aeiou].*[aeiou].*[aeiou]/;
  const repeatedCharRE = /(.)\1/;
  const forbiddenRE = /ab|cd|pq|xy/;

  let numberOfNiceStrings = 0;

  input.forEach(string => {
    if (
      threeVowelsRE.test(string) &&
      repeatedCharRE.test(string) &&
      !forbiddenRE.test(string)
    ) {
      numberOfNiceStrings++;
    }
  });

  console.log(`Number of nice strings: ${numberOfNiceStrings}`);
}

function partTwo(input) {

}

init();

(function testExampleInputs() {
  partOne(['ugknbfddgicrmopn']);  // nice
  partOne(['aaa']);               // nice
  partOne(['jchzalrnumimnmhp']);  // naughty
  partOne(['haegwjzuvuyypxyu']);  // naughty
  partOne(['dvszwmarrgswjxmb']);  // naughty
});//();
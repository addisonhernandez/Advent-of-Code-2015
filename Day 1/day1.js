
require('dotenv').config();
const aocLoader = require('aoc-loader');

const year = 2015;
const day = 1;
const session = process.env.AOC_SESSION;

aocLoader(year, day, session).then(function (data) {
  console.log(data);
});


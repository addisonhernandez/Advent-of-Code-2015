function init() {
  require('dotenv').config();
  const aocLoader = require('aoc-loader');

  const year = 2015;
  const day = 4;
  const session = process.env.AOC_SESSION;

  aocLoader(year, day, session).then(input => {
    partOne(input);
    partTwo(input);
  });
}

function partOne(input) {
  const CryptoJS = require('crypto-js');

  for (let salt = 1; true; salt++) {
    const message = input + salt;
    const hash = CryptoJS.MD5(message).toString();

    if (hash.startsWith('00000')) {
      console.log(`Lowest positive int with the right hash: ${salt}`);
      break;
    }
  }
}

function partTwo(input) {
  const MD5 = require('crypto-js/md5');

  for (let salt = 1; true; salt++) {
    const message = input + salt;
    const hash = MD5(message).toString();

    if (hash.startsWith('000000')) {
      console.log(`Lowest positive int with the right hash: ${salt}`);
      break;
    }
  }
}

init();

(function testMD5() {
  partOne('abcdef');    // 609_043
  partOne('pqrstuv');   // 1_048_970
});//();
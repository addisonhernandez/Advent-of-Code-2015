function main() {
  require('dotenv').config();
  const aocLoader = require('aoc-loader');

  const year = 2015;
  const day = 2;
  const session = process.env.AOC_SESSION;

  aocLoader(year, day, session).then(function (input) {
    // console.log(data);
    const boxes = input.split('\n');

    const totalPaperArea = boxes.reduce((total, box) => {
      // Each box has dimensions `LxWxH`
      const [L, W, H] = parseDimensions(box);

      const LW = L * W;
      const WH = W * H;
      const HL = H * L;

      const slack = Math.min(LW, WH, HL);

      return total + 2 * (LW + WH + HL) + slack;
    }, 0);

    console.log(`Total sqft of wrapping paper: ${totalPaperArea}`);
  });
}


const parseDimensions = function (box) {
  return box.split('x').map((dimension) => parseInt(dimension));
}

main();
function main() {
  require('dotenv').config();
  const aocLoader = require('aoc-loader');

  const year = 2015;
  const day = 2;
  const session = process.env.AOC_SESSION;

  aocLoader(year, day, session).then(function (input) {
    const boxesDimensions = (
      input
        .split('\n')
        // Each box has dimensions `LxWxH`
        .map((LxWxH) => parseDimensions(LxWxH))
    );

    const totalPaperArea = boxesDimensions.reduce((totalArea, [L, W, H]) => {
      const LW = L * W;
      const WH = W * H;
      const HL = H * L;

      const slack = Math.min(LW, WH, HL);

      return totalArea + 2 * (LW + WH + HL) + slack;
    }, 0);

    const totalRibbonLength = boxesDimensions.reduce((totalLength, [L, W, H]) => {
      const bowLength = L * W * H;
      const ribbonLength = (L === Math.max(L, W, H)) ?
        2 * (W + H) :
        2 * (L + Math.min(W, H));

      return totalLength + bowLength + ribbonLength;
    }, 0);

    console.log(`Total sqft of wrapping paper: ${totalPaperArea}`);
    console.log(`Total length of ribbon: ${totalRibbonLength}`);
  });
}


const parseDimensions = function (box) {
  return box.split('x').map((dimension) => parseInt(dimension));
}

main();
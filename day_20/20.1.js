const readInput = require("../readInput");

const parseTile = (lines) => {
  const id = lines[0].slice(5, 9);
  return {
    id,
    lines: lines.slice(1, 11),
  };
};

const getInput = async () => {
  const items = await readInput(process.argv[2], (x) => x);
  const tiles = [];
  let tileLines = [];
  for (let i = 1; i <= items.length; i++) {
    tileLines.push(items[i - 1]);
    if (i % 12 === 0 || i === items.length) {
      tiles.push(parseTile(tileLines));
      tileLines = [];
    }
  }
  return tiles;
};

const left = (tile) => tile.lines.reduce((acc, l) => acc + l[0], "");
const right = (tile) => tile.lines.reduce((acc, l) => acc + l[9], "");
const top = (tile) => tile.lines[0];
const down = (tile) => tile.lines[9];
const find = (func1, func2) => (tile, tiles) => {
  const side = func1(tile);
  return tiles.find((t) => {
    if (tile.id === t.id) return false;
    const r1 = rotate(t);
    const r2 = rotate(r1);
    const r3 = rotate(r2);
    return (
      side === func2(t) ||
      side === func2(r1) ||
      side === func2(r2) ||
      side === func2(r3) ||
      side === func2(flip(t)) ||
      side === func2(flip(r1)) ||
      side === func2(flip(r2)) ||
      side === func2(flip(r3))
    );
  });
};
const findRigth = find(right, left);
const findLeft = find(left, right);
const findTop = find(top, down);
const findDown = find(down, top);

const findNumberOfNeigh = (tile, tiles) => {
  let n = 0;
  if (findRigth(tile, tiles)) n++;
  if (findLeft(tile, tiles)) n++;
  if (findTop(tile, tiles)) n++;
  if (findDown(tile, tiles)) n++;
  return n;
};

const rotate = (tile) => {
  const newTile = {
    id: tile.id,
    lines: new Array(10).fill(""),
  };
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      newTile.lines[j] = newTile.lines[j] + tile.lines[9 - i][j];
    }
  }
  return newTile;
};

const flip = (tile) => {
  const newTile = {
    id: tile.id,
    lines: new Array(10).fill(""),
  };
  for (let i = 0; i < 10; i++) {
    newTile.lines[i] = tile.lines[i].split("").reverse().join("");
  }
  return newTile;
};

const main = async () => {
  const tiles = await getInput();
  const dim = Math.sqrt(tiles.length);
  const image = [];
  for (let i = 0; i < dim; i++) {
    image[i] = new Array(dim);
  }

  const corners = [];
  // corners have two borders that are in no square
  for (const tile of tiles) {
    const n = findNumberOfNeigh(tile, tiles);
    console.log(tile.id, n);
    if (n === 2) {
      corners.push(tile.id);
    }
  }
  console.log(("Solution:", corners[0] * corners[1] * corners[2] * corners[3]));
};

main();

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
const find1 = (func1, func2) => (tile, tiles) => {
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
const find = (func1, func2) => (tile, tiles) => {
  const side = func1(tile);
  for (const t of tiles) {
    if (tile.id !== t.id) {
      const r1 = rotate(t);
      const r2 = rotate(r1);
      const r3 = rotate(r2);
      if (side === func2(t)) return t;
      if (side === func2(r1)) return r1;
      if (side === func2(r2)) return r2;
      if (side === func2(r3)) return r3;
      if (side === func2(flip(t))) return flip(t);
      if (side === func2(flip(r1))) return flip(r1);
      if (side === func2(flip(r2))) return flip(r2);
      if (side === func2(flip(r3))) return flip(r3);
    }
  }
};
const findRigth = find(right, left);
const findDown = find(down, top);
const findNumberOfNeigh = (tile, tiles) => {
  let n = 0;
  if (find1(right, left)(tile, tiles)) n++;
  if (find1(left, right)(tile, tiles)) n++;
  if (find1(top, down)(tile, tiles)) n++;
  if (find1(down, top)(tile, tiles)) n++;
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

const rotateImage = (image) => {
  const copy = [];
  for (let i = 0; i < image.length; i++) {
    const imageLine = image[i].split("");
    copy[i] = imageLine;
  }
  return copy[0]
    .map((val, index) => copy.map((row) => row[index]).reverse())
    .map((line) => line.join(""));
};

const flipImage = (image) => {
  const ret = [];
  for (let i = 0; i < image.length; i++) {
    const imageLine = image[i].split("").reverse();
    ret[i] = imageLine;
  }
  return ret.map((line) => line.join(""));
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
const isFilled = (image) => image.every((l) => l.every((x) => !!x));
const composePuzzleFromCorner = (first, allTiles, dim) => {
  const image = [];
  for (let i = 0; i < dim; i++) {
    image[i] = new Array(dim).fill(null);
  }
  const tiles = allTiles.filter((t) => t.id !== first.id);
  let next;
  let current = first;
  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
      image[i][j] = current;
      if (j !== dim - 1) {
        next = findRigth(current, tiles);
      } else {
        next = findDown(image[i][0], tiles);
      }
      if (!next) return image;
      current = next;
    }
  }
  return image;
};

const composePuzzle = (corners, tiles, dim) => {
  for (const corn of corners) {
    const r1 = rotate(corn);
    const r2 = rotate(r1);
    const r3 = rotate(r2);
    const f = flip(corn);
    const f1 = flip(r1);
    const f2 = flip(r2);
    const f3 = flip(r3);
    const tests = [corn, r1, r2, r3, f, f1, f2, f3];
    for (const t of tests) {
      const image = composePuzzleFromCorner(t, tiles, dim);
      if (isFilled(image)) {
        return image;
      }
    }
  }
};

const removeBorder = (image) => {
  const ret = [];
  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image.length; j++) {
      ret[(i, j)] = [];
      image[(i, j)].forEach((item) => {
        const l = item.lines.slice(1, 9).map((el) => {
          return el.substring(1, 9);
        });
        const newItem = { id: item.id, lines: l };
        ret[(i, j)].push(newItem);
      });
    }
  }
  return ret;
};

const merge = (image) => {
  const ret = [];
  for (let i = 0; i < image.length; i++) {
    for (let k = 0; k < 8; k++) {
      let line = "";
      for (let j = 0; j < image.length; j++) {
        line += image[i][j].lines[k];
      }
      ret.push(line);
    }
  }
  return ret;
};

const main = async () => {
  const tiles = await getInput();
  const dim = Math.sqrt(tiles.length);
  const corners = [];
  for (const tile of tiles) {
    const n = findNumberOfNeigh(tile, tiles);
    if (n === 2) {
      corners.push(tile);
    }
  }
  const image = composePuzzle(corners, tiles, dim);
  const img = removeBorder(image);
  const merged = merge(img);
  const monster = [
    "                  # ",
    "#    ##    ##    ###",
    " #  #  #  #  #  #   ",
  ];
  const im = merged;
  const im1 = rotateImage(im);
  const im2 = rotateImage(im1);
  const im3 = rotateImage(im2);
  const f = flipImage(im);
  const f1 = flipImage(im1);
  const f2 = flipImage(im2);
  const f3 = flipImage(im3);

  const numberOfSquares = im.reduce((acc, l) => {
    return acc + (l.match(/#/g) || []).length;
  }, 0);
  const numberOfSquarePerMonster = 15;

  const checkPattern = (pattern, line, baseIndex) => {
    for (let i = 0; i < pattern.length; i++) {
      const p = pattern[i];
      if (p === "#" && line[baseIndex + i] !== "#") return false;
    }
    return true;
  };

  const tests = [im, im1, im2, im3, f, f1, f2, f3];
  for (const t of tests) {
    let numberOfMonsters = 0;
    for (let i = 0; i < t.length; i++) {
      if (i <= t.length - 3) {
        for (let j = 0; j < t[i].length; j++) {
          const firstLine = t[i];
          if (checkPattern(monster[0], firstLine, j)) {
            const secondLine = t[i + 1];
            const thirdLine = t[i + 2];
            if (
              checkPattern(monster[1], secondLine, j) &&
              checkPattern(monster[2], thirdLine, j)
            ) {
              numberOfMonsters++;
            }
          }
        }
      }
    }
    if (numberOfMonsters !== 0) {
      console.log(
        "Solution",
        numberOfSquares - numberOfSquarePerMonster * numberOfMonsters
      );
    }
  }
};

main();

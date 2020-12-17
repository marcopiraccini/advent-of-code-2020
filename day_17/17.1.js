const readInput = require("../readInput");

const isActive = (ch) => ch === "#";
const parse = (item) => item.split("");

const dimension = 30;
const zero = Math.floor(dimension / 2);
const min = -zero;
const max = -zero + dimension - 1;
let space = [];
for (let i = 0; i < dimension; i++) {
  space.push(
    new Array(dimension).fill(".").map(() => new Array(dimension).fill("."))
  );
}

const emptySpace = () => {
  const newSpace = [];
  const min = -zero;
  const max = -zero + dimension;
  for (let z = min; z < max; z++) {
    const yslice = [];
    for (let y = min; y < max; y++) {
      const row = [];
      for (let x = min; x < max; x++) {
        row.push(".");
      }
      yslice.push(row);
    }
    newSpace.push(yslice);
  }
  return newSpace;
};

const getCube = (x, y, z) => space[z + zero][y + zero][x + zero];
const activeCube = (space, x, y, z) =>
  (space[z + zero][y + zero][x + zero] = "#");
const deactiveCube = (space, x, y, z) =>
  (space[z + zero][y + zero][x + zero] = ".");

const getNumberOFActiveNeighboroods = (x, y, z) => {
  let activeCount = 0;
  for (let z1 = z - 1; z1 <= z + 1; z1++) {
    for (let y1 = y - 1; y1 <= y + 1; y1++) {
      for (let x1 = x - 1; x1 <= x + 1; x1++) {
        if (x1 === x && y1 === y && z1 === z) continue;
        if (
          x1 <= max &&
          x1 >= min &&
          y1 <= max &&
          y1 >= min &&
          z1 <= max &&
          z1 >= min &&
          isActive(getCube(x1, y1, z1))
        )
          activeCount++;
      }
    }
  }
  return activeCount;
};

const evolve = () => {
  const nextSpace = emptySpace();
  for (let z = min; z < max; z++) {
    for (let y = min; y < max; y++) {
      for (let x = min; x < max; x++) {
        const activeNeb = getNumberOFActiveNeighboroods(x, y, z);
        const cube = getCube(x, y, z);

        if (isActive(cube)) {
          if (activeNeb === 2 || activeNeb === 3) {
            activeCube(nextSpace, x, y, z);
          } else {
            deactiveCube(nextSpace, x, y, z);
          }
        } else if (activeNeb === 3) {
          activeCube(nextSpace, x, y, z);
        }
      }
    }
  }
  return nextSpace;
};

const main = async () => {
  const cubes = await readInput(process.argv[2], parse);
  // Set initial state. We set the origin in the middle of the initial square
  for (let y = 0; y < cubes.length; y++) {
    for (let x = 0; x < cubes[0].length; x++) {
      if (isActive(cubes[y][x])) {
        activeCube(space, x - 1, y - 1, 0);
      }
    }
  }
  for (let cycle = 0; cycle < 6; cycle++) {
    space = evolve();
  }
  let solution = 0;
  for (let z = min; z < max; z++) {
    for (let y = min; y < max; y++) {
      for (let x = min; x < max; x++) {
        if (isActive(getCube(x, y, z))) solution++;
      }
    }
  }
  console.log("Solution", solution);
};

main();

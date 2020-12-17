const readInput = require("../readInput");

const isActive = (ch) => ch === "#";
const parse = (item) => item.split("");

const dimension = 30;
const zero = Math.floor(dimension / 2);
const min = -zero;
const max = -zero + dimension - 1;
let space = [];
for (let w = 0; w < dimension; w++) {
  const threeD = [];
  for (let i = 0; i < dimension; i++) {
    threeD.push(
      new Array(dimension).fill(".").map(() => new Array(dimension).fill("."))
    );
  }
  space.push(threeD);
}

const emptySpace = () => {
  const newSpace = [];
  const min = -zero;
  const max = -zero + dimension;
  for (let w = min; w < max; w++) {
    const zslice = [];
    for (let z = min; z < max; z++) {
      const yslice = [];
      for (let y = min; y < max; y++) {
        const row = [];
        for (let x = min; x < max; x++) {
          row.push(".");
        }
        yslice.push(row);
      }
      zslice.push(yslice);
    }
    newSpace.push(zslice);
  }
  return newSpace;
};

const getCube = (x, y, z, w) => space[w + zero][z + zero][y + zero][x + zero];
const activeCube = (space, x, y, z, w) =>
  (space[w + zero][z + zero][y + zero][x + zero] = "#");
const deactiveCube = (space, x, y, z, w) =>
  (space[w + zero][z + zero][y + zero][x + zero] = ".");

const getNumberOFActiveNeighboroods = (x, y, z, w) => {
  let activeCount = 0;
  for (let w1 = w - 1; w1 <= w + 1; w1++) {
    for (let z1 = z - 1; z1 <= z + 1; z1++) {
      for (let y1 = y - 1; y1 <= y + 1; y1++) {
        for (let x1 = x - 1; x1 <= x + 1; x1++) {
          if (x1 === x && y1 === y && z1 === z && w1 === w) continue;
          if (
            x1 <= max &&
            x1 >= min &&
            y1 <= max &&
            y1 >= min &&
            z1 <= max &&
            z1 >= min &&
            w1 <= max &&
            w1 >= min &&
            isActive(getCube(x1, y1, z1, w1))
          )
            activeCount++;
        }
      }
    }
  }
  return activeCount;
};

const evolve = () => {
  const nextSpace = emptySpace();
  for (let w = min; w < max; w++) {
    for (let z = min; z < max; z++) {
      for (let y = min; y < max; y++) {
        for (let x = min; x < max; x++) {
          const activeNeb = getNumberOFActiveNeighboroods(x, y, z, w);
          const cube = getCube(x, y, z, w);

          if (isActive(cube)) {
            if (activeNeb === 2 || activeNeb === 3) {
              activeCube(nextSpace, x, y, z, w);
            } else {
              deactiveCube(nextSpace, x, y, z, w);
            }
          } else if (activeNeb === 3) {
            activeCube(nextSpace, x, y, z, w);
          }
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
        activeCube(space, x - 1, y - 1, 0, 0);
      }
    }
  }

  for (let cycle = 0; cycle < 6; cycle++) {
    space = evolve();
  }
  let solution = 0;
  for (let w = min; w < max; w++) {
    for (let z = min; z < max; z++) {
      for (let y = min; y < max; y++) {
        for (let x = min; x < max; x++) {
          if (isActive(getCube(x, y, z, w))) solution++;
        }
      }
    }
  }
  console.log("Solution", solution);
};

main();

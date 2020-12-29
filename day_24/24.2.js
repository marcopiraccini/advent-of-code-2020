const readInput = require("../readInput");

// same as 17!
const dimension = 1000;
const zero = Math.floor(dimension / 2);
const nStep = 100;

const parse = (line) => {
  let current = line;
  const path = [];
  while (current !== "") {
    if (current.startsWith("e") || current.startsWith("w")) {
      path.push(current[0]);
      current = current.slice(1);
    } else {
      path.push(current[0] + current[1]);
      current = current.slice(2);
    }
  }
  return path;
};

const main = async () => {
  const paths = await readInput(process.argv[2], parse);

  let floor = [];
  for (let i = 0; i < dimension; i++) {
    floor.push(new Array(dimension).fill(true));
  }

  paths.forEach((path) => {
    let position = { x: 0, y: 0 };
    path.forEach((p) => {
      if (p === "e") {
        position.x++;
      }
      if (p === "w") {
        position.x--;
      }
      if (p === "ne") {
        position.x++;
        position.y++;
      }
      if (p === "nw") {
        position.y++;
      }
      if (p === "se") {
        position.y--;
      }
      if (p === "sw") {
        position.x--;
        position.y--;
      }
    });
    floor[position.x + zero][position.y + zero] = !floor[position.x + zero][
      position.y + zero
    ];
  });

  const step = () => {
    const newFloor = [];
    for (let i = 0; i < dimension; i++) {
      newFloor.push(new Array(dimension).fill(true));
    }
    for (let x = 0; x < dimension; x++) {
      for (let y = 0; y < dimension; y++) {
        const adiacents = [];
        if (floor[x + 1]) adiacents.push(floor[x + 1][y]);
        if (floor[y + 1]) adiacents.push(floor[x][y + 1]);
        if (floor[x - 1]) adiacents.push(floor[x - 1][y]);
        if (floor[y - 1]) adiacents.push(floor[x][y - 1]);
        if (floor[y + 1] && floor[x + 1]) adiacents.push(floor[x + 1][y + 1]);
        if (floor[y - 1] && floor[x - 1]) adiacents.push(floor[x - 1][y - 1]);
        const nBlack = adiacents.reduce((acc, c) => acc + (!c ? 1 : 0), 0);
        if ((!floor[x][y] && nBlack === 0) || (!floor[x][y] && nBlack > 2)) {
          newFloor[x][y] = true;
        } else if (floor[x][y] && nBlack === 2) {
          newFloor[x][y] = false;
        } else {
          newFloor[x][y] = floor[x][y];
        }
      }
    }
    return newFloor;
  };

  const black = () =>
    floor.reduce(
      (acc, x) =>
        acc +
        x.reduce((acc2, y) => {
          if (!y) return acc2 + 1;
          return acc2;
        }, 0),
      0
    );

  for (let s = 1; s <= nStep; s++) {
    floor = step();
    console.log(`Day  ${s}: ${black()}`);
  }
  console.log("Solution :", black());
};

main();

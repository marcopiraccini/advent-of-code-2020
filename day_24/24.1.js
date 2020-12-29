const readInput = require("../readInput");

// same as 17!
const dimension = 100;
const zero = Math.floor(dimension / 2);

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
  const floor = [];
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

  const black = floor.reduce(
    (acc, x) =>
      acc +
      x.reduce((acc2, y) => {
        if (!y) return acc2 + 1;
        return acc2;
      }, 0),
    0
  );

  console.log("Solution :", black);
};

main();

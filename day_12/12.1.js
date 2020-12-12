const readInput = require("./readInput");

const parse = (item) => {
  const a = item[0];
  const v = +item.slice(1);
  return { a, v };
};

const updatePosition = ({ a, v }, position) => {
  switch (a) {
    case "N":
      position.y += v;
      break;
    case "S":
      position.y -= v;
      break;
    case "E":
      position.x += v;
      break;
    case "W":
      position.x -= v;
      break;
    case "L":
      position.angle += v;
      if (position.angle >= 360) position.angle = position.angle - 360;
      break;
    case "R":
      position.angle -= v;
      if (position.angle < 0) position.angle = 360 + position.angle;
      break;
    case "F":
      if (position.angle === 0) {
        position.x += v;
      } else if (position.angle === 90) {
        position.y += v;
      } else if (position.angle === 180) {
        position.x -= v;
      } else if (position.angle === 270) {
        position.y -= v;
      }
      break;
  }
};

const main = async () => {
  const actions = await readInput(process.argv[2], parse);
  const position = {
    x: 0,
    y: 0,
    angle: 0, // will use degree, it's easier
  };
  actions.forEach((action) => updatePosition(action, position));
  console.log("Solution:", Math.abs(position.x) + Math.abs(position.y));
};

main();

const readInput = require("../readInput");

const parse = (item) => {
  const a = item[0];
  const v = +item.slice(1);
  return { a, v };
};

const rotate = (waypoint, degree, clockwise) => {
  const { x, y } = waypoint;
  if ((degree === 90 && clockwise) || (degree === 270 && !clockwise)) {
    waypoint.x = y;
    waypoint.y = -x;
  }
  if ((degree === 90 && !clockwise) || (degree === 270 && clockwise)) {
    waypoint.x = -y;
    waypoint.y = x;
  }
  if (degree === 180) {
    waypoint.x = -x;
    waypoint.y = -y;
  }
};

const updatePosition = ({ a, v }, position, waypoint) => {
  switch (a) {
    case "N":
      waypoint.y += v;
      break;
    case "S":
      waypoint.y -= v;
      break;
    case "E":
      waypoint.x += v;
      break;
    case "W":
      waypoint.x -= v;
      break;
    case "L":
      rotate(waypoint, v, false);
      break;
    case "R":
      rotate(waypoint, v, true);
      break;
    case "F":
      position.x = position.x + v * waypoint.x;
      position.y = position.y + v * waypoint.y;
      break;
  }
};

const main = async () => {
  const actions = await readInput(process.argv[2], parse);
  const position = {
    x: 0,
    y: 0,
  };

  const waypoint = {
    x: 10,
    y: 1,
  };

  actions.forEach((action) => updatePosition(action, position, waypoint));
  console.log("Solution:", Math.abs(position.x) + Math.abs(position.y));
};

main();

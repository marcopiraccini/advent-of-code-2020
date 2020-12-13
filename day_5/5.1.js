const readInput = require("../readInput");

const calculatePath = (path, min, max) => {
  if (path.length === 0) return min;
  if (path[0])
    return calculatePath(path.slice(1), min + Math.ceil((max - min) / 2), max);
  return calculatePath(path.slice(1), min, min + Math.floor((max - min) / 2));
};

const getId = (p) => {
  const rPath = p
    .split("")
    .slice(0, 7)
    .map((c) => (c === "B" ? 1 : 0));
  const cPath = p
    .split("")
    .slice(-3)
    .map((c) => (c === "R" ? 1 : 0));
  return calculatePath(rPath, 0, 127) * 8 + calculatePath(cPath, 0, 7);
};

const main = async () => {
  const passes = await readInput(process.argv[2]);
  const seatIds = passes.map(getId);
  console.log("result:", Math.max(...seatIds));
};

main();

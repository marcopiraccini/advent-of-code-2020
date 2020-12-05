const readInput = require("./readInput");

const calculatePath = (path, min, max) => {
  if (path.length === 0) return min;
  if (path[0])
    return calculatePath(path.slice(1), min + Math.ceil((max - min) / 2), max);
  return calculatePath(path.slice(1), min, min + Math.floor((max - min) / 2));
};

const getPosition = (p) => {
  const rPath = p
    .split("")
    .slice(0, 7)
    .map((c) => (c === "B" ? 1 : 0));
  const cPath = p
    .split("")
    .slice(-3)
    .map((c) => (c === "R" ? 1 : 0));
  return { r: calculatePath(rPath, 0, 127), c: calculatePath(cPath, 0, 7) };
};

const compare = (p1, p2) => {
  if (p1.r === p2.r) return p1.c - p2.c;
  return p1.r - p2.r;
};

const getNextPos = (pos) => {
  if (pos.c === 7) return { r: pos.r + 1, c: 0 };
  return { r: pos.r, c: pos.c + 1 };
};

const main = async () => {
  const passes = await readInput(process.argv[2]);
  const positions = passes.map(getPosition);
  const sortedPositions = positions.sort(compare);
  const hole = getNextPos(
    sortedPositions.find((pos, index, arr) =>
      compare(arr[index + 1], getNextPos(pos))
    )
  );
  console.log("my seat:", hole.r * 8 + hole.c);
};

main();

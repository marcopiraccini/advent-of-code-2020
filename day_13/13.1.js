const readInput = require("../readInput");

const search = (timebase, ids) => {
  for (let time = timebase; ; time++) {
    for (const id of ids) {
      if (time % id === 0) return (time - timebase) * id;
    }
  }
};

const main = async () => {
  const lines = await readInput(process.argv[2], (x) => x);
  const timebase = +lines[0];
  const busIds = lines[1]
    .split(",")
    .filter((x) => x != "x")
    .map((x) => +x);
  console.log("Solution:", search(timebase, busIds));
};

main();

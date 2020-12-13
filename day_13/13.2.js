const readInput = require("../readInput");

// First, we search the first time departure for the first bus. If the
// bus is 17, the time is 17.
// Then we check the second bus (skipping the nulls) that start at time + index
// between the mulipliers of 17.
// When we find it (e.g. 13), we check the multipliers of 17 * 13 as base time, and so on.
const search = (busIds) => {
  let time = 1;
  let step = 1;
  let index = 0;
  while (index < busIds.length) {
    const bus = busIds[index];
    if (!bus) {
      index++;
    } else {
      if ((time + index) % bus === 0) {
        // Found!
        step = step * bus;
        index++;
      } else {
        time = time + step;
      }
    }
  }
  return time;
};

const main = async () => {
  const lines = await readInput(process.argv[2], (x) => x);
  const busIds = lines[1].split(",").map((x) => (x != "x" ? +x : null));
  console.log("Solution:", search(busIds));
};

main();

const readInput = require("../readInput");
const { remove } = require("lodash");

const moves = 100;
const main = async () => {
  const cups = (
    await readInput(process.argv[2], (x) => x.split("").map((x) => +x))
  )[0];
  let curr = 0;
  let selected = null;
  const nextFromCurr = (rel) => (curr + rel) % 9;
  const selectedIndex = () => cups.findIndex((x) => x === selected);
  const removeNext3 = () => {
    const removed = [];
    removed.push(cups[nextFromCurr(1)]);
    removed.push(cups[nextFromCurr(2)]);
    removed.push(cups[nextFromCurr(3)]);
    remove(cups, (x) => removed.includes(x));
    return removed;
  };

  const getDestinationIndex = () => {
    let found = -1;
    let target = selected > 1 ? selected - 1 : 9;
    while (found === -1) {
      found = cups.findIndex((x) => x === target);
      if (found === -1) {
        target = target > 1 ? target - 1 : 9;
      }
    }
    return found;
  };
  const insert = (arr, index) => {
    cups.splice(index, 0, ...arr);
  };

  for (let m = 0; m < moves; m++) {
    selected = cups[curr];
    const removed = removeNext3();
    const destinationIndex = getDestinationIndex();
    insert(removed, (destinationIndex + 1) % 9);
    curr = (selectedIndex() + 1) % 9;
  }
  const sol = cups.join("").split("1")[1] + cups.join("").split("1")[0];
  console.log("Solution", sol);
};

main();

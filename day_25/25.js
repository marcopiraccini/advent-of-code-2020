const readInput = require("../readInput");

const findLoop = (n) => {
  let value = 1;
  let loop = 0;
  while (value !== n) {
    loop++;
    value = value * 7;
    value = value % 20201227;
  }
  return loop;
};

const applyLoop = (nloop, subject) => {
  let value = 1;
  for (let l = 1; l <= nloop; l++) {
    value = value * subject;
    value = value % 20201227;
  }
  return value;
};

const main = async () => {
  const input = await readInput(process.argv[2], (x) => +x);
  const cardPk = input[0];
  const doorPk = input[1];
  const loopCard = findLoop(cardPk);
  // const loopDoor = findLoop(doorPk);
  const encryptionKeyCard = applyLoop(loopCard, doorPk);
  console.log("Solution", encryptionKeyCard);
};

main();

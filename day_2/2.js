const readInput = require("../readInput");

const isValid = (item) => {
  const { low, high, ch, pwd } = item;
  const first = pwd.charAt(low - 1) === ch;
  const second = pwd.charAt(high - 1) === ch;
  return (first && !second) || (!first && second); // should be a NAND
};

const parse = (item) => {
  const els = item.split(" ");
  const range = els[0].split("-");
  const low = Number(range[0]);
  const high = Number(range[1]);
  const ch = els[1][0];
  const pwd = els[2];
  return { low, high, ch, pwd };
};

const main = async () => {
  const items = await readInput(process.argv[2], parse);
  const tot = items.reduce((acc, c) => (isValid(c) ? ++acc : acc), 0);
  console.log("TOT", tot);
};

main();

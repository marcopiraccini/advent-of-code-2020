const readInput = require("../readInput");

const parse = (item) => {
  const inst = item.split(" ")[0];
  const val = +item.split(" ")[1];
  return { inst, val };
};

const main = async () => {
  const code = await readInput(process.argv[2], parse);
  let line = 0,
    acc = 0;
  while (!code[line].executed) {
    const op = code[line];
    let nextInc = 1;
    if (op.inst === "acc") acc += op.val;
    if (op.inst === "jmp") nextInc = op.val;
    line += nextInc;
    op.executed = true;
  }
  console.log("Solution:", acc);
};

main();

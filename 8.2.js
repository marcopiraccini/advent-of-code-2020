const readInput = require("./readInput");

const parse = (item) => {
  const inst = item.split(" ")[0];
  const val = +item.split(" ")[1];
  return { inst, val };
};

const main = async () => {
  const code = await readInput(process.argv[2], parse);
  const jumps = code.reduce(
    (acc, op, index) => (op.inst === "jmp" ? [...acc, index] : acc),
    []
  );

  let line = 0,
    acc = 0;
  while (code[line]) {
    const op = code[line];
    if (op.executed) {
      // Loop!
      jumps.pop();
      code.forEach((c) => (c.executed = false)); // Restart
      line = 0;
      acc = 0;
    } else {
      let nextInc = 1,
        nextAcc = 0;
      if (op.inst === "acc") nextAcc += op.val;
      if (op.inst === "jmp" && line !== jumps[jumps.length - 1])
        nextInc = op.val;
      code[line].executed = true;
      acc += nextAcc;
      line += nextInc;
    }
  }
  console.log("Solution:", acc);
};

main();

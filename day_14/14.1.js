const readInput = require("../readInput");

const parse = (item) => {
  const els = item.split(" = ");
  if (els[0] === "mask") {
    return {
      cmd: "mask",
      val: els[1].split(""),
    };
  }
  const addr = els[0].split("[")[1].split("]")[0];
  return {
    addr,
    cmd: "mem",
    val: +els[1],
  };
};

const applyMask = (val, mask) => {
  let res = val;
  for (let i = 36; i >= 0; i--) {
    if (mask[i] !== "X") {
      let binary = res.toString(2).padStart(36, "0");
      binary = binary.split("");
      binary[i] = mask[i];
      binary = binary.join("");
      res = parseInt(binary, 2);
    }
  }
  return res;
};

const memory = new Map();
let currentMask = [];
const main = async () => {
  const lines = await readInput(process.argv[2], parse);
  for (const line of lines) {
    if (line.cmd === "mask") {
      currentMask = line.val;
      continue;
    }
    const addrVal = applyMask(line.val, currentMask);
    memory.set(line.addr, addrVal);
  }
  const sum = Array.from(memory.values()).reduce((acc, c) => acc + c);
  console.log("Solution", sum);
};

main();

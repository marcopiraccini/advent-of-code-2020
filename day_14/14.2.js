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
    addr: +addr,
    cmd: "mem",
    val: +els[1],
  };
};

const getAddr = (val, mask) => {
  let res = val.toString(2).padStart(36, "0");
  for (let i = 36; i >= 0; i--) {
    const binary = res.split("");
    if (mask[i] !== "0") binary[i] = mask[i];
    res = binary.join("");
  }
  return res;
};

const combinations = (addr) => {
  let addresses = [addr];
  for (let i = 0; i < 36; i++) {
    if (addr[i] !== "X") {
      continue;
    }
    const newAddr = [];
    addresses.forEach((a) => {
      const zero = a.split("");
      zero[i] = 0;
      const one = a.split("");
      one[i] = 1;
      newAddr.push(zero.join(""), one.join(""));
    });
    addresses = newAddr;
  }
  return addresses;
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
    const addressMask = getAddr(line.addr, currentMask);
    const addresses = combinations(addressMask);
    addresses.forEach((a) => {
      memory.set(a, line.val);
    });
  }
  const sum = Array.from(memory.values()).reduce((acc, c) => acc + c);
  console.log("Solution", sum);
};

main();

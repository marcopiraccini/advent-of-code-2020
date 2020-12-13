const readInput = require("../readInput");

const parse = (item) => {
  if (item === "") return null;
  const bag = item.split(" bags contain ")[0];
  const containedStr = item.split(" bags contain ")[1].split(",");
  const contained = containedStr.map((b) => {
    const barr = b.trim().split(" ");
    const n = +barr[0];
    const bag = `${barr[1]} ${barr[2]}`;
    return { n, bag };
  });
  return {
    bag,
    contained,
  };
};

const contains = (rules, target) => {
  const found = rules.filter((c) =>
    c.contained.some(({ bag }) => bag === target)
  );
  return found.map(({ bag }) => bag);
};

const findOrigin = (rules, target, acc = []) => {
  const parents = contains(rules, target);
  acc.push(...parents);
  parents.forEach((parent) => findOrigin(rules, parent, acc));
};

const main = async () => {
  const rules = await readInput(process.argv[2], parse);
  const found = [];
  findOrigin(rules, "shiny gold", found);
  console.log("Solution:", [...new Set(found)].length);
};

main();

const readInput = require("./readInput");

const parse = (item) => {
  if (item === "") return null;
  const bag = item.split(" bags contain ")[0];
  const containedStr = item.split(" bags contain ")[1].split(",");
  const contained = containedStr
    .filter((b) => !b.includes("no other bags"))
    .map((b) => {
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

const findLeafs = (rules, parent) => {
  const rule = rules.filter((c) => c.bag === parent)[0];
  return rule.contained.reduce(
    (acc, child) => acc + child.n * findLeafs(rules, child.bag),
    1
  );
};

const main = async () => {
  const rules = await readInput(process.argv[2], parse);
  console.log("Solution:", findLeafs(rules, "shiny gold") - 1); // don't count the shinyGold one
};

main();

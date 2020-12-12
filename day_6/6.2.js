const readInput = require("./readInput");

const parse = (item) => item.split("");

const main = async () => {
  const items = await readInput(process.argv[2], parse);
  const groups = items.reduce(
    (acc, curr) => {
      if (curr.length === 0) {
        return acc.concat([[]]);
      }
      acc[acc.length - 1].push(curr);
      return acc;
    },
    [[]]
  );
  const yes = groups.reduce((acc, group) => {
    if (group.length === 1) {
      return acc + group[0].length;
    }
    const commonYes = group[0].filter((c) => {
      return group.slice(1).every((h) => h.includes(c));
    });
    return acc + commonYes.length;
  }, 0);
  console.log(("Solution:", yes));
};

main();

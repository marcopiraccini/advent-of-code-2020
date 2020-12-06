const readInput = require("./readInput");

const parse = (item) => item.split("");

const main = async () => {
  const items = await readInput(process.argv[2], parse);
  const answers = items.reduce(
    (acc, curr) => {
      if (curr.length === 0) {
        return acc.concat(new Set());
      }
      curr.forEach((c) => acc[acc.length - 1].add(c));
      return acc;
    },
    [new Set()]
  );
  const yes = answers.reduce((acc, curr) => acc + curr.size, 0);
  console.log(("Solution:", yes));
};

main();

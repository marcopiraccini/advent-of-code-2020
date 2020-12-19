const readInput = require("../readInput");

const isNumeric = (num) => !isNaN(num);
const getInput = async () => {
  const items = await readInput(process.argv[2], (x) => x);
  const ret = items.reduce(
    (acc, line) => {
      if (isNumeric(line[0])) {
        const n = line.split(":")[0];
        const right = line.split(":")[1].trim();
        const rr =
          right === '"a"' || right === '"b"'
            ? right[1]
            : line.split(":")[1].trim().split(" ");
        acc.rules[n] = rr;
      } else if (line !== "") {
        acc.messages.push(line);
      }
      return acc;
    },
    { rules: {}, messages: [] }
  );
  return ret;
};
const isRuleFinal = (rule) => rule === "a" || rule === "b";

const main = async () => {
  const { rules, messages } = await getInput();
  const createRE = (currentRule) => {
    if (isRuleFinal(currentRule)) return currentRule;
    const res = ["("];
    for (const rule of currentRule) {
      if (rule === "|") {
        res.push("|");
      } else {
        res.push(createRE(rules[rule]));
      }
    }
    res.push(")");
    return res.join("");
  };
  let rule = new RegExp("^" + createRE(rules[0]) + "$", "gm");
  console.log(("Solution:", messages.filter((m) => m.match(rule)).length));
};

main();

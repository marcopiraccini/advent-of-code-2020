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
  rules[8] = ["42", "|", "42", "8"];
  rules[11] = ["42", "31", "|", "42", "11", "31"];

  let rule8found = 0;
  let rule11found = 0;
  const maxDepth = 10;

  const createRE = (currentRule) => {
    if (isRuleFinal(currentRule)) return currentRule;
    const res = ["("];
    for (const rule of currentRule) {
      // I remove the recursion, until maxDepth
      if (rule === "8") {
        rule8found++;
        if (rule8found === maxDepth) return "(" + createRE(rules[42]) + ")";
      }
      if (rule === "11") {
        rule11found++;
        if (rule11found === maxDepth)
          return "(" + createRE(rules[42]) + createRE(rules[31]) + ")";
      }
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

const readInput = require("../readInput");

const isNum = (x) => !isNaN(x);

const parse = (x) =>
  x
    .split("")
    .map((x) => {
      if (/^\d+$/.test(x)) return +x;
      return x;
    })
    .filter((x) => x !== " ");

const evalLeft = (tokens, isPart2 = false) => {
  const token = tokens.pop();
  if (isNum(token)) return token;
  if (token === "(") {
    const res = calculate(tokens, isPart2);
    tokens.pop(); // for the remaining ")"
    return res;
  }
};

const calculate = (tokens, isPart2 = false) => {
  let res = evalLeft(tokens, isPart2);
  while (tokens.length > 0 && tokens[tokens.length - 1] !== ")") {
    const op = tokens.pop();
    if (op === "+") {
      res = res + evalLeft(tokens, isPart2);
    }
    if (op === "*") {
      res = isPart2
        ? res * calculate(tokens, isPart2)
        : res * evalLeft(tokens, isPart2);
    }
  }
  return res;
};

const main = async () => {
  const input1 = await readInput(process.argv[2], parse);
  const input2 = JSON.parse(JSON.stringify(input1));
  const sol1 = input1.reduce((acc, expr) => {
    return acc + calculate(expr.reverse());
  }, 0);
  console.log("Solution1:", sol1);
  const sol2 = input2.reduce((acc, expr) => {
    return acc + calculate(expr.reverse(), true);
  }, 0);
  console.log("Solution2:", sol2);
};

main();

const readInput = require("../readInput");

const parseRule = (rule) => {
  const name = rule.split(":")[0];
  const intervals = rule.split(":")[1];
  const low = intervals
    .split(" or ")[0]
    .split("-")
    .map((x) => +x);
  const high = intervals
    .split(" or ")[1]
    .split("-")
    .map((x) => +x);
  return { name, low, high };
};

const getInput = async () => {
  const items = await readInput(process.argv[2], (x) => x);
  const firstInputPart = items.findIndex((x) => x === "your ticket:");
  const rules = items.slice(0, firstInputPart - 1).map(parseRule);
  const secondInputPart = items.findIndex((x) => x === "nearby tickets:");
  const ticket = items
    .slice(firstInputPart + 1, secondInputPart - 1)[0]
    .split(",")
    .map((x) => +x);
  const nearbyTickets = items
    .slice(secondInputPart + 1)
    .map((t) => t.split(",").map((x) => +x));
  return {
    rules,
    ticket,
    nearbyTickets,
  };
};

const isInRange = (v, range) => v >= range[0] && v <= range[1];
const isInInterval = (v, interval) =>
  isInRange(v, interval.low) || isInRange(v, interval.high);
const isValid = (v, rules) =>
  rules.some((rule) => {
    return isInInterval(v, rule);
  });
const getInvalids = (t, rules) => t.filter((v) => !isValid(v, rules));

const main = async () => {
  const { rules, nearbyTickets } = await getInput();
  const invalidRate = nearbyTickets.reduce((acc, t) => {
    const invalids = getInvalids(t, rules);
    return acc + invalids.reduce((sum, current) => sum + current, 0);
  }, 0);
  console.log(("Solution:", invalidRate));
};

main();

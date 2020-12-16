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
const isValidRule = (v, rule) => isInInterval(v, rule);
const isInValidRule = (v, rule) => !isInInterval(v, rule);
const isValid = (v, rules) => rules.some((rule) => isValidRule(v, rule));
const getInvalids = (t, rules) => t.filter((v) => !isValid(v, rules));

const getInValidPositions = (ticket, rule) => {
  const invalidPositions = [];
  for (let i = 0; i < ticket.length; i++) {
    if (isInValidRule(ticket[i], rule)) {
      invalidPositions.push(i);
    }
  }
  return invalidPositions;
};

const main = async () => {
  const { rules, ticket, nearbyTickets } = await getInput();
  const validTickets = nearbyTickets.filter(
    (ticket) => getInvalids(ticket, rules).length === 0
  );
  const candidateRulesForPosition = Array.from(
    Array(rules.length).fill(rules.map((r) => r.name))
  );
  const positions = {};
  for (let r = 0; r < rules.length; r++) {
    for (let t = 0; t < validTickets.length; t++) {
      const invalidPositions = getInValidPositions(validTickets[t], rules[r]);
      invalidPositions.forEach((pos) => {
        candidateRulesForPosition[pos] = candidateRulesForPosition[pos].filter(
          (item) => item !== rules[r].name
        );
        if (candidateRulesForPosition[pos].length === 1) {
          let foundRules = [
            {
              rule: candidateRulesForPosition[pos][0],
              position: pos,
            },
          ];
          while (foundRules.length !== 0) {
            const newFoundRules = [];
            foundRules.forEach((found) => {
              positions[found.rule] = found.position;
              for (let p = 0; p < candidateRulesForPosition.length; p++) {
                candidateRulesForPosition[p] = candidateRulesForPosition[
                  p
                ].filter((item) => item !== found.rule);
                if (candidateRulesForPosition[p].length === 1) {
                  newFoundRules.push({
                    rule: candidateRulesForPosition[p][0],
                    position: p,
                  });
                }
              }
            });
            foundRules = newFoundRules;
          }
        }
      });
    }
  }
  const solutionRules = Object.keys(positions).filter((s) =>
    s.startsWith("departure")
  );
  console.log(
    ("Solution:",
    solutionRules.reduce((acc, curr) => {
      return acc * ticket[positions[curr]];
    }, 1))
  );
};
main();

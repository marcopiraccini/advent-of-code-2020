const { intersection, difference, sortBy } = require("lodash");
const readInput = require("../readInput");

const parse = (line) => {
  const ing = line.split("(contains ")[0].trim().split(" ");
  const all = line
    .split("(contains ")[1]
    .slice(0, -1)
    .split(",")
    .map((x) => x.trim());
  return { ing, all };
};

const main = async () => {
  const rules = await readInput(process.argv[2], parse);
  const foodsWithAllerges = [];
  const allergens = {};
  const allergensMap = rules.reduce((acc, rule) => {
    for (const all of rule.all) {
      if (!acc[all]) acc[all] = [];
      acc[all].push(rule.ing);
    }
    return acc;
  }, {});

  Object.keys(allergensMap).forEach((all) => {
    const ingredients = intersection(...allergensMap[all]);
    if (!allergens[all]) allergens[all] = [];
    for (const ingredient of ingredients) {
      foodsWithAllerges.push(ingredient);
      allergens[all].push(ingredient);
    }
  });

  const foundAllergenes = {};
  while (Object.keys(allergens).length > 0) {
    for (const key of Object.keys(allergens)) {
      if (allergens[key].length === 1) {
        const foundIngredient = allergens[key][0];
        foundAllergenes[key] = foundIngredient;
        Object.keys(allergens).forEach((all) => {
          allergens[all] = allergens[all].filter((x) => x !== foundIngredient);
        });
        delete allergens[key];
      }
    }
  }

  rules.forEach((r) => {
    r.ing = difference(r.ing, foodsWithAllerges);
  });
  console.log(
    "Solution part1:",
    rules.reduce((acc, r) => acc + r.ing.length, 0)
  );
  const allergensKeys = sortBy(Array.from(Object.keys(foundAllergenes)));
  const dangerousFood = [];
  allergensKeys.forEach((all) => dangerousFood.push(foundAllergenes[all]));
  console.log("Solution part2:", dangerousFood.join(","));
};

main();

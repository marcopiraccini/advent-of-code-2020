const readInput = require("./readInput");

const fields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
const isValid = (item) => fields.every((field) => !!item[field]);

const parse = (item) => {
  if (item === "") return null;
  return item.split(" ").reduce((acc, el) => {
    const [key, value] = el.split(":");
    return { ...acc, [key]: value };
  }, {});
};

const main = async () => {
  const items = await readInput(process.argv[2], parse);
  const passports = items.reduce(
    (acc, curr) => {
      if (curr === null) {
        return acc.concat({});
      }
      acc[acc.length - 1] = { ...curr, ...acc[acc.length - 1] };
      return acc;
    },
    [{}]
  );
  const validPassports = passports.filter(isValid);
  console.log(("Solution:", validPassports.length));
};

main();

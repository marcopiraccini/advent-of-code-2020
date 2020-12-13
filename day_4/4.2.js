const readInput = require("../readInput");

const fields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
const areFieldsComplete = (item) => fields.every((field) => !!item[field]);
const eyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
const validateNumber = (n, b, t) => {
  if (isNaN(n)) return false;
  return +n >= b && +n <= t;
};

const validateHeigth = (h) => {
  if (h.includes("cm")) return validateNumber(h.split("cm")[0], 150, 193);
  if (h.includes("in")) return validateNumber(h.split("in")[0], 59, 76);
  return false;
};
const validateHairColor = (clr) => /#(?:[0-9a-fA-F]{3}){1,2}$/.test(clr);
const validateEyeColor = (clr) => eyeColors.some((c) => c === clr);
const validatePid = (pid) => /^\d{9}$/.test(pid);
const isValid = (item) => {
  if (!areFieldsComplete(item)) return false;
  return Object.keys(item).every((key) => {
    const value = item[key];
    switch (key) {
      case "byr":
        return validateNumber(value, 1920, 2002);
      case "iyr":
        return validateNumber(value, 2010, 2020);
      case "eyr":
        return validateNumber(value, 2020, 2030);
      case "hgt":
        return validateHeigth(value);
      case "hcl":
        return validateHairColor(value);
      case "ecl":
        return validateEyeColor(value);
      case "pid":
        return validatePid(value);
      case "cid":
        return true;
      default:
        return false;
    }
  });
};

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

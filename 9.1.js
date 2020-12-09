const readInput = require("./readInput");
const preamble = 25;

const coupleExists = (arr, n) =>
  arr.some((el, index) => arr.slice(index).includes(n - el));
const findWrong = (nums) => {
  for (let i = preamble; i <= nums.length; i++) {
    if (!coupleExists(nums.slice(i - preamble, i), nums[i])) return nums[i];
  }
};
const main = async () => {
  const nums = await readInput(process.argv[2], (x) => +x);
  console.log("Solution:", findWrong(nums));
};

main();

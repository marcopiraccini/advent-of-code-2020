const readInput = require("../readInput");

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
  const wrong = findWrong(nums);
  for (let i = 0; i <= nums.length; i++) {
    let sum = 0,
      j = 0;
    while (sum < wrong || i + j === nums.length) {
      sum += nums[i + j];
      j++;
    }
    if (sum === wrong) {
      const found = nums.slice(i, i + j);
      console.log("Solution", Math.max(...found) + Math.min(...found));
      return;
    }
  }
};

main();

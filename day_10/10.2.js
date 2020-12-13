const readInput = require("../readInput");

const cache = new Map();
const childrenBranches = (arr, index, i) => {
  if (arr[index + i] - arr[index] <= 3) {
    if (cache.has(index + i)) {
      return cache.get(index + i) ? cache.get(index + i) : 0;
    } else {
      const childrensBranches = count(arr, index + i);
      cache.set(index + i, childrensBranches);
      return childrensBranches;
    }
  }
  return 0;
};

const count = (nums, index = 0) => {
  if (index === nums.length - 1) {
    return 1;
  }
  let result = 0 + childrenBranches(nums, index, 1);
  result += childrenBranches(nums, index, 2);
  result += childrenBranches(nums, index, 3);
  return result;
};

const main = async () => {
  const nums = await readInput(process.argv[2], (x) => +x);
  nums.sort((a, b) => a - b);
  console.log("Solution:", count([0, ...nums, nums[nums.length - 1] + 3]));
};
main();

const readInput = require("./readInput");

const main = async () => {
  const nums = (await readInput(process.argv[2], (x) => +x)).sort(
    (a, b) => a - b
  );
  const diffs = [0, ...nums, nums[nums.length - 1] + 3].reduce(
    (acc, c, index, arr) => {
      if (arr[index + 1] - arr[index] === 1) acc.diff1++;
      if (arr[index + 1] - arr[index] === 3) acc.diff3++;
      return acc;
    },
    { diff1: 0, diff3: 0 }
  );
  console.log("Solution:", diffs.diff1 * diffs.diff3);
};

main();

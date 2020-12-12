const readInput = require("./readInput");

const main = async () => {
  const nums = await readInput(process.argv[2], (x) => Number(x));
  for (const [index, value] of nums.entries()) {
    for (let i = index; i <= nums.length; i++) {
      for (let j = index + 1; j <= nums.length; j++) {
        if (value + nums[i] + nums[j] === 2020) {
          console.log("SOLUTION:", value * nums[i] * nums[j]);
          return;
        }
      }
    }
  }
};

main();

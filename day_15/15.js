const input = [13, 16, 0, 12, 15, 1];
let memory = new Map();

const getLastSpoken = (limit) => {
  for (let i = 0; i < input.length; i++) {
    memory.set(input[i], i + 1);
  }
  let lastSpoken = input[input.length - 1];
  for (let turn = input.length + 1; turn <= limit; turn++) {
    if (memory.has(lastSpoken)) {
      const lastTurn = memory.get(lastSpoken);
      memory.set(lastSpoken, turn - 1);
      lastSpoken = turn - 1 - lastTurn;
    } else {
      memory.set(lastSpoken, turn - 1);
      lastSpoken = 0;
    }
  }
  return lastSpoken;
};

const main = async () => {
  const firstSolution = getLastSpoken(2020);
  console.log("Solution1", firstSolution);
  memory = new Map();
  const secondSolution = getLastSpoken(30000000);
  console.log("Solution2", secondSolution);
};

main();

const readInput = require("../readInput");

const getDecks = (lines) => {
  const decks = [[], []];
  let current = 0;
  for (const line of lines) {
    if (line.startsWith("Player 2")) current = 1;
    if (line !== "" && !line.startsWith("Player")) decks[current].push(+line);
  }
  return decks;
};

const main = async () => {
  const input = await readInput(process.argv[2], (x) => x);
  let [p1, p2] = getDecks(input);
  while (p1.length !== 0 && p2.length !== 0) {
    const c1 = p1.shift();
    const c2 = p2.shift();
    if (c1 > c2) {
      p1 = p1.concat([c1, c2]);
    } else {
      p2 = p2.concat([c2, c1]);
    }
  }
  const winner = p1.length !== 0 ? p1 : p2;
  const sol = winner.reduce((acc, c, i, w) => acc + c * (w.length - i), 0);
  console.log("Solution", sol);
};

main();

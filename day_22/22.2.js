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

const game = (p1, p2) => {
  const alreadyPlayed = new Set();
  let winner, cards;
  while (p1.length !== 0 && p2.length !== 0) {
    if (alreadyPlayed.has(p1 + p2)) {
      return { winner: "p1", cards: p1 };
    }
    alreadyPlayed.add(p1 + p2);
    const c1 = p1.shift();
    const c2 = p2.shift();
    if (p1.length >= c1 && p2.length >= c2) {
      winner = game(p1.slice(0, c1), p2.slice(0, c2)).winner;
    } else {
      winner = c1 > c2 ? "p1" : "p2";
    }
    if (winner === "p1") {
      p1 = [...p1, c1, c2];
      cards = p1;
    }
    if (winner === "p2") {
      p2 = [...p2, c2, c1];
      cards = p2;
    }
  }
  return { winner, cards };
};

const main = async () => {
  const input = await readInput(process.argv[2], (x) => x);
  let [p1, p2] = getDecks(input);
  const res = game(p1, p2);
  console.log(
    "Solution",
    res.cards.reduce((acc, c, i, w) => acc + c * (w.length - i), 0)
  );
};

main();

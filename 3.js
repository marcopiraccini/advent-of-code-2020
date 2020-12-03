const readInput = require("./readInput");

const isTree = ch => ch === '#'
const walk = (forest, right, down) => {
  const rowLength = 31;
  let trees = 0
  let col = 0;
  for (let row = 0; row < forest.length;) {
    if (isTree(forest[row][col])) {
     trees++;
    }
    row = row + down;
    col = (col + right) % rowLength
  }
  return trees;
}

const main = async () => {
  const forest = await readInput(process.argv[2], l => l.split(""))
  const p1 = walk(forest, 1, 1);
  const p2 = walk(forest,3, 1);
  const p3 = walk(forest,5, 1);
  const p4 = walk(forest,7,1,);
  const p5 = walk(forest, 1, 2);
  console.log(p1, p2, p3, p4, p5, "=", p1*p2*p3*p4*p5);
}

main()

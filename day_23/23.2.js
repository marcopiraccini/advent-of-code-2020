const readInput = require("../readInput");

const moves = 10000000;
const size = 1000000;

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

const main = async () => {
  const input = (
    await readInput(process.argv[2], (x) => x.split("").map((x) => +x))
  )[0];
  let first = null;
  let current = null;
  const cups = [];
  const nodesMap = new Map();
  for (let i = 1; i <= size; i++) {
    const val = i <= input.length ? input[i - 1] : i;
    const node = new Node(val);
    if (current) {
      current.next = node;
    } else {
      first = node;
    }
    current = node;
    cups.push(node);
    nodesMap.set(val, node);
    if (i === size) node.next = first;
  }
  current = first;

  for (let m = 0; m < moves; m++) {
    const a = current.next;
    const b = current.next.next;
    const c = current.next.next.next;
    let destinationVal = current.val > 1 ? current.val - 1 : size;
    while ([a.val, b.val, c.val].includes(destinationVal)) {
      destinationVal = destinationVal - 1;
      if (destinationVal === 0) {
        destinationVal = size - 1;
      }
    }
    let destination = nodesMap.get(destinationVal);
    // Actual current's next  is the one after the last picked cup
    current.next = c.next;
    // ...which is also the next current
    current = c.next;
    // Set the cups after the destination
    c.next = destination.next;
    destination.next = a;
  }
  const val1Node = nodesMap.get(1);
  const sol = val1Node.next.val * val1Node.next.next.val;
  console.log("Solution", sol);
};

main();

const readInput = require("./readInput");

const OCCUPIED = "#";
const EMPTY = "L";
const FLOOR = ".";

const cloneEmpty = (arr) => arr.map((arr) => new Array(arr.length));

const numberOfState = (arr, state) => {
  return arr.reduce((acc, c) => {
    if (c === state) {
      return ++acc;
    }
    return acc;
  }, 0);
};

const seatsAround = (state, col, row) => {
  const res = [];

  const add = (a, r, c) => {
    if (a[r][c] && a[r][c] !== FLOOR) {
      res.push(a[r][c]);
      return true;
    }
    return false;
  };

  // up
  for (let r = row - 1; r > -1; r--) {
    if (add(state, r, col)) break;
  }
  // down
  for (let r = row + 1; r < state.length; r++) {
    if (add(state, r, col)) break;
  }
  // right
  for (let c = col + 1; c < state[0].length; c++) {
    if (add(state, row, c)) break;
  }

  // left
  for (let c = col - 1; c > -1; c--) {
    if (add(state, row, c)) break;
  }

  // diagonals
  for (let c = col - 1, r = row - 1; c > -1, r > -1; c--, r--) {
    if (add(state, r, c)) break;
  }
  for (let c = col + 1, r = row - 1; c < state[0].length, r > -1; c++, r--) {
    if (add(state, r, c)) break;
  }
  for (
    let c = col + 1, r = row + 1;
    c < state[0].length, r < state.length;
    c++, r++
  ) {
    if (add(state, r, c)) break;
  }
  for (let c = col - 1, r = row + 1; c > -1, r < state.length; c--, r++) {
    if (add(state, r, c)) break;
  }
  return res;
};

const main = async () => {
  const input = await readInput(process.argv[2], (c) => c.split(""));
  const cols = input[0].length;
  let changed = false;
  let state = input;

  do {
    let nextState = cloneEmpty(state);
    changed = false;
    for (let row = 0; row < input.length; row++) {
      for (let col = 0; col < cols; col++) {
        const visibleSeats = seatsAround(state, col, row);
        if (state[row][col] === EMPTY && !visibleSeats.includes(OCCUPIED)) {
          nextState[row][col] = OCCUPIED;
        } else if (
          state[row][col] === OCCUPIED &&
          numberOfState(visibleSeats, OCCUPIED) >= 5
        ) {
          nextState[row][col] = EMPTY;
        } else {
          nextState[row][col] = state[row][col];
        }
        if (nextState[row][col] !== state[row][col] && !changed) {
          changed = true;
        }
      }
    }
    state = nextState;
  } while (changed);

  const occupied = state.reduce((acc, c) => {
    return acc + numberOfState(c, OCCUPIED);
  }, 0);
  console.log("Solution", occupied);
};

main();

const readInput = require("./readInput");

const OCCUPIED = "#";
const EMPTY = "L";

const cloneEmpty = (arr) => arr.map((arr) => new Array(arr.length));

const addAdjFromRow = (arr, row, col, ncols) => {
  const res = [];
  if (col != 0) res.push(arr[row][col - 1]);
  res.push(arr[row][col]);
  if (col != ncols - 1) res.push(arr[row][col + 1]);
  return res;
};

const adiacent = (arr, row, col, nrows, ncols) => {
  const res = [];
  // row before
  if (row !== 0) {
    res.push(...addAdjFromRow(arr, row - 1, col), ncols);
  }
  if (col !== 0) {
    res.push(arr[row][col - 1]);
  }
  if (col !== ncols - 1) {
    res.push(arr[row][col + 1]);
  }
  // row after
  if (row !== nrows - 1) {
    res.push(...addAdjFromRow(arr, row + 1, col, ncols));
  }
  return res;
};

const numberOfState = (arr, state) => {
  return arr.reduce((acc, c) => {
    if (c === state) {
      return ++acc;
    }
    return acc;
  }, 0);
};

const main = async () => {
  const input = await readInput(process.argv[2], (x) => x.split(""));
  const nrows = input.length;
  const ncols = input[0].length;
  let changed = false;
  let state = input;

  do {
    let nextState = cloneEmpty(state);
    changed = false;
    for (let row = 0; row < input.length; row++) {
      for (let col = 0; col < ncols; col++) {
        const adiacents = adiacent(state, row, col, nrows, ncols);
        if (state[row][col] === EMPTY && !adiacents.includes(OCCUPIED)) {
          nextState[row][col] = OCCUPIED;
        } else if (
          state[row][col] === OCCUPIED &&
          numberOfState(adiacents, OCCUPIED) >= 4
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

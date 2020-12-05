module.exports = async (filename, fun = (x) => x) => {
  const fileStream = require("fs").createReadStream(filename);
  const rl = require("readline").createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  const items = [];
  for await (const line of rl) {
    items.push(fun(line));
  }
  return items;
};

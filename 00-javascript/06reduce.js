const arr = [1, 2, 3, 4, 5];

Array.prototype.newReduce = function (cb, initalValue) {
  if (typeof cb !== "function") throw Error;
  let acc = initalValue;
  for (let i = 0; i < this.length; i++) {
    acc = cb(acc, this[i]);
  }
  return acc;
};

const reduced = arr.newReduce((acc, current) => acc + current, 0);
// acc + current = returned value, acc new value for next round
// 0+1 = 1
// 1+2 = 3
// 3+3 = 6
// 6+4 = 10
// 10+5 = 15
console.log(reduced);

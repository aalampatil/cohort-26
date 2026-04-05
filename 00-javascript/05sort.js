const arr = [1, 2, 3, 4, 5];
/* 
i am doing this not to sort this, to sort we have diff methods, for loop, sort fn
but i am doing this to explain how sort fn actully works
*/

Array.prototype.mySort = function (callback) {
  for (let i = 0; i < this.length - 1; i++) {
    for (let j = 0; j < this.length - i - 1; j++) {
      if (callback(this[j], this[j + 1]) > 0) {
        [this[j], this[j + 1]] = [this[j + 1], this[j]];
      }
    }
  }
  return this;
};

const sorted = arr.mySort((a, b) => b - a);

console.log(sorted);

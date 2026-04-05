const myarr = [1, 2, 3, 4, 5];

Array.prototype.myNewMap = function (cb) {
  if (typeof cb !== "function") throw Error;

  let result = new Array(this.length);
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      result[i] = cb(this[i]);
    }
  }

  return result;
};

const myNewArray = myarr.myNewMap((item) => item * item);

console.log(myNewArray);

// console.log(this);

function globalSpace() {
  return this;
}

// console.log(globalSpace());

String.prototype.sayHi = function (name) {
  return `Hi ${name}`;
};

const name = "aalam";
// console.log(name.sayHi(name));

console.log("rahul".sayHi(this.name));

Array.prototype.checklength = function () {
  return this.length;
};

console.log([1, 2, 3].checklength(this));

const obj = { name: "rahul", age: 22 };
obj.name = "aalam";
// obj = { name: "aalam", age: 22, happy: "yes" }; // can be reassigned as it is const, with let yes
// mutation is allowed, reassigning is not allowed

//console.log(obj);

//................................

let original = 90;
let clone = original;

clone = 80;

//console.log({ clone, original });

//.................................

let originalme = { name: "aalam", age: 22 };
const cloneme = { ...originalme }; //never copy objects directly

Object.assign(cloneme, originalme);
cloneme.name = "happy";

console.log({ originalme, cloneme });

originalme = null;

console.log(originalme);

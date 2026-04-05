// const { act } = require("react")

// const username = {
//   phone: "iphone",
//   age: {
//     a: 40,
//     b: {

//     }
//   }
// }
// const mycopy = username
// const copyName = { ...username }
// copyName.age.a = 5

const sales = [{ item: "samosa", quantity: 1, total: 30 }, { item: "samosa", quantity: 1, total: 30 }, { item: "kachori", quantity: 1, total: 50 }, { item: "kachori", quantity: 2, total: 60 }]

const result = sales.reduce((acc, current) => {
  console.log(acc, current)
  acc[current.item] = [current.total]
  return Mathacc
}, { samosa: 0, kachori: 0 })

console.log(result)
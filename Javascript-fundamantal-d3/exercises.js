// Exercise 1: Variables

const name = "jasim";
let age = 22;

console.log("1. Name:", name, "Age:", age);

// Exercise 2: Functions
function add(a,b) {
    return a + b;
}

console.log("2. sum:", add(40,40));

// Exercise 3: Arrays
const fruits = ["apple", "mango", "orange", "banana"];
console.log("3. fruits:", fruits[3], fruits[0],);

// Exercise 4: Objects
const person = {
    name: "jasim",
    place:"malappuram",
    age:22,
    address:"nannat house manalippuzha",

}
console.log("4. person:", person.name,person.place,person.age,person.address);

// Exercise 5: Destructuring
const {name: personname,place} = person;
console.log("5. destructuring:" , personname, place);

// Exercise 6: map()
const numbers = [12, 23, 32, 43, 52,];
const doubled = numbers.map(number => number - 2);
console.log("6. doubled:", doubled)

// Exercise 7: filter()
const scores = [12, 23, 32, 43, 52, 122];
const passed = scores.filter(score => score >= 1);
console.log("7. passed:", passed);

// Exercise 8: reduce()
const prices = [100, 200, 300, 400, 500];

const total = prices.reduce((sum, price) => sum + price, 0);

console.log("8. Total:", total);

// Exercise 9: Optional chaining
const user = {
  name: "Jasim"
};

console.log("9. City:", user.address?.city);

// 10. Array of objects
const employees = [
  { id: 1, name: "jasim", department: "IT" },
  { id: 2, name: "shabeer", department: "HR" },
  {id: 3, name: "mukthar", department: "HR"},
  { id: 4, name: "fasil", department: "IT" },
  { id: 5, name: "ashiq", department: "IT" }
];

const itEmployees = employees.filter(
  employee => employee.department === "IT"
);
const itNames = itEmployees.map(employee => employee.name);

console.log("10.", itNames);
const HEmployees = employees.filter(
  employee => employee.department === "HR"
);
const hNames = HEmployees.map(employee => employee.name);

console.log("10.", hNames);


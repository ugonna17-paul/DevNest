const mongoose = require('mongoose');
const Course = require('./models/Course');
const Module = require('./models/Module');
const Lesson = require('./models/Lesson');
require('dotenv').config();

const seedJavaScriptCourse = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/devnest');
        console.log('MongoDB Connected for JavaScript Course Seeding...');

        // Clear existing JavaScript course data
        const existingCourse = await Course.findOne({ slug: 'javascript' });
        if (existingCourse) {
            await Lesson.deleteMany({ course: existingCourse._id });
            await Module.deleteMany({ course: existingCourse._id });
            await Course.deleteOne({ _id: existingCourse._id });
            console.log('Cleared existing JavaScript course data');
        }

        // Create JavaScript Course
        const jsCourse = await Course.create({
            title: '30 Days of JavaScript',
            description: 'Master JavaScript from fundamentals to advanced concepts. Learn variables, functions, arrays, objects, DOM manipulation, async programming, and build real projects.',
            level: 'Beginner to Intermediate',
            slug: 'javascript',
            duration: '15 hours',
            prerequisites: ['HTML'],
            icon: '⚡',
            totalLessons: 30,
            isPublished: true,
            order: 3
        });

        console.log('✅ JavaScript Course created');

        // ============================================
        // MODULE 1: JAVASCRIPT FUNDAMENTALS
        // ============================================
        const module1 = await Module.create({
            course: jsCourse._id,
            title: 'JavaScript Fundamentals',
            description: 'Introduction to JavaScript, data types, and variables',
            order: 1,
            isPublished: true
        });

        await Lesson.create([
            {
                module: module1._id,
                course: jsCourse._id,
                title: 'Introduction to JavaScript',
                content: `# Introduction to JavaScript

**JavaScript** is the programming language of the web. It adds interactivity and dynamic behavior to websites.

## What Can JavaScript Do?

- **Web Interactivity**: Respond to user actions (clicks, typing, scrolling)
- **Web Applications**: Build complex single-page applications
- **Mobile Apps**: React Native, Ionic
- **Desktop Apps**: Electron (VS Code, Slack)
- **Server-Side**: Node.js for backend development
- **Game Development**: Browser-based games
- **Machine Learning**: TensorFlow.js

## Why Learn JavaScript?

1. **Most Popular Language**: Most used on GitHub
2. **Huge Ecosystem**: Millions of packages (npm)
3. **Versatile**: Frontend, backend, mobile, desktop
4. **High Demand**: Top job market skill
5. **Active Community**: Constant evolution

## Adding JavaScript to HTML

### Inline JavaScript
\`\`\`html
<button onclick="alert('Hello!')">Click Me</button>
\`\`\`

### Internal JavaScript
\`\`\`html
<script>
  console.log('Hello, JavaScript!');
</script>
\`\`\`

### External JavaScript (Best Practice)
\`\`\`html
<script src="script.js"></script>
\`\`\``,
                codeExample: `// Your first JavaScript program
console.log('Hello, World!');

// Variables
let name = 'John';
let age = 25;
console.log('Name:', name);
console.log('Age:', age);

// Simple calculation
let x = 10;
let y = 20;
let sum = x + y;
console.log('Sum:', sum);

// Function
function greet(name) {
  return 'Hello, ' + name + '!';
}

console.log(greet('Developer'));

// Conditional
let hour = new Date().getHours();
if (hour < 12) {
  console.log('Good morning!');
} else if (hour < 18) {
  console.log('Good afternoon!');
} else {
  console.log('Good evening!');
}`,
                duration: 30,
                order: 1,
                isPublished: true
            },
            {
                module: module1._id,
                course: jsCourse._id,
                title: 'Data Types',
                content: `# JavaScript Data Types

JavaScript has two categories of data types:

## Primitive Data Types

Primitive types are **immutable** (cannot be changed).

### 1. Number
Both integers and floating-point numbers.

### 2. String
Text enclosed in quotes (\`''\`, \`""\`, or backticks).

### 3. Boolean
True or false values.

### 4. Undefined
Variable declared but not assigned a value.

### 5. Null
Intentional absence of value.

### 6. Symbol
Unique identifier (ES6+).

### 7. BigInt
Extremely large integers (ES2020).

## Non-Primitive Data Types

Non-primitive types are **mutable** (can be changed).

### Objects
Collections of key-value pairs.

### Arrays
Ordered lists of values.

### Functions
Reusable blocks of code.

## Checking Data Types

Use \`typeof\` operator to check data type.`,
                codeExample: `// PRIMITIVE DATA TYPES

// Number
let age = 25;
let pi = 3.14159;
let negative = -50;
console.log(typeof age); // "number"

// String
let name = 'Alice';
let message = "Hello, World!";
let template = \`My name is \${name}\`;
console.log(typeof name); // "string"

// Boolean
let isActive = true;
let isCompleted = false;
console.log(typeof isActive); // "boolean"

// Undefined
let notAssigned;
console.log(notAssigned); // undefined
console.log(typeof notAssigned); // "undefined"

// Null
let empty = null;
console.log(empty); // null
console.log(typeof empty); // "object" (JavaScript quirk)

// Symbol
let id = Symbol('unique');
console.log(typeof id); // "symbol"

// BigInt
let bigNumber = 1234567890123456789012345678901234567890n;
console.log(typeof bigNumber); // "bigint"

// NON-PRIMITIVE DATA TYPES

// Object
let person = {
  name: 'John',
  age: 30,
  city: 'New York'
};
console.log(typeof person); // "object"

// Array
let colors = ['red', 'green', 'blue'];
console.log(typeof colors); // "object"
console.log(Array.isArray(colors)); // true

// Function
function greet() {
  return 'Hello!';
}
console.log(typeof greet); // "function"`,
                duration: 35,
                order: 2,
                isPublished: true
            },
            {
                module: module1._id,
                course: jsCourse._id,
                title: 'Variables & Constants',
                content: `# Variables and Constants in JavaScript

Variables store data values that can be used and manipulated throughout your program.

## Variable Declaration

### let (Block-Scoped)
Modern way to declare variables. Can be reassigned.

### const (Block-Scoped)
Declares constants. Cannot be reassigned.

### var (Function-Scoped)
Old way. Avoid using in modern JavaScript.

## Variable Naming Rules

1. Must start with letter, \`_\`, or \`$\`
2. Can contain letters, numbers, \`_\`, \`$\`
3. Case-sensitive (\`name\` ≠ \`Name\`)
4. Cannot use reserved keywords
5. Use camelCase convention

## Best Practices

- Use \`const\` by default
- Use \`let\` when you need to reassign
- Avoid \`var\`
- Use descriptive names
- Follow naming conventions`,
                codeExample: `// let - Can be reassigned
let age = 25;
console.log(age); // 25

age = 26; // Reassignment works
console.log(age); // 26

let score; // Declaration without initialization
score = 100;

// const - Cannot be reassigned
const PI = 3.14159;
console.log(PI);

// PI = 3.14; // ❌ Error: Assignment to constant

const birthYear = 1995;
// birthYear = 1996; // ❌ Error

// const with objects/arrays (content CAN change)
const person = {
  name: 'Alice',
  age: 30
};

person.age = 31; // ✅ OK (modifying property)
console.log(person); // { name: 'Alice', age: 31 }

// person = {}; // ❌ Error (reassignment)

const colors = ['red', 'green'];
colors.push('blue'); // ✅ OK (modifying array)
console.log(colors); // ['red', 'green', 'blue']

// colors = []; // ❌ Error (reassignment)

// Naming conventions
const firstName = 'John'; // camelCase ✅
const last_name = 'Doe'; // snake_case (not common in JS)
const FULL_NAME = 'John Doe'; // UPPER_CASE for constants

// Multiple declarations
let x = 5, y = 10, z = 15;
console.log(x, y, z);

// var (avoid in modern JavaScript)
var oldWay = 'not recommended';

// Descriptive names
const userAge = 25; // Good
const a = 25; // Bad (not descriptive)`,
                duration: 25,
                order: 3,
                isPublished: true
            },
            {
                module: module1._id,
                course: jsCourse._id,
                title: 'Strings & Template Literals',
                content: `# Strings in JavaScript

Strings are sequences of characters used to represent text.

## String Creation

- Single quotes: \`'text'\`
- Double quotes: \`"text"\`
- Template literals: \`\\\`text\\\`\`

## Escape Sequences

- \`\\n\`: New line
- \`\\t\`: Tab
- \`\\'\`: Single quote
- \`\\"\`: Double quote
- \`\\\\\`: Backslash

## Template Literals (ES6)

Use backticks and \`\${expression}\` for:
- String interpolation
- Multi-line strings
- Expression embedding

## String Properties & Methods

- \`.length\`: String length
- \`.toUpperCase()\`: Convert to uppercase
- \`.toLowerCase()\`: Convert to lowercase
- \`.trim()\`: Remove whitespace
- \`.slice(start, end)\`: Extract substring
- \`.split(separator)\`: Split into array
- \`.includes(substring)\`: Check if contains
- \`.replace(old, new)\`: Replace text`,
                codeExample: `// String creation
let single = 'Hello';
let double = "World";
let template = \`JavaScript\`;

console.log(single, double, template);

// String concatenation (old way)
let firstName = 'John';
let lastName = 'Doe';
let fullName = firstName + ' ' + lastName;
console.log(fullName); // "John Doe"

// Template literals (modern way) ✅
let name = 'Alice';
let age = 25;
let greeting = \`My name is \${name} and I am \${age} years old.\`;
console.log(greeting);

// Multi-line strings
let multiLine = \`This is line 1
This is line 2
This is line 3\`;
console.log(multiLine);

// Expressions in template literals
let a = 10;
let b = 20;
console.log(\`The sum of \${a} and \${b} is \${a + b}\`);

// Escape sequences
let quote = 'It\\'s a beautiful day';
let newLine = 'Line 1\\nLine 2';
let tab = 'Name:\\tJohn';

console.log(quote);
console.log(newLine);
console.log(tab);

// String properties
let text = 'JavaScript';
console.log(text.length); // 10

// String methods
let message = '  Hello, World!  ';

console.log(message.toUpperCase()); // "  HELLO, WORLD!  "
console.log(message.toLowerCase()); // "  hello, world!  "
console.log(message.trim()); // "Hello, World!"

let str = 'JavaScript is awesome';
console.log(str.slice(0, 10)); // "JavaScript"
console.log(str.split(' ')); // ["JavaScript", "is", "awesome"]
console.log(str.includes('awesome')); // true
console.log(str.replace('awesome', 'amazing')); // "JavaScript is amazing"

// Accessing characters
let word = 'Hello';
console.log(word[0]); // "H"
console.log(word[4]); // "o"
console.log(word.charAt(1)); // "e"`,
                duration: 30,
                order: 4,
                isPublished: true
            }
        ]);

        console.log('✅ Module 1: JavaScript Fundamentals completed');

        // ============================================
        // MODULE 2: OPERATORS & CONTROL FLOW
        // ============================================
        const module2 = await Module.create({
            course: jsCourse._id,
            title: 'Operators & Control Flow',
            description: 'Master operators, conditionals, and loops',
            order: 2,
            isPublished: true
        });

        await Lesson.create([
            {
                module: module2._id,
                course: jsCourse._id,
                title: 'Operators in JavaScript',
                content: `# JavaScript Operators

Operators perform operations on variables and values.

## Arithmetic Operators

- \`+\`: Addition
- \`-\`: Subtraction
- \`*\`: Multiplication
- \`/\`: Division
- \`%\`: Modulus (remainder)
- \`**\`: Exponentiation
- \`++\`: Increment
- \`--\`: Decrement

## Assignment Operators

- \`=\`: Assignment
- \`+=\`: Add and assign
- \`-=\`: Subtract and assign
- \`*=\`: Multiply and assign
- \`/=\`: Divide and assign

## Comparison Operators

- \`==\`: Equal (loose)
- \`===\`: Equal (strict)
- \`!=\`: Not equal (loose)
- \`!==\`: Not equal (strict)
- \`>\`: Greater than
- \`<\`: Less than
- \`>=\`: Greater than or equal
- \`<=\`: Less than or equal

## Logical Operators

- \`&&\`: AND
- \`||\`: OR
- \`!\`: NOT

## String Operators

- \`+\`: Concatenation`,
                codeExample: `// Arithmetic Operators
let a = 10;
let b = 3;

console.log(a + b); // 13
console.log(a - b); // 7
console.log(a * b); // 30
console.log(a / b); // 3.333...
console.log(a % b); // 1 (remainder)
console.log(a ** b); // 1000 (10^3)

let count = 5;
count++; // Increment
console.log(count); // 6

count--; // Decrement
console.log(count); // 5

// Assignment Operators
let x = 10;
x += 5; // x = x + 5
console.log(x); // 15

x -= 3; // x = x - 3
console.log(x); // 12

x *= 2; // x = x * 2
console.log(x); // 24

x /= 4; // x = x / 4
console.log(x); // 6

// Comparison Operators
console.log(5 == '5'); // true (loose equality)
console.log(5 === '5'); // false (strict equality)
console.log(5 != '5'); // false
console.log(5 !== '5'); // true

console.log(10 > 5); // true
console.log(10 < 5); // false
console.log(10 >= 10); // true
console.log(5 <= 10); // true

// Logical Operators
let isAdult = true;
let hasLicense = true;

console.log(isAdult && hasLicense); // true (both true)
console.log(isAdult || false); // true (at least one true)
console.log(!isAdult); // false (opposite)

// Practical examples
let age = 20;
let canVote = age >= 18;
console.log('Can vote:', canVote); // true

let temperature = 25;
let isComfortable = temperature >= 20 && temperature <= 28;
console.log('Comfortable:', isComfortable); // true

// String concatenation
let firstName = 'John';
let lastName = 'Doe';
let fullName = firstName + ' ' + lastName;
console.log(fullName); // "John Doe"

// Type coercion
console.log('5' + 3); // "53" (string)
console.log('5' - 3); // 2 (number)
console.log('5' * '2'); // 10 (number)`,
                duration: 30,
                order: 1,
                isPublished: true
            },
            {
                module: module2._id,
                course: jsCourse._id,
                title: 'Conditionals: if, else, switch',
                content: `# Conditional Statements

Control program flow based on conditions.

## if Statement

Execute code if condition is true.

## if...else Statement

Execute one block if true, another if false.

## if...else if...else Statement

Check multiple conditions.

## switch Statement

Multiple conditional branches based on a value.

## Ternary Operator

Shorthand for simple if-else.

\`\`\`javascript
condition ? trueValue : falseValue
\`\`\`

## Truthy and Falsy Values

**Falsy values**: \`false\`, \`0\`, \`""\`, \`null\`, \`undefined\`, \`NaN\`

All other values are **truthy**.`,
                codeExample: `// if statement
let age = 18;

if (age >= 18) {
  console.log('You are an adult');
}

// if...else
let temperature = 25;

if (temperature > 30) {
  console.log('It\\'s hot');
} else {
  console.log('It\\'s pleasant');
}

// if...else if...else
let score = 85;

if (score >= 90) {
  console.log('Grade: A');
} else if (score >= 80) {
  console.log('Grade: B');
} else if (score >= 70) {
  console.log('Grade: C');
} else if (score >= 60) {
  console.log('Grade: D');
} else {
  console.log('Grade: F');
}

// switch statement
let day = 3;
let dayName;

switch (day) {
  case 1:
    dayName = 'Monday';
    break;
  case 2:
    dayName = 'Tuesday';
    break;
  case 3:
    dayName = 'Wednesday';
    break;
  case 4:
    dayName = 'Thursday';
    break;
  case 5:
    dayName = 'Friday';
    break;
  case 6:
    dayName = 'Saturday';
    break;
  case 7:
    dayName = 'Sunday';
    break;
  default:
    dayName = 'Invalid day';
}

console.log(dayName); // "Wednesday"

// Ternary operator
let userAge = 20;
let canDrink = userAge >= 21 ? 'Yes' : 'No';
console.log(canDrink); // "No"

let number = 15;
let type = number % 2 === 0 ? 'Even' : 'Odd';
console.log(type); // "Odd"

// Truthy and Falsy
let name = 'John';

if (name) {
  console.log('Name exists'); // This runs (truthy)
}

let emptyString = '';

if (!emptyString) {
  console.log('String is empty'); // This runs (falsy)
}

// Practical examples
let hour = new Date().getHours();
let greeting;

if (hour < 12) {
  greeting = 'Good morning';
} else if (hour < 18) {
  greeting = 'Good afternoon';
} else {
  greeting = 'Good evening';
}

console.log(greeting);

// Nested conditionals
let isLoggedIn = true;
let isPremium = true;

if (isLoggedIn) {
  if (isPremium) {
    console.log('Welcome, Premium Member!');
  } else {
    console.log('Welcome, User!');
  }
} else {
  console.log('Please log in');
}`,
                duration: 30,
                order: 2,
                isPublished: true
            },
            {
                module: module2._id,
                course: jsCourse._id,
                title: 'Loops: for, while, do-while',
                content: `# JavaScript Loops

Loops execute code repeatedly.

## for Loop

Classic loop with counter.

\`\`\`javascript
for (initialization; condition; increment) {
  // code
}
\`\`\`

## while Loop

Execute while condition is true.

\`\`\`javascript
while (condition) {
  // code
}
\`\`\`

## do...while Loop

Execute at least once, then check condition.

\`\`\`javascript
do {
  // code
} while (condition);
\`\`\`

## for...of Loop

Iterate over iterable objects (arrays, strings).

\`\`\`javascript
for (let item of array) {
  // code
}
\`\`\`

## for...in Loop

Iterate over object properties.

\`\`\`javascript
for (let key in object) {
  // code
}
\`\`\`

## Loop Control

- \`break\`: Exit loop
- \`continue\`: Skip to next iteration`,
                codeExample: `// for loop
for (let i = 0; i < 5; i++) {
  console.log('Count:', i);
}
// Output: 0, 1, 2, 3, 4

// Sum of numbers
let sum = 0;
for (let i = 1; i <= 10; i++) {
  sum += i;
}
console.log('Sum 1-10:', sum); // 55

// while loop
let count = 0;
while (count < 5) {
  console.log('While count:', count);
  count++;
}

// do...while loop (runs at least once)
let num = 0;
do {
  console.log('Do-while:', num);
  num++;
} while (num < 3);

// for...of loop (arrays)
let colors = ['red', 'green', 'blue'];

for (let color of colors) {
  console.log(color);
}
// Output: red, green, blue

// for...of with strings
let name = 'JavaScript';
for (let char of name) {
  console.log(char);
}

// for...in loop (objects)
let person = {
  name: 'John',
  age: 30,
  city: 'New York'
};

for (let key in person) {
  console.log(\`\${key}: \${person[key]}\`);
}
// Output:
// name: John
// age: 30
// city: New York

// break statement
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    break; // Exit loop when i is 5
  }
  console.log(i);
}
// Output: 0, 1, 2, 3, 4

// continue statement
for (let i = 0; i < 5; i++) {
  if (i === 2) {
    continue; // Skip when i is 2
  }
  console.log(i);
}
// Output: 0, 1, 3, 4

// Nested loops
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log(\`i: \${i}, j: \${j}\`);
  }
}

// Practical: Multiplication table
for (let i = 1; i <= 5; i++) {
  let row = '';
  for (let j = 1; j <= 5; j++) {
    row += (i * j) + '\\t';
  }
  console.log(row);
}

// Reverse iteration
for (let i = 5; i >= 1; i--) {
  console.log('Countdown:', i);
}

// Loop through array with index
let fruits = ['apple', 'banana', 'orange'];
for (let i = 0; i < fruits.length; i++) {
  console.log(\`\${i}: \${fruits[i]}\`);
}`,
                duration: 35,
                order: 3,
                isPublished: true
            }
        ]);

        console.log('✅ Module 2: Operators & Control Flow completed');

        // ============================================
        // MODULE 3: FUNCTIONS
        // ============================================
        const module3 = await Module.create({
            course: jsCourse._id,
            title: 'Functions',
            description: 'Master function declaration, expressions, arrow functions, and scope',
            order: 3,
            isPublished: true
        });

        await Lesson.create([
            {
                module: module3._id,
                course: jsCourse._id,
                title: 'Functions Basics',
                content: `# JavaScript Functions

Functions are reusable blocks of code that perform specific tasks.

## Function Declaration

\`\`\`javascript
function functionName(parameters) {
  // code
  return value;
}
\`\`\`

## Function Expression

\`\`\`javascript
const functionName = function(parameters) {
  // code
  return value;
};
\`\`\`

## Arrow Functions (ES6)

\`\`\`javascript
const functionName = (parameters) => {
  // code
  return value;
};

// Short syntax
const add = (a, b) => a + b;
\`\`\`

## Function Parameters

- **Default Parameters**: Set default values
- **Rest Parameters**: Unlimited arguments (\`...args\`)

## Return Statement

- Returns a value from function
- Stops function execution
- Without \`return\`, function returns \`undefined\`

## Benefits of Functions

- **Reusability**: Write once, use many times
- **Organization**: Break code into logical pieces
- **Maintainability**: Easier to debug and update
- **Abstraction**: Hide complex logic`,
                codeExample: `// Function declaration
function greet(name) {
  return 'Hello, ' + name + '!';
}

console.log(greet('John')); // "Hello, John!"
console.log(greet('Alice')); // "Hello, Alice!"

// Function with multiple parameters
function add(a, b) {
  return a + b;
}

console.log(add(5, 3)); // 8
console.log(add(10, 20)); // 30

// Function without return (returns undefined)
function sayHi() {
  console.log('Hi there!');
}

let result = sayHi(); // Logs "Hi there!"
console.log(result); // undefined

// Function expression
const multiply = function(x, y) {
  return x * y;
};

console.log(multiply(4, 5)); // 20

// Arrow function
const subtract = (a, b) => {
  return a - b;
};

console.log(subtract(10, 3)); // 7

// Arrow function (short syntax)
const square = x => x * x;
console.log(square(5)); // 25

const divide = (a, b) => a / b;
console.log(divide(20, 4)); // 5

// Default parameters
function greetUser(name = 'Guest') {
  return \`Welcome, \${name}!\`;
}

console.log(greetUser('Alice')); // "Welcome, Alice!"
console.log(greetUser()); // "Welcome, Guest!"

// Rest parameters
function sum(...numbers) {
  let total = 0;
  for (let num of numbers) {
    total += num;
  }
  return total;
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15

// Function returning object
function createPerson(name, age) {
  return {
    name: name,
    age: age,
    greet: function() {
      return \`Hi, I'm \${this.name}\`;
    }
  };
}

let person = createPerson('Bob', 30);
console.log(person.greet()); // "Hi, I'm Bob"

// Immediately Invoked Function Expression (IIFE)
(function() {
  console.log('This runs immediately!');
})();

// Practical examples
function calculateArea(width, height) {
  return width * height;
}

function isEven(number) {
  return number % 2 === 0;
}

function getMax(a, b) {
  return a > b ? a : b;
}

console.log(calculateArea(5, 10)); // 50
console.log(isEven(7)); // false
console.log(getMax(15, 20)); // 20`,
                duration: 35,
                order: 1,
                isPublished: true
            },
            {
                module: module3._id,
                course: jsCourse._id,
                title: 'Scope & Closures',
                content: `# Scope and Closures

## Scope

Scope determines where variables can be accessed.

### Global Scope
Variables declared outside functions. Accessible everywhere.

### Function Scope
Variables declared inside functions. Only accessible within that function.

### Block Scope
Variables declared with \`let\` or \`const\` inside \`{}\`. Only accessible within that block.

## Variable Shadowing

Inner scope variable with same name as outer scope variable.

## Closures

A closure is a function that has access to variables from its outer (enclosing) function, even after the outer function has returned.

### Why Closures?

- **Data Privacy**: Create private variables
- **State Preservation**: Maintain state between function calls
- **Function Factories**: Generate specialized functions

## Lexical Scope

Functions are executed using the scope they were defined in, not the scope they are called in.`,
                codeExample: `// SCOPE

// Global scope
let globalVar = 'I am global';

function testScope() {
  // Function scope
  let functionVar = 'I am in function';
  console.log(globalVar); // ✅ Accessible
  console.log(functionVar); // ✅ Accessible
}

testScope();
// console.log(functionVar); // ❌ Error: not accessible

// Block scope
if (true) {
  let blockVar = 'I am in block';
  const anotherBlock = 'Also in block';
  var funcScopedVar = 'I am function scoped';
  
  console.log(blockVar); // ✅ Accessible
}

// console.log(blockVar); // ❌ Error: not accessible
console.log(funcScopedVar); // ✅ var is function-scoped!

// Variable shadowing
let name = 'Global Name';

function showName() {
  let name = 'Function Name'; // Shadows global
  console.log(name); // "Function Name"
}

showName();
console.log(name); // "Global Name"

// CLOSURES

// Basic closure
function outer() {
  let count = 0;
  
  function inner() {
    count++;
    console.log(count);
  }
  
  return inner;
}

const counter = outer();
counter(); // 1
counter(); // 2
counter(); // 3

// Private variables with closures
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private variable
  
  return {
    deposit: function(amount) {
      balance += amount;
      return balance;
    },
    withdraw: function(amount) {
      if (amount <= balance) {
        balance -= amount;
        return balance;
      }
      return 'Insufficient funds';
    },
    getBalance: function() {
      return balance;
    }
  };
}

const myAccount = createBankAccount(1000);
console.log(myAccount.getBalance()); // 1000
console.log(myAccount.deposit(500)); // 1500
console.log(myAccount.withdraw(200)); // 1300
// console.log(myAccount.balance); // undefined (private!)

// Function factory with closures
function multiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

// Practical example: Event handler
function setupButton(buttonId) {
  let clickCount = 0;
  
  return function() {
    clickCount++;
    console.log(\`Button \${buttonId} clicked \${clickCount} times\`);
  };
}

const button1Handler = setupButton('btn1');
const button2Handler = setupButton('btn2');

button1Handler(); // "Button btn1 clicked 1 times"
button1Handler(); // "Button btn1 clicked 2 times"
button2Handler(); // "Button btn2 clicked 1 times"

// Closure in loops (common interview question)
for (var i = 1; i <= 3; i++) {
  setTimeout(function() {
    console.log(i); // 4, 4, 4 (var issue)
  }, 1000);
}

// Fix with let (block scope)
for (let j = 1; j <= 3; j++) {
  setTimeout(function() {
    console.log(j); // 1, 2, 3 (correct!)
  }, 1000);
}

// Fix with closure
for (var k = 1; k <= 3; k++) {
  (function(num) {
    setTimeout(function() {
      console.log(num); // 1, 2, 3
    }, 1000);
  })(k);
}`,
                duration: 40,
                order: 2,
                isPublished: true
            },
            {
                module: module3._id,
                course: jsCourse._id,
                title: 'Higher-Order Functions',
                content: `# Higher-Order Functions

A **higher-order function** is a function that:
1. Takes a function as an argument, OR
2. Returns a function

## Common Higher-Order Functions

### Array Methods

#### map()
Transform each element and return new array.

#### filter()
Filter elements based on condition.

#### reduce()
Reduce array to single value.

#### forEach()
Execute function for each element (no return).

#### find()
Find first element matching condition.

#### some()
Check if at least one element matches.

#### every()
Check if all elements match.

### Why Higher-Order Functions?

- **Cleaner Code**: More readable and concise
- **Functional Programming**: Declarative approach
- **Reusability**: Pass different functions for different behaviors
- **Abstraction**: Hide implementation details`,
                codeExample: `// HIGHER-ORDER FUNCTIONS

// Function as argument
function calculate(operation, a, b) {
  return operation(a, b);
}

const add = (x, y) => x + y;
const multiply = (x, y) => x * y;

console.log(calculate(add, 5, 3)); // 8
console.log(calculate(multiply, 5, 3)); // 15

// Function returning function
function greeting(language) {
  if (language === 'es') {
    return () => console.log('¡Hola!');
  } else if (language === 'fr') {
    return () => console.log('Bonjour!');
  } else {
    return () => console.log('Hello!');
  }
}

const spanishGreet = greeting('es');
spanishGreet(); // "¡Hola!"

// ARRAY METHODS

const numbers = [1, 2, 3, 4, 5];

// map() - Transform elements
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

const squared = numbers.map(num => num ** 2);
console.log(squared); // [1, 4, 9, 16, 25]

// filter() - Keep elements matching condition
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4]

const greaterThan2 = numbers.filter(num => num > 2);
console.log(greaterThan2); // [3, 4, 5]

// reduce() - Reduce to single value
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 15

const product = numbers.reduce((acc, num) => acc * num, 1);
console.log(product); // 120

// forEach() - Execute for each (no return)
numbers.forEach(num => {
  console.log(num * 10);
});

// find() - First element matching condition
const found = numbers.find(num => num > 3);
console.log(found); // 4

// some() - At least one matches
const hasEven = numbers.some(num => num % 2 === 0);
console.log(hasEven); // true

// every() - All match
const allPositive = numbers.every(num => num > 0);
console.log(allPositive); // true

// PRACTICAL EXAMPLES

const users = [
  { name: 'Alice', age: 25, active: true },
  { name: 'Bob', age: 30, active: false },
  { name: 'Charlie', age: 35, active: true },
  { name: 'Diana', age: 28, active: true }
];

// Get names of active users
const activeNames = users
  .filter(user => user.active)
  .map(user => user.name);
console.log(activeNames); // ["Alice", "Charlie", "Diana"]

// Average age
const avgAge = users.reduce((sum, user) => sum + user.age, 0) / users.length;
console.log(avgAge); // 29.5

// Check if all users are adults
const allAdults = users.every(user => user.age >= 18);
console.log(allAdults); // true

// Chaining methods
const products = [
  { name: 'Laptop', price: 1000, inStock: true },
  { name: 'Phone', price: 500, inStock: true },
  { name: 'Tablet', price: 300, inStock: false },
  { name: 'Watch', price: 200, inStock: true }
];

const availableProductNames = products
  .filter(p => p.inStock)
  .filter(p => p.price < 600)
  .map(p => p.name);

console.log(availableProductNames); // ["Phone", "Watch"]

// Custom higher-order function
function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i);
  }
}

repeat(3, i => {
  console.log(\`Iteration \${i}\`);
});`,
                duration: 40,
                order: 3,
                isPublished: true
            }
        ]);

        console.log('✅ Module 3: Functions completed');

        // ============================================
        // MODULE 4: DATA STRUCTURES
        // ============================================
        const module4 = await Module.create({
            course: jsCourse._id,
            title: 'Data Structures',
            description: 'Master arrays, objects, sets, maps, and destructuring',
            order: 4,
            isPublished: true
        });

        await Lesson.create([
            {
                module: module4._id,
                course: jsCourse._id,
                title: 'Arrays',
                content: `# JavaScript Arrays

Arrays store multiple values in a single variable.

## Creating Arrays

\`\`\`javascript
let arr = [1, 2, 3];
let arr2 = new Array(1, 2, 3);
\`\`\`

## Array Properties

- \`.length\`: Number of elements

## Array Methods

### Adding/Removing
- \`.push()\`: Add to end
- \`.pop()\`: Remove from end
- \`.unshift()\`: Add to beginning
- \`.shift()\`: Remove from beginning
- \`.splice()\`: Add/remove at specific position

### Searching
- \`.indexOf()\`: Find index of element
- \`.includes()\`: Check if element exists
- \`.find()\`: Find element by condition
- \`.findIndex()\`: Find index by condition

### Iteration
- \`.forEach()\`: Execute for each
- \`.map()\`: Transform elements
- \`.filter()\`: Filter elements
- \`.reduce()\`: Reduce to single value

### Other
- \`.slice()\`: Extract portion
- \`.concat()\`: Merge arrays
- \`.join()\`: Join to string
- \`.reverse()\`: Reverse array
- \`.sort()\`: Sort elements`,
                codeExample: `// Creating arrays
let fruits = ['apple', 'banana', 'orange'];
let numbers = [1, 2, 3, 4, 5];
let mixed = [1, 'hello', true, null, { name: 'John' }];

console.log(fruits); // ["apple", "banana", "orange"]
console.log(fruits.length); // 3

// Accessing elements
console.log(fruits[0]); // "apple"
console.log(fruits[2]); // "orange"
console.log(fruits[fruits.length - 1]); // "orange" (last)

// Modifying elements
fruits[1] = 'mango';
console.log(fruits); // ["apple", "mango", "orange"]

// Adding elements
fruits.push('grape'); // Add to end
console.log(fruits); // ["apple", "mango", "orange", "grape"]

fruits.unshift('strawberry'); // Add to beginning
console.log(fruits); // ["strawberry", "apple", "mango", "orange", "grape"]

// Removing elements
let last = fruits.pop(); // Remove from end
console.log(last); // "grape"
console.log(fruits); // ["strawberry", "apple", "mango", "orange"]

let first = fruits.shift(); // Remove from beginning
console.log(first); // "strawberry"
console.log(fruits); // ["apple", "mango", "orange"]

// splice(startIndex, deleteCount, ...itemsToAdd)
let colors = ['red', 'green', 'blue', 'yellow'];
colors.splice(2, 0, 'purple'); // Insert at index 2
console.log(colors); // ["red", "green", "purple", "blue", "yellow"]

colors.splice(1, 2); // Remove 2 elements starting at index 1
console.log(colors); // ["red", "blue", "yellow"]

// Searching
let nums = [10, 20, 30, 40, 50];
console.log(nums.indexOf(30)); // 2
console.log(nums.indexOf(100)); // -1 (not found)
console.log(nums.includes(40)); // true
console.log(nums.includes(100)); // false

// find and findIndex
let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

let user = users.find(u => u.id === 2);
console.log(user); // { id: 2, name: 'Bob' }

let index = users.findIndex(u => u.name === 'Charlie');
console.log(index); // 2

// slice(start, end) - doesn't modify original
let arr = [1, 2, 3, 4, 5];
let sliced = arr.slice(1, 4);
console.log(sliced); // [2, 3, 4]
console.log(arr); // [1, 2, 3, 4, 5] (unchanged)

// concat - merge arrays
let arr1 = [1, 2];
let arr2 = [3, 4];
let combined = arr1.concat(arr2);
console.log(combined); // [1, 2, 3, 4]

// join - array to string
let words = ['Hello', 'World', 'JavaScript'];
console.log(words.join(' ')); // "Hello World JavaScript"
console.log(words.join('-')); // "Hello-World-JavaScript"

// reverse
let letters = ['a', 'b', 'c'];
letters.reverse();
console.log(letters); // ["c", "b", "a"]

// sort
let unsorted = [3, 1, 4, 1, 5, 9];
unsorted.sort();
console.log(unsorted); // [1, 1, 3, 4, 5, 9]

// Sort numbers (correct way)
let numsToSort = [10, 5, 40, 25, 1000, 1];
numsToSort.sort((a, b) => a - b); // Ascending
console.log(numsToSort); // [1, 5, 10, 25, 40, 1000]

// Multi-dimensional arrays
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

console.log(matrix[1][2]); // 6`,
                duration: 40,
                order: 1,
                isPublished: true
            },
            {
                module: module4._id,
                course: jsCourse._id,
                title: 'Objects',
                content: `# JavaScript Objects

Objects store collections of key-value pairs.

## Creating Objects

### Object Literal
\`\`\`javascript
let obj = { key: 'value' };
\`\`\`

### new Object()
\`\`\`javascript
let obj = new Object();
\`\`\`

### Constructor Function
\`\`\`javascript
function Person(name) {
  this.name = name;
}
\`\`\`

## Accessing Properties

- **Dot notation**: \`obj.key\`
- **Bracket notation**: \`obj['key']\`

## Object Methods

- \`Object.keys()\`: Get array of keys
- \`Object.values()\`: Get array of values
- \`Object.entries()\`: Get array of [key, value] pairs
- \`Object.assign()\`: Copy properties
- \`hasOwnProperty()\`: Check if property exists

## this Keyword

In object methods, \`this\` refers to the object.`,
                codeExample: `// Creating objects
let person = {
  name: 'John Doe',
  age: 30,
  city: 'New York',
  isEmployed: true
};

console.log(person);

// Accessing properties
console.log(person.name); // "John Doe"
console.log(person['age']); // 30

// Bracket notation for dynamic keys
let key = 'city';
console.log(person[key]); // "New York"

// Adding properties
person.email = 'john@example.com';
person['phone'] = '555-1234';
console.log(person);

// Modifying properties
person.age = 31;
person['city'] = 'Los Angeles';
console.log(person);

// Deleting properties
delete person.phone;
console.log(person);

// Object methods
let user = {
  firstName: 'Alice',
  lastName: 'Smith',
  age: 25,
  
  // Method
  fullName: function() {
    return this.firstName + ' ' + this.lastName;
  },
  
  // ES6 method shorthand
  greet() {
    return \`Hello, I'm \${this.firstName}\`;
  },
  
  // Arrow function (this doesn't work correctly!)
  // getAge: () => this.age // ❌ Don't use arrow functions for methods
};

console.log(user.fullName()); // "Alice Smith"
console.log(user.greet()); // "Hello, I'm Alice"

// Object.keys(), Object.values(), Object.entries()
let product = {
  id: 1,
  name: 'Laptop',
  price: 999,
  inStock: true
};

console.log(Object.keys(product)); // ["id", "name", "price", "inStock"]
console.log(Object.values(product)); // [1, "Laptop", 999, true]
console.log(Object.entries(product));
// [["id", 1], ["name", "Laptop"], ["price", 999], ["inStock", true]]

// Iterating over object
for (let key in product) {
  console.log(\`\${key}: \${product[key]}\`);
}

// hasOwnProperty
console.log(product.hasOwnProperty('name')); // true
console.log(product.hasOwnProperty('color')); // false

// Object.assign() - copy/merge objects
let defaults = { theme: 'light', language: 'en' };
let userSettings = { language: 'es' };

let settings = Object.assign({}, defaults, userSettings);
console.log(settings); // { theme: 'light', language: 'es' }

// Spread operator (modern way)
let merged = { ...defaults, ...userSettings };
console.log(merged); // { theme: 'light', language: 'es' }

// Nested objects
let company = {
  name: 'Tech Corp',
  address: {
    street: '123 Main St',
    city: 'San Francisco',
    zip: '94102'
  },
  employees: [
    { name: 'Alice', role: 'Developer' },
    { name: 'Bob', role: 'Designer' }
  ]
};

console.log(company.address.city); // "San Francisco"
console.log(company.employees[0].name); // "Alice"

// Constructor function
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.start = function() {
    return \`\${this.make} \${this.model} is starting...\`;
  };
}

let myCar = new Car('Toyota', 'Camry', 2022);
console.log(myCar.make); // "Toyota"
console.log(myCar.start()); // "Toyota Camry is starting..."

// Object shorthand (ES6)
let firstName = 'John';
let lastName = 'Doe';

let personShorthand = {
  firstName, // Same as firstName: firstName
  lastName,  // Same as lastName: lastName
  age: 30
};

console.log(personShorthand);

// Computed property names
let propName = 'score';
let gameStats = {
  [propName]: 100,
  ['level']: 5
};

console.log(gameStats); // { score: 100, level: 5 }`,
                duration: 40,
                order: 2,
                isPublished: true
            },
            {
                module: module4._id,
                course: jsCourse._id,
                title: 'Destructuring & Spread',
                content: `# Destructuring and Spread Operator

## Destructuring

Extract values from arrays or properties from objects into distinct variables.

### Array Destructuring

\`\`\`javascript
let [a, b, c] = [1, 2, 3];
\`\`\`

### Object Destructuring

\`\`\`javascript
let {name, age} = {name: 'John', age: 30};
\`\`\`

## Spread Operator (...)

Expand iterables into individual elements.

### Array Spreading

\`\`\`javascript
let arr = [1, 2, 3];
let newArr = [...arr, 4, 5];
\`\`\`

### Object Spreading

\`\`\`javascript
let obj = {a: 1, b: 2};
let newObj = {...obj, c: 3};
\`\`\`

## Rest Parameters

Collect multiple elements into an array.

\`\`\`javascript
function sum(...numbers) {
  // numbers is an array
}
\`\`\``,
                codeExample: `// ARRAY DESTRUCTURING

let numbers = [1, 2, 3, 4, 5];

// Basic destructuring
let [first, second] = numbers;
console.log(first); // 1
console.log(second); // 2

// Skip elements
let [a, , c] = numbers;
console.log(a); // 1
console.log(c); // 3

// Rest pattern
let [x, y, ...rest] = numbers;
console.log(x); // 1
console.log(y); // 2
console.log(rest); // [3, 4, 5]

// Default values
let [p, q, r = 10] = [1, 2];
console.log(r); // 10 (default)

// Swapping variables
let num1 = 5;
let num2 = 10;
[num1, num2] = [num2, num1];
console.log(num1, num2); // 10, 5

// OBJECT DESTRUCTURING

let person = {
  name: 'Alice',
  age: 25,
  city: 'New York',
  country: 'USA'
};

// Basic destructuring
let { name, age } = person;
console.log(name); // "Alice"
console.log(age); // 25

// Rename variables
let { name: userName, age: userAge } = person;
console.log(userName); // "Alice"
console.log(userAge); // 25

// Default values
let { name: n, zip = '00000' } = person;
console.log(zip); // "00000" (default)

// Nested destructuring
let user = {
  id: 1,
  info: {
    firstName: 'John',
    lastName: 'Doe',
    address: {
      street: '123 Main St',
      city: 'Boston'
    }
  }
};

let {
  info: {
    firstName,
    address: { city: userCity }
  }
} = user;

console.log(firstName); // "John"
console.log(userCity); // "Boston"

// Function parameter destructuring
function printUser({ name, age, city }) {
  console.log(\`\${name}, \${age}, from \${city}\`);
}

printUser(person); // "Alice, 25, from New York"

// SPREAD OPERATOR

// Array spreading
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

let combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

let extended = [0, ...arr1, 3.5, ...arr2, 7];
console.log(extended); // [0, 1, 2, 3, 3.5, 4, 5, 6, 7]

// Copy array
let original = [1, 2, 3];
let copy = [...original];
console.log(copy); // [1, 2, 3]

// Object spreading
let obj1 = { a: 1, b: 2 };
let obj2 = { c: 3, d: 4 };

let merged = { ...obj1, ...obj2 };
console.log(merged); // { a: 1, b: 2, c: 3, d: 4 }

// Copy object
let original2 = { x: 10, y: 20 };
let copy2 = { ...original2 };
console.log(copy2); // { x: 10, y: 20 }

// Override properties
let defaults = { theme: 'light', fontSize: 14 };
let userPrefs = { fontSize: 16 };

let settings = { ...defaults, ...userPrefs };
console.log(settings); // { theme: 'light', fontSize: 16 }

// REST PARAMETERS

function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15

// Rest with other parameters
function multiply(multiplier, ...nums) {
  return nums.map(n => n * multiplier);
}

console.log(multiply(2, 1, 2, 3)); // [2, 4, 6]

// PRACTICAL EXAMPLES

// Extracting from API response
let apiResponse = {
  status: 200,
  data: {
    user: {
      id: 123,
      name: 'Bob',
      email: 'bob@example.com'
    },
    posts: [1, 2, 3]
  }
};

let {
  data: { user: { name: userName2, email } }
} = apiResponse;

console.log(userName2, email); // "Bob bob@example.com"

// Function returning multiple values
function getMinMax(arr) {
  return {
    min: Math.min(...arr),
    max: Math.max(...arr)
  };
}

let { min, max } = getMinMax([5, 2, 9, 1, 7]);
console.log(min, max); // 1, 9`,
                duration: 35,
                order: 3,
                isPublished: true
            },
            {
                module: module4._id,
                course: jsCourse._id,
                title: 'Sets and Maps',
                content: `# Sets and Maps

## Set

A collection of **unique** values. No duplicates allowed.

### Creating a Set

\`\`\`javascript
let set = new Set([1, 2, 3]);
\`\`\`

### Set Methods

- \`.add(value)\`: Add value
- \`.delete(value)\`: Remove value
- \`.has(value)\`: Check if exists
- \`.clear()\`: Remove all
- \`.size\`: Number of elements

## Map

A collection of **key-value pairs** where keys can be any type.

### Creating a Map

\`\`\`javascript
let map = new Map();
map.set('key', 'value');
\`\`\`

### Map Methods

- \`.set(key, value)\`: Add/update entry
- \`.get(key)\`: Get value
- \`.has(key)\`: Check if key exists
- \`.delete(key)\`: Remove entry
- \`.clear()\`: Remove all
- \`.size\`: Number of entries

## Set vs Array

- Set: Unique values, faster lookup
- Array: Allows duplicates, ordered

## Map vs Object

- Map: Any key type, better for frequent add/remove
- Object: String/Symbol keys only`,
                codeExample: `// SET

// Creating sets
let set = new Set([1, 2, 3, 4, 5]);
console.log(set); // Set(5) {1, 2, 3, 4, 5}

// Automatically removes duplicates
let nums = new Set([1, 2, 2, 3, 3, 3, 4]);
console.log(nums); // Set(4) {1, 2, 3, 4}

// Add elements
set.add(6);
set.add(7);
console.log(set); // Set(7) {1, 2, 3, 4, 5, 6, 7}

// Adding duplicate (ignored)
set.add(3);
console.log(set); // Still Set(7) - no duplicate

// Check if exists
console.log(set.has(3)); // true
console.log(set.has(10)); // false

// Delete element
set.delete(2);
console.log(set); // Set(6) {1, 3, 4, 5, 6, 7}

// Size
console.log(set.size); // 6

// Iterate
for (let value of set) {
  console.log(value);
}

// Set operations
let a = new Set([1, 2, 3, 4]);
let b = new Set([3, 4, 5, 6]);

// Union
let union = new Set([...a, ...b]);
console.log(union); // Set(6) {1, 2, 3, 4, 5, 6}

// Intersection
let intersection = new Set([...a].filter(x => b.has(x)));
console.log(intersection); // Set(2) {3, 4}

// Difference
let difference = new Set([...a].filter(x => !b.has(x)));
console.log(difference); // Set(2) {1, 2}

// Remove duplicates from array
let arr = [1, 2, 2, 3, 3, 4, 5, 5];
let unique = [...new Set(arr)];
console.log(unique); // [1, 2, 3, 4, 5]

// Clear all
set.clear();
console.log(set); // Set(0) {}

// MAP

// Creating maps
let map = new Map();

// Set entries
map.set('name', 'Alice');
map.set('age', 25);
map.set('city', 'NYC');

console.log(map);

// Get values
console.log(map.get('name')); // "Alice"
console.log(map.get('age')); // 25

// Check if key exists
console.log(map.has('name')); // true
console.log(map.has('country')); // false

// Map size
console.log(map.size); // 3

// Delete entry
map.delete('city');
console.log(map.size); // 2

// Any type as key (unlike objects!)
let objKey = { id: 1 };
let funcKey = function() {};
let numKey = 42;

map.set(objKey, 'Object key');
map.set(funcKey, 'Function key');
map.set(numKey, 'Number key');

console.log(map.get(objKey)); // "Object key"
console.log(map.get(funcKey)); // "Function key"
console.log(map.get(42)); // "Number key"

// Initialize with array of pairs
let userMap = new Map([
  ['id', 123],
  ['name', 'Bob'],
  ['email', 'bob@example.com']
]);

console.log(userMap);

// Iterate over map
for (let [key, value] of userMap) {
  console.log(\`\${key}: \${value}\`);
}

// keys(), values(), entries()
console.log([...userMap.keys()]); // ["id", "name", "email"]
console.log([...userMap.values()]); // [123, "Bob", "bob@example.com"]
console.log([...userMap.entries()]);
// [["id", 123], ["name", "Bob"], ["email", "bob@example.com"]]

// forEach
userMap.forEach((value, key) => {
  console.log(\`\${key} = \${value}\`);
});

// Convert object to Map
let obj = {
  name: 'Charlie',
  age: 30
};

let mapFromObj = new Map(Object.entries(obj));
console.log(mapFromObj);

// Convert Map to object
let objFromMap = Object.fromEntries(userMap);
console.log(objFromMap);

// Clear map
map.clear();
console.log(map.size); // 0

// PRACTICAL EXAMPLES

// Count occurrences
let words = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
let wordCount = new Map();

for (let word of words) {
  wordCount.set(word, (wordCount.get(word) || 0) + 1);
}

console.log(wordCount);
// Map(3) {"apple" => 3, "banana" => 2, "orange" => 1}

// Cache function results
let cache = new Map();

function expensiveOperation(n) {
  if (cache.has(n)) {
    return cache.get(n);
  }
  
  let result = n * n; // Expensive calculation
  cache.set(n, result);
  return result;
}

console.log(expensiveOperation(5)); // Calculates
console.log(expensiveOperation(5)); // From cache`,
                duration: 40,
                order: 4,
                isPublished: true
            }
        ]);

        console.log('✅ Module 4: Data Structures completed');

        // ============================================
        // MODULE 5: ADVANCED CONCEPTS
        // ============================================
        const module5 = await Module.create({
            course: jsCourse._id,
            title: 'Advanced JavaScript',
            description: 'Classes, JSON, promises, async/await, error handling',
            order: 5,
            isPublished: true
        });

        await Lesson.create([
            {
                module: module5._id,
                course: jsCourse._id,
                title: 'ES6 Classes',
                content: `# JavaScript Classes (ES6)

Classes are templates for creating objects with shared properties and methods.

## Class Declaration

\`\`\`javascript
class ClassName {
  constructor(params) {
    // Initialize properties
  }
  
  method() {
    // Method code
  }
}
\`\`\`

## Constructor

Special method for initializing new instances.

## Methods

Functions defined inside classes.

## Inheritance

Use \`extends\` to inherit from parent class.

\`\`\`javascript
class Child extends Parent {
  constructor(params) {
    super(params); // Call parent constructor
  }
}
\`\`\`

## Static Methods

Methods called on class itself, not instances.

\`\`\`javascript
static methodName() { }
\`\`\`

## Getters and Setters

- \`get\`: Access property
- \`set\`: Modify property with validation`,
                codeExample: `// Basic class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return \`Hello, I'm \${this.name}\`;
  }
  
  haveBirthday() {
    this.age++;
    return \`I'm now \${this.age} years old\`;
  }
}

let alice = new Person('Alice', 25);
console.log(alice.greet()); // "Hello, I'm Alice"
console.log(alice.haveBirthday()); // "I'm now 26 years old"

let bob = new Person('Bob', 30);
console.log(bob.greet()); // "Hello, I'm Bob"

// Inheritance
class Employee extends Person {
  constructor(name, age, jobTitle, salary) {
    super(name, age); // Call parent constructor
    this.jobTitle = jobTitle;
    this.salary = salary;
  }
  
  work() {
    return \`\${this.name} is working as \${this.jobTitle}\`;
  }
  
  // Override parent method
  greet() {
    return \`Hello, I'm \${this.name}, a \${this.jobTitle}\`;
  }
}

let emp = new Employee('Charlie', 28, 'Developer', 75000);
console.log(emp.greet()); // "Hello, I'm Charlie, a Developer"
console.log(emp.work()); // "Charlie is working as Developer"
console.log(emp.haveBirthday()); // Inherited method

// Static methods (called on class, not instance)
class MathHelper {
  static add(a, b) {
    return a + b;
  }
  
  static multiply(a, b) {
    return a * b;
  }
}

console.log(MathHelper.add(5, 3)); // 8
console.log(MathHelper.multiply(4, 6)); // 24

// Getters and Setters
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  
  // Getter
  get area() {
    return this.width * this.height;
  }
  
  // Setter
  set area(value) {
    // Can't directly set area, but can adjust dimensions
    this.width = Math.sqrt(value);
    this.height = Math.sqrt(value);
  }
  
  get perimeter() {
    return 2 * (this.width + this.height);
  }
}

let rect = new Rectangle(10, 5);
console.log(rect.area); // 50 (no parentheses!)
console.log(rect.perimeter); // 30

// Private fields (ES2022)
class BankAccount {
  #balance = 0; // Private field
  
  constructor(initialBalance) {
    this.#balance = initialBalance;
  }
  
  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
    }
  }
  
  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
      return amount;
    }
    return 0;
  }
  
  getBalance() {
    return this.#balance;
  }
}

let account = new Account(1000);
account.deposit(500);
console.log(account.getBalance()); // 1500
// console.log(account.#balance); // ❌ Error: Private field

// Practical example: Todo class
class Todo {
  static nextId = 1;
  
  constructor(title, description) {
    this.id = Todo.nextId++;
    this.title = title;
    this.description = description;
    this.completed = false;
    this.createdAt = new Date();
  }
  
  complete() {
    this.completed = true;
    this.completedAt = new Date();
  }
  
  toggle() {
    this.completed = !this.completed;
  }
  
  toString() {
    let status = this.completed ? '✓' : '○';
    return \`\${status} \${this.title}\`;
  }
}

let todo1 = new Todo('Learn JavaScript', 'Complete JS course');
let todo2 = new Todo('Build Project', 'Create a web app');

console.log(todo1.toString()); // "○ Learn JavaScript"
todo1.complete();
console.log(todo1.toString()); // "✓ Learn JavaScript"

// Class expression
const Animal = class {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    return \`\${this.name} makes a sound\`;
  }
};

let dog = new Animal('Dog');
console.log(dog.speak());`,
                duration: 40,
                order: 1,
                isPublished: true
            },
            {
                module: module5._id,
                course: jsCourse._id,
                title: 'JSON - JavaScript Object Notation',
                content: `# JSON (JavaScript Object Notation)

JSON is a lightweight data format for storing and exchanging data.

## JSON Syntax Rules

- Data in name/value pairs
- Data separated by commas
- Curly braces hold objects
- Square brackets hold arrays
- Keys must be strings (in quotes)
- Values can be: string, number, object, array, boolean, null

## JSON Methods

### JSON.stringify()

Convert JavaScript object to JSON string.

\`\`\`javascript
let jsonString = JSON.stringify(object);
\`\`\`

### JSON.parse()

Convert JSON string to JavaScript object.

\`\`\`javascript
let object = JSON.parse(jsonString);
\`\`\`

## Common Use Cases

- **API Communication**: Send/receive data
- **Local Storage**: Store data in browser
- **Configuration Files**: package.json, tsconfig.json
- **Data Exchange**: Between different systems`,
                codeExample: `// JavaScript object
let user = {
  name: 'Alice',
  age: 25,
  email: 'alice@example.com',
  active: true,
  hobbies: ['reading', 'coding', 'gaming']
};

// Convert to JSON string
let jsonString = JSON.stringify(user);
console.log(jsonString);
// {"name":"Alice","age":25,"email":"alice@example.com","active":true,"hobbies":["reading","coding","gaming"]}

console.log(typeof jsonString); // "string"

// Convert back to JavaScript object
let parsedUser = JSON.parse(jsonString);
console.log(parsedUser);
console.log(typeof parsedUser); // "object"

// Pretty print JSON (with indentation)
let prettyJson = JSON.stringify(user, null, 2);
console.log(prettyJson);
/*
{
  "name": "Alice",
  "age": 25,
  "email": "alice@example.com",
  "active": true,
  "hobbies": [
    "reading",
    "coding",
    "gaming"
  ]
}
*/

// Filtering properties
let filtered = JSON.stringify(user, ['name', 'email']);
console.log(filtered);
// {"name":"Alice","email":"alice@example.com"}

// Transform values
let transformed = JSON.stringify(user, (key, value) => {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  return value;
});
console.log(transformed);

// Complex nested structure
let data = {
  users: [
    { id: 1, name: 'John', role: 'admin' },
    { id: 2, name: 'Jane', role: 'user' }
  ],
  settings: {
    theme: 'dark',
    notifications: true
  },
  timestamp: new Date().toISOString()
};

let jsonData = JSON.stringify(data, null, 2);
console.log(jsonData);

// Parse JSON string
let jsonStr = '{"name":"Bob","score":95,"passed":true}';
let student = JSON.parse(jsonStr);
console.log(student.name); // "Bob"
console.log(student.score); // 95
console.log(student.passed); // true

// Error handling for invalid JSON
let invalidJson = '{name: "Invalid"}'; // Missing quotes

try {
  let parsed = JSON.parse(invalidJson);
} catch (error) {
  console.log('Invalid JSON:', error.message);
}

// Local Storage example
let userPreferences = {
  theme: 'dark',
  fontSize: 16,
  language: 'en'
};

// Save to localStorage
localStorage.setItem('prefs', JSON.stringify(userPreferences));

// Retrieve from localStorage
let savedPrefs = JSON.parse(localStorage.getItem('prefs'));
console.log(savedPrefs);

// Deep clone using JSON (simple objects only)
let original = {
  name: 'Test',
  data: [1, 2, 3],
  nested: { value: 42 }
};

let clone = JSON.parse(JSON.stringify(original));
clone.data.push(4);
console.log(original.data); // [1, 2, 3] (unchanged)
console.log(clone.data); // [1, 2, 3, 4]

// JSON limitations
let problematic = {
  func: function() {}, // Lost in JSON
  date: new Date(),    // Becomes string
  undef: undefined,    // Removed
  symbol: Symbol('s')  // Removed
};

console.log(JSON.stringify(problematic));
// {"date":"2024-02-24T..."}

// API response example
let apiResponse = \`{
  "status": 200,
  "data": {
    "id": 123,
    "username": "developer",
    "followers": 1500
  },
  "message": "Success"
}\`;

let response = JSON.parse(apiResponse);
console.log(response.status); // 200
console.log(response.data.username); // "developer"`,
                duration: 30,
                order: 2,
                isPublished: true
            },
            {
                module: module5._id,
                course: jsCourse._id,
                title: 'Promises & Async JavaScript',
                content: `# Promises and Asynchronous JavaScript

## Asynchronous Programming

Execute long-running operations without blocking code execution.

## Promise

An object representing eventual completion or failure of an async operation.

### States

- **Pending**: Initial state
- **Fulfilled**: Operation completed successfully
- **Rejected**: Operation failed

### Creating Promises

\`\`\`javascript
let promise = new Promise((resolve, reject) => {
  // Async operation
  if (success) resolve(value);
  else reject(error);
});
\`\`\`

### Using Promises

\`\`\`javascript
promise
  .then(result => {})
  .catch(error => {})
  .finally(() => {});
\`\`\`

## async/await (ES2017)

Syntactic sugar for promises.

\`\`\`javascript
async function fetchData() {
  try {
    let result = await promise;
  } catch (error) {
    // Handle error
  }
}
\`\`\``,
                codeExample: `// Creating a promise
let promise = new Promise((resolve, reject) => {
  let success = true;
  
  setTimeout(() => {
    if (success) {
      resolve('Operation successful!');
    } else {
      reject('Operation failed!');
    }
  }, 2000);
});

// Using promise
promise
  .then(result => {
    console.log(result); // "Operation successful!"
  })
  .catch(error => {
    console.log(error);
  });

// Promise chaining
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id: id, name: 'John' });
    }, 1000);
  });
}

function fetchPosts(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['Post 1', 'Post 2', 'Post 3']);
    }, 1000);
  });
}

fetchUser(1)
  .then(user => {
    console.log('User:', user);
    return fetchPosts(user.id);
  })
  .then(posts => {
    console.log('Posts:', posts);
  })
  .catch(error => {
    console.log('Error:', error);
  });

// Promise.all - Wait for all promises
let p1 = Promise.resolve(1);
let p2 = Promise.resolve(2);
let p3 = Promise.resolve(3);

Promise.all([p1, p2, p3])
  .then(results => {
    console.log(results); // [1, 2, 3]
  });

// Promise.race - First settled promise wins
let slow = new Promise(resolve => setTimeout(() => resolve('Slow'), 2000));
let fast = new Promise(resolve => setTimeout(() => resolve('Fast'), 1000));

Promise.race([slow, fast])
  .then(result => {
    console.log(result); // "Fast"
  });

// ASYNC/AWAIT

// Async function returns promise
async function greet() {
  return 'Hello!';
}

greet().then(msg => console.log(msg)); // "Hello!"

// Await pauses execution until promise resolves
async function fetchData() {
  console.log('Fetching...');
  
  let user = await fetchUser(1);
  console.log('User:', user);
  
  let posts = await fetchPosts(user.id);
  console.log('Posts:', posts);
  
  return { user, posts };
}

fetchData();

// Error handling with async/await
async function fetchDataSafe() {
  try {
    let user = await fetchUser(1);
    let posts = await fetchPosts(user.id);
    return { user, posts };
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
}

// Parallel async operations
async function fetchMultiple() {
  // Sequential (slow)
  let user1 = await fetchUser(1);
  let user2 = await fetchUser(2);
  
  // Parallel (fast) ✅
  let [userData1, userData2] = await Promise.all([
    fetchUser(1),
    fetchUser(2)
  ]);
  
  console.log(userData1, userData2);
}

// Real-world example: API fetch
async function getGitHubUser(username) {
  try {
    let response = await fetch(\`https://api.github.com/users/\${username}\`);
    
    if (!response.ok) {
      throw new Error('User not found');
    }
    
    let user = await response.json();
    return user;
  } catch (error) {
    console.log('Error:', error.message);
    return null;
  }
}

// Usage
getGitHubUser('torvalds').then(user => {
  if (user) {
    console.log(\`\${user.name} has \${user.followers} followers\`);
  }
});

// Practical: Loading data with timeout
async function fetchWithTimeout(url, timeout = 5000) {
  let timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Timeout')), timeout);
  });
  
  let fetchPromise = fetch(url);
  
  try {
    let response = await Promise.race([fetchPromise, timeoutPromise]);
    return await response.json();
  } catch (error) {
    console.log('Error:', error.message);
    return null;
  }
}

// Promise-based delay utility
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
  console.log('Start');
  await delay(2000);
  console.log('After 2 seconds');
  await delay(1000);
  console.log('After 3 seconds total');
}

demo();`,
                duration: 45,
                order: 3,
                isPublished: true
            }
        ]);

        console.log('✅ Module 5: Advanced JavaScript completed');

        // ============================================
        // MODULE 6: DOM MANIPULATION
        // ============================================
        const module6 = await Module.create({
            course: jsCourse._id,
            title: 'DOM Manipulation',
            description: 'Master the Document Object Model and event handling',
            order: 6,
            isPublished: true
        });

        await Lesson.create([
            {
                module: module6._id,
                course: jsCourse._id,
                title: 'Introduction to DOM',
                content: `# Document Object Model (DOM)

The DOM is a programming interface for HTML documents. It represents the page so JavaScript can manipulate structure, style, and content.

## What is the DOM?

- Tree structure of HTML elements
- Each element is a **node**
- JavaScript can access and modify nodes

## Document Object

The \`document\` object represents the webpage.

## Selecting Elements

### getElementById()
\`\`\`javascript
let el = document.getElementById('myId');
\`\`\`

### getElementsByClassName()
\`\`\`javascript
let els = document.getElementsByClassName('myClass');
\`\`\`

### getElementsByTagName()
\`\`\`javascript
let els = document.getElementsByTagName('div');
\`\`\`

### querySelector()
\`\`\`javascript
let el = document.querySelector('.myClass');
\`\`\`

### querySelectorAll()
\`\`\`javascript
let els = document.querySelectorAll('div.myClass');
\`\`\`

## Modifying Elements

- \`.textContent\`: Get/set text
- \`.innerHTML\`: Get/set HTML
- \`.style\`: Modify CSS
- \`.classList\`: Manage classes
- \`.setAttribute()\`: Set attributes`,
                codeExample: `// Selecting elements

// By ID
let header = document.getElementById('header');
console.log(header);

// By class name (returns HTMLCollection)
let buttons = document.getElementsByClassName('btn');
console.log(buttons[0]);

// By tag name
let paragraphs = document.getElementsByTagName('p');
console.log(paragraphs.length);

// querySelector (first match)
let firstBtn = document.querySelector('.btn');
let navLink = document.querySelector('#nav .link');

// querySelectorAll (all matches, returns NodeList)
let allBtns = document.querySelectorAll('.btn');
allBtns.forEach(btn => {
  console.log(btn);
});

// Modifying text content
let heading = document.querySelector('h1');
heading.textContent = 'New Heading';
console.log(heading.textContent); // "New Heading"

// Modifying HTML
let container = document.querySelector('.container');
container.innerHTML = '<p>New paragraph</p>';

// Modifying styles
let box = document.querySelector('.box');
box.style.backgroundColor = 'blue';
box.style.color = 'white';
box.style.padding = '20px';
box.style.borderRadius = '8px';

// Managing classes
let element = document.querySelector('.item');

// Add class
element.classList.add('active');

// Remove class  
element.classList.remove('inactive');

// Toggle class
element.classList.toggle('highlighted');

// Check if has class
if (element.classList.contains('active')) {
  console.log('Element is active');
}

// Attributes
let link = document.querySelector('a');

// Get attribute
console.log(link.getAttribute('href'));

// Set attribute
link.setAttribute('href', 'https://example.com');
link.setAttribute('target', '_blank');

// Remove attribute
link.removeAttribute('target');

// Creating elements
let newDiv = document.createElement('div');
newDiv.textContent = 'New div element';
newDiv.classList.add('box');

// Appending to DOM
document.body.appendChild(newDiv);

// Insert before element
let container2 = document.querySelector('.container');
let newP = document.createElement('p');
newP.textContent = 'Inserted paragraph';
container2.insertBefore(newP, container2.firstChild);

// Remove element
let toRemove = document.querySelector('.old');
toRemove.remove(); // Modern way
// toRemove.parentNode.removeChild(toRemove); // Old way

// Traversing DOM
let el = document.querySelector('.child');

// Parent
console.log(el.parentElement);

// Children
let parent = document.querySelector('.parent');
console.log(parent.children); // HTMLCollection
console.log(parent.firstElementChild);
console.log(parent.lastElementChild);

// Siblings
console.log(el.nextElementSibling);
console.log(el.previousElementSibling);

// Practical example: Toggle dark mode
let body = document.body;
let toggleBtn = document.querySelector('#darkModeToggle');

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  
  if (body.classList.contains('dark-mode')) {
    toggleBtn.textContent = 'Light Mode';
  } else {
    toggleBtn.textContent = 'Dark Mode';
  }
});

// Create list from array
let fruits = ['Apple', 'Banana', 'Orange'];
let ul = document.createElement('ul');

fruits.forEach(fruit => {
  let li = document.createElement('li');
  li.textContent = fruit;
  ul.appendChild(li);
});

document.body.appendChild(ul);`,
                duration: 40,
                order: 1,
                isPublished: true
            },
            {
                module: module6._id,
                course: jsCourse._id,
                title: 'Event Handling',
                content: `# JavaScript Event Handling

Events are actions that happen in the browser (clicks, key presses, etc.).

## Common Events

### Mouse Events
- \`click\`: Element clicked
- \`dblclick\`: Double clicked
- \`mouseenter\`: Mouse enters element
- \`mouseleave\`: Mouse leaves element
- \`mousemove\`: Mouse moves over element

### Keyboard Events
- \`keydown\`: Key pressed
- \`keyup\`: Key released
- \`keypress\`: Key pressed (deprecated)

### Form Events
- \`submit\`: Form submitted
- \`change\`: Input value changed
- \`focus\`: Element focused
- \`blur\`: Element loses focus
- \`input\`: Input value changing

### Window Events
- \`load\`: Page fully loaded
- \`resize\`: Window resized
- \`scroll\`: Page scrolled

## Adding Event Listeners

\`\`\`javascript
element.addEventListener('event', function);
\`\`\`

## Event Object

Contains information about the event.

- \`event.target\`: Element that triggered event
- \`event.currentTarget\`: Element with listener
- \`event.preventDefault()\`: Prevent default action
- \`event.stopPropagation()\`: Stop bubbling`,
                codeExample: `// Basic event listener
let button = document.querySelector('#myBtn');

button.addEventListener('click', function() {
  console.log('Button clicked!');
});

// Arrow function
button.addEventListener('click', () => {
  console.log('Button clicked!');
});

// Event object
button.addEventListener('click', (event) => {
  console.log('Event type:', event.type);
  console.log('Target:', event.target);
  console.log('Timestamp:', event.timeStamp);
});

// Mouse events
let box = document.querySelector('.box');

box.addEventListener('mouseenter', () => {
  box.style.backgroundColor = 'lightblue';
});

box.addEventListener('mouseleave', () => {
  box.style.backgroundColor = 'white';
});

box.addEventListener('mousemove', (e) => {
  console.log(\`X: \${e.clientX}, Y: \${e.clientY}\`);
});

// Keyboard events
let input = document.querySelector('#myInput');

input.addEventListener('keydown', (e) => {
  console.log('Key pressed:', e.key);
  console.log('Key code:', e.code);
});

input.addEventListener('keyup', (e) => {
  console.log('Input value:', e.target.value);
});

// Form events
let form = document.querySelector('#myForm');
let nameInput = document.querySelector('#name');

nameInput.addEventListener('focus', () => {
  nameInput.style.borderColor = 'blue';
});

nameInput.addEventListener('blur', () => {
  nameInput.style.borderColor = 'gray';
});

nameInput.addEventListener('input', (e) => {
  console.log('Current value:', e.target.value);
});

form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent page reload
  
  let formData = new FormData(form);
  console.log('Form submitted!');
  console.log('Name:', formData.get('name'));
});

// Event delegation (for dynamic elements)
let list = document.querySelector('#itemList');

list.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    console.log('Clicked:', e.target.textContent);
    e.target.classList.toggle('completed');
  }
});

// Remove event listener
function handleClick() {
  console.log('Clicked');
}

button.addEventListener('click', handleClick);
button.removeEventListener('click', handleClick);

// Multiple events
function logEvent(e) {
  console.log('Event:', e.type);
}

button.addEventListener('click', logEvent);
button.addEventListener('dblclick', logEvent);
button.addEventListener('mouseenter', logEvent);

// Window events
window.addEventListener('load', () => {
  console.log('Page fully loaded');
});

window.addEventListener('resize', () => {
  console.log('Width:', window.innerWidth);
  console.log('Height:', window.innerHeight);
});

window.addEventListener('scroll', () => {
  console.log('Scroll position:', window.scrollY);
});

// preventDefault example
let link = document.querySelector('a');

link.addEventListener('click', (e) => {
  e.preventDefault(); // Don't follow link
  console.log('Link clicked but not followed');
});

// stopPropagation example
let outer = document.querySelector('.outer');
let inner = document.querySelector('.inner');

outer.addEventListener('click', () => {
  console.log('Outer clicked');
});

inner.addEventListener('click', (e) => {
  e.stopPropagation(); // Don't bubble to outer
  console.log('Inner clicked');
});

// PRACTICAL EXAMPLES

// Counter
let countDisplay = document.querySelector('#count');
let incrementBtn = document.querySelector('#increment');
let decrementBtn = document.querySelector('#decrement');
let count = 0;

incrementBtn.addEventListener('click', () => {
  count++;
  countDisplay.textContent = count;
});

decrementBtn.addEventListener('click', () => {
  count--;
  countDisplay.textContent = count;
});

// Todo list
let todoInput = document.querySelector('#todoInput');
let addBtn = document.querySelector('#addTodo');
let todoList = document.querySelector('#todoList');

addBtn.addEventListener('click', () => {
  let text = todoInput.value.trim();
  
  if (text) {
    let li = document.createElement('li');
    li.textContent = text;
    
    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      li.remove();
    });
    
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
    todoInput.value = '';
  }
});

// Color picker
let colorInput = document.querySelector('#colorPicker');
let colorBox = document.querySelector('.colorBox');

colorInput.addEventListener('input', (e) => {
  colorBox.style.backgroundColor = e.target.value;
});`,
                duration: 45,
                order: 2,
                isPublished: true
            }
        ]);

        console.log('✅ Module 6: DOM Manipulation completed');

        console.log('\n🎉 Complete JavaScript Course seeded successfully!');
        console.log(`Total Modules: 6`);
        console.log(`Total Lessons: 30`);
        
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding JavaScript course:', error);
        process.exit(1);
    }
};

seedJavaScriptCourse();

Mutablify Arguments
=========

[![Build Status](https://travis-ci.org/david-szabo97/node-mutablify-args.svg?branch=master)](https://travis-ci.org/david-szabo97/node-mutablify-args) [![Greenkeeper badge](https://badges.greenkeeper.io/david-szabo97/node-mutablify-args.svg)](https://greenkeeper.io/)

A simple function wrapper to allow your arguments to be modified via functions.

## Installation

**Yarn**

`yarn add mutablify-args`

**NPM**

`npm i mutablify-args`

## Usage

The exported function wraps the provided function. The wrapper function will use the first argument as mutators.

Mutators are functions which changes the value of the arguments. Arguments are passed as an array to the mutator function, you must return an array, which will be used as arguments.

Mutator functions are run in sequence.

```javascript
mutablifyArgs(fn, strict)
```

* **fn** this function will be wrapped
* **strict** you can use this argument to disable strict mode (which is enabled by default). In strict mode, the wrapper function will validate the passed mutator functions. If the mutator is not a function, it will throw an error in strict mode. In non-strict mode it continues on.

**Mutator function example:**

```javascript
(args) => args.map(arg => arg + 5)
```

This mutator function will add **5** to all arguments.

## Example

```javascript
const sum = (a, b) => a + b
const mutablifiedSum = mutablifyArgs(sum)

const mutatorAddThreeToA = (args) => [ args[0] + 3, args[1] ]

const a = 5
const b = 5
const originalResult = sum(a, b)
const mutablifiedResult = mutablifiedSum([ mutatorAddThreeToA ], a, b) // 'a' becomes 8

console.log(`Original result: ${originalResult}`) // 10
console.log(`Mutablified result using 'mutatorAddThreeToA': ${mutablifiedResult}`) // 13
```

## Tests

  `npm test`
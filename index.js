function mutablifyArgs (fn, strict = true) {
  if (typeof fn !== 'function') {
    throw TypeError('Argument must be a function')
  }

  return function mutablifyArgsFn (mutators, ...args) {
    if (!Array.isArray(mutators)) {
      throw TypeError('Mutators must be an Array')
    }

    for (const mutator of mutators) {
      if (typeof mutator === 'function') {
        args = mutator(args)
      } else if (strict) {
        throw TypeError('Argument must be a Function')
      }
    }

    return fn.call(this, ...args)
  }
}

module.exports = mutablifyArgs

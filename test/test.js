/* eslint-env mocha */
const mutablifyArgs = require('../')
const expect = require('chai').expect

const sum = (a, b) => a + b

describe('mutablifyArgs()', function () {
  it('should mutate arguments using mutators', function () {
    const mutablifiedFn = mutablifyArgs(sum)

    const a = 5
    const b = 5
    const modifier = 5

    const originalResult = sum(a, b)
    const mutablifiedResult = mutablifiedFn([ (args) => args.map(arg => arg + modifier) ], a, b)

    expect(originalResult).to.be.eq(a + b)
    expect(mutablifiedResult).to.be.eq(a + b + modifier + modifier)
  })

  it('should return error when argument is not a function', function () {
    const err = 'Argument must be a function'

    expect(mutablifyArgs.bind(5)).to.throw(err)
    expect(mutablifyArgs.bind('str')).to.throw(err)
    expect(mutablifyArgs.bind([])).to.throw(err)
  })
})

describe('mutablifyArgsFn()', function () {
  it('should return error when mutators is not an array', function () {
    const mutablifiedFn = mutablifyArgs(sum)

    const err = 'Mutators must be an Array'

    expect(mutablifiedFn.bind(this, 5, 5)).to.throw(err)
    expect(mutablifiedFn.bind(this, () => {}, 5, 5)).to.throw(err)
    expect(mutablifiedFn.bind(this, 'str', 5, 5)).to.throw(err)
  })

  it('should return error when mutator is not a function in strict mode', function () {
    const mutablifiedFn = mutablifyArgs(sum)
    const err = 'Argument must be a Function'

    expect(mutablifiedFn.bind(this, ['string'], 5, 5)).to.throw(err)
    expect(mutablifiedFn.bind(this, [ 5, 2, 3 ], 5, 5)).to.throw(err)
    expect(mutablifiedFn.bind(this, [ () => {}, 'str' ], 5, 5)).to.throw(err)
  })

  it('should not return error when mutator is not a function in non-strict mode', function () {
    const mutablifiedFn = mutablifyArgs(sum, false)
    const err = 'Argument must be a Function'

    expect(mutablifiedFn.bind(this, ['string'], 5, 5)).to.not.throw(err)
    expect(mutablifiedFn.bind(this, [ 5, 2, 3 ], 5, 5)).to.not.throw(err)
    expect(mutablifiedFn.bind(this, [ () => {}, 'str' ], 5, 5)).not.to.throw(err)
  })
})

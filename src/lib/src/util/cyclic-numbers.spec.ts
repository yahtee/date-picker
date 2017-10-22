import {cyclicNumbers} from './cyclic-numbers'

describe(`cyclic-numbers`, () => {

  it(`should create cyclic numbers starting from 0`, () => {
    const actual = cyclicNumbers(0)
    const expected = [0, 1, 2, 3, 4, 5, 6]
    expect(actual).toEqual(expected)
  })

  it(`should create cyclic numbers starting from 6`, () => {
    const actual = cyclicNumbers(6)
    const expected = [6, 0, 1, 2, 3, 4, 5]
    expect(actual).toEqual(expected)
  })

})

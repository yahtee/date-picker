import {firstWeek} from './first-week'

const d = (day: number) => new Date(2017, 4, day)

describe(`firstWeek`, () => {

  it(`should get first row if it exists`, () => {
    const matrix = [
      [d(1), d(2), d(3), d(4), d(5), d(6), d(7)],
      [d(8), d(9), d(10), d(11), d(12), d(13), d(14)],
      [d(15), d(16), d(17), d(18), d(19), d(20), d(21)],
    ]
    expect(firstWeek(matrix)).toEqual(matrix[0])
  })

  it(`should fall through to second row`, () => {
    const matrix = [
      [null, null, d(3), d(4), d(5), d(6), d(7)],
      [d(8), d(9), d(10), d(11), d(12), d(13), d(14)],
      [d(15), d(16), d(17), d(18), d(19), d(20), d(21)],
    ]
    expect(firstWeek(matrix)).toEqual(<any>[d(8), d(9), d(3), d(4), d(5), d(6), d(7)])
  })

})

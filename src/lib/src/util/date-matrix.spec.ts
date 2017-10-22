import {dateMatrix} from './date-matrix'

describe(`date-matrix`, () => {

  it(`should generate a date matrix with most possible weeks`, () => {
    const actual = dateMatrix(new Date(2017, 9, 1), 1)
    const d = (day: number) => new Date(2017, 9, day)
    const expected = [
      [null, null, null, null, null, null, d(1)],
      [d(2), d(3), d(4), d(5), d(6), d(7), d(8)],
      [d(9), d(10), d(11), d(12), d(13), d(14), d(15)],
      [d(16), d(17), d(18), d(19), d(20), d(21), d(22)],
      [d(23), d(24), d(25), d(26), d(27), d(28), d(29)],
      [d(30), d(31)],
    ]
    expect(actual).toEqual(expected as any)
  })

  it(`should generate a data matrix for a month starting on monday`, () => {
    const actual = dateMatrix(new Date(2017, 4, 1), 1)
    const d = (day: number) => new Date(2017, 4, day)
    const expected = [
      [d(1), d(2), d(3), d(4), d(5), d(6), d(7)],
      [d(8), d(9), d(10), d(11), d(12), d(13), d(14)],
      [d(15), d(16), d(17), d(18), d(19), d(20), d(21)],
      [d(22), d(23), d(24), d(25), d(26), d(27), d(28)],
      [d(29), d(30), d(31)],
    ]
    expect(actual).toEqual(expected as any)
  })

})

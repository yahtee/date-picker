// import {startOfMonth, endOfMonth, endOfWeekWithOptions, isBefore, addDays} from 'date-fns/fp'
import {addDays, endOfMonth, endOfWeek, isBefore, startOfMonth} from 'date-fns'
// import * as endOfMonth from 'date-fns/fp/endOfMonth'
// import * as isBefore from 'date-fns/fp/isBefore'
// import * as endOfWeekWithOptions from 'date-fns/fp/endOfWeekWithOptions'
// import * as addDays from 'date-fns/fp/addDays'

export default (date: Date, weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6) => {
  const monthStart = startOfMonth(date)
  const monthEnd = endOfMonth(date)

  const month: (Date | null)[][] = []
  let currDate = monthStart
  while (isBefore(currDate, monthEnd)) {
    month.push([])
    const currWeekEnd = endOfWeek(currDate, {weekStartsOn})
    while (isBefore(currDate, currWeekEnd) && isBefore(currDate, monthEnd)) {
      month[month.length - 1].push(currDate)
      currDate = addDays(currDate, 1)
    }
  }

  const pad = Array.from({length: 7 - month[0].length}).fill(null as any) as any[]
  month[0].unshift(...pad)

  return month
}

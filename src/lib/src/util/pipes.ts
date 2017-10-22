import {Pipe, PipeTransform} from '@angular/core'
import {addDays, addMonths} from 'date-fns'

@Pipe({name: 'tomorrow'})
export class TomorrowPipe implements PipeTransform {
  public transform(date: Date | null): Date | null {
    if (date == null) {
      return null
    } else {
      return addDays(date, 1)
    }
  }
}

@Pipe({name: 'nextMonth'})
export class NextMonthPipe implements PipeTransform {
  public transform(date: Date | null): Date | null {
    if (date == null) {
      return null
    } else {
      return addMonths(date, 1)
    }
  }
}

@Pipe({name: 'addMonths'})
export class AddMonthsPipe implements PipeTransform {
  public transform(date: Date | null, number: number | null): Date | null {
    if (date == null) {
      return null
    } else {
      return addMonths(date, number || 0)
    }
  }
}

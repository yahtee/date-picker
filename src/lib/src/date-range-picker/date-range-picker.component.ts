import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core'
import {isBefore, isSameDay} from 'date-fns'

export type YahteeDateRangePickerBrush = 'start' | 'end'

export interface DateRange {
  start: Date | null,
  end: Date | null,
}

export interface YahteeDateRangePickerContext {
  $implicit: Date
  date: Date
  isToday: boolean
  isDisabled: boolean
  isEnabled: boolean
  isStart: boolean
  isEnd: boolean
  isInsideRange: boolean
  isOutsideRange: boolean
}

@Component({
  selector: 'yahtee-date-range-picker',
  template: `
    <yahtee-dumb-calendar [dateTemplate]="dateTemplate"
                          [displayDate]="displayDate"
                          [weekStartsOn]="weekStartsOn"
                          (dateClick)="onDateClick($event)"
                          (dateMouseEnter)="onDateMouseEnter($event)"
                          (dateMouseLeave)="onDateMouseLeave($event)"
    ></yahtee-dumb-calendar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YahteeDateRangePickerComponent {

  @Input() public dateRange: DateRange = {start: null, end: null}
  @Output() public dateRangeChange = new EventEmitter<DateRange>()
  @Input() public currentBrush: YahteeDateRangePickerBrush

  @Input() public dateTemplate: TemplateRef<YahteeDateRangePickerContext>
  @Input() public dayOfWeekTemplate: TemplateRef<0 | 1 | 2 | 3 | 4 | 5 | 6>

  @Input() public weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 1
  @Input() public displayDate: Date = new Date()

  @Input() public disableDates: Date[] = []
  @Input() public disableAllDatesUntil: Date | null = null
  @Input() public disableAllDatesFrom: Date | null = null
  @Input() public allowEnclosingDisabledDates: boolean = false

  public onDateClick(date: Date): void {

  }

  public onDateMouseEnter(date: Date): void {

  }

  public onDateMouseLeave(date: Date): void {

  }

  public getContextFor(date: Date): YahteeDateRangePickerContext {
    const {start, end} = this.dateRange
    const isSameAs = isSameDay.bind(null, date)

    const isToday = isSameAs(new Date())
    const isDisabled = this.disableDates.some(isSameAs) ||
      (this.disableAllDatesUntil != null && isBefore(date, this.disableAllDatesUntil)) ||
      (this.disableAllDatesFrom != null && isBefore(this.disableAllDatesFrom, date))
    const isStart = isSameAs(start)
    const isEnd = isSameAs(end)
    const isInsideRange = start != null && end != null && isBefore(start, date) && isBefore(date, end)

    return {
      $implicit: date,
      date,
      isToday,
      isDisabled,
      isEnabled: !isDisabled,
      isStart,
      isEnd,
      isInsideRange,
      isOutsideRange: !isInsideRange,
    }
  }

}

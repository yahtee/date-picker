import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core'
import {addMonths, eachDayOfInterval, endOfMonth, isBefore, isSameDay, startOfMonth} from 'date-fns'

export interface DateRange {
  start: Date | null,
  end: Date | null,
}

export interface YahteeDateRangePickerContext {
  isToday: boolean
  isDisabled: boolean
  isEnabled: boolean
  isStart: boolean
  isEnd: boolean
  isInsideRange: boolean
  isOutsideRange: boolean
  isHighlighted: boolean
  isInsidePotentialRange: boolean
}

export interface DateRangePickerStrategy {
  init(this: YahteeDateRangePickerComponent): void
  select(this: YahteeDateRangePickerComponent, date: Date): void
  focus(this: YahteeDateRangePickerComponent, date: Date): void
  blur(this: YahteeDateRangePickerComponent, date: Date): void
}

const START_STRATEGY: DateRangePickerStrategy = {
  init() {},
  select(this: YahteeDateRangePickerComponent, date: Date): void {
    if (!this.isDisabled(date)) {
      this.dateStart = date
    }
  },
  focus(this: YahteeDateRangePickerComponent, date: Date): void {
    this.highlightedDate = date
  },
  blur(this: YahteeDateRangePickerComponent, date: Date): void {
    this.highlightedDate = null
  },
}

export interface AlternatingStrategyContext {
  brush: 'start' | 'end'
}
const ALTERNATING_START_STRATEGY: DateRangePickerStrategy = {
  init(this: YahteeDateRangePickerComponent): void {
    this.context = {brush: 'start'}
  },
  select(this: YahteeDateRangePickerComponent, date: Date): void {
    if (!this.isDisabled(date)) {
      if (this.context.brush == 'start') {
        // I'm expected to click a start date
        this.dateStart = date
        if (this.dateEnd && isBefore(this.dateEnd, this.dateStart)) {
          // Even though I'm expected to click a start date, I've chosen
          // a date which is after the currently chosen end date.
          // This is invalid because end must come after start.
          // So let's just forget about that old end date.
          this.dateEnd = null
        }
        this.context.brush = 'end'
      } else {
        // I'm expected to click an end date
        if (this.dateStart && isBefore(date, this.dateStart)) {
          // Even though I'm expected to click an end date, I've chosen
          // a date which is before the currently chosen start date.
          // This is invalid because end must come after start.
          // So let' treat this as if it was actually a start date
          this.dateStart = date
          // No context change because we expect the user to input end date now.
        } else {
          // I'm expected to click an end date and I've done so.
          this.dateEnd = date
          this.context.brush = 'start'
        }
      }
    }
  },
  focus(this: YahteeDateRangePickerComponent, date: Date): void {
    this.highlightedDate = date
  },
  blur(this: YahteeDateRangePickerComponent, date: Date): void {
    this.highlightedDate = null
  },
}

@Component({
  selector: 'yahtee-date-range-picker',
  template: `
    <yahtee-dumb-calendar *ngFor="let index of calendarCount | range"
                          [dateTemplate]="dateTemplate"
                          [dayOfWeekTemplate]="dayOfWeekTemplate"
                          [dayContexts]="dayContexts"
                          [displayDate]="displayDate | addMonths : index"
                          [weekStartsOn]="weekStartsOn"
                          (dateClick)="onDateClick($event)"
                          (dateMouseEnter)="onDateMouseEnter($event)"
                          (dateMouseLeave)="onDateMouseLeave($event)"
    ></yahtee-dumb-calendar>
  `,
  styles: [`:host {
    display: flex;
  }`],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'yahtee'
})
export class YahteeDateRangePickerComponent implements OnInit {

  @Input() public dateStart: Date | null
  @Input() public dateEnd: Date | null
  @Output() public dateRangeChange = new EventEmitter<DateRange>()

  @Input() public strategy: DateRangePickerStrategy = ALTERNATING_START_STRATEGY

  @Input() public dateTemplate: TemplateRef<YahteeDateRangePickerContext>
  @Input() public dayOfWeekTemplate: TemplateRef<0 | 1 | 2 | 3 | 4 | 5 | 6>

  @Input() public displayDate: Date = new Date()
  @Input() public weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 1
  @Input() public calendarCount: number = 1

  @Input() public disableDates: Date[] = []
  @Input() public disableAllDatesUntil: Date | null = null
  @Input() public disableAllDatesFrom: Date | null = null
  @Input() public allowEnclosingDisabledDates: boolean = false

  public highlightedDate: Date | null
  public potentialRange: DateRange = {start: null, end: null}

  public context: any = null

  public onDateClick(date: Date): void {
    this.strategy.select.call(this, date)
  }

  public onDateMouseEnter(date: Date): void {
    this.strategy.focus.call(this, date)
  }

  public onDateMouseLeave(date: Date): void {
    this.strategy.blur.call(this, date)
  }

  public isDisabled(date: Date): boolean {
    return this.disableDates.some(disabledDate => isSameDay(disabledDate, date)) ||
      (!!this.disableAllDatesUntil && isBefore(date, this.disableAllDatesUntil)) ||
      (!!this.disableAllDatesFrom && isBefore(this.disableAllDatesFrom, date))
  }

  public isInsidePotentialRangeInclusive(date: Date): boolean {
    return !!this.potentialRange.start && !!this.potentialRange.end &&
      (
        (isBefore(this.potentialRange.start, date) && isBefore(date, this.potentialRange.end))
        ||
        isSameDay(this.potentialRange.start, date)
        ||
        isSameDay(this.potentialRange.end, date)
      )
  }

  public getContextFor(date: Date): YahteeDateRangePickerContext {
    const isSameAs = isSameDay.bind(null, date) as (date: Date) => boolean

    const isToday = isSameAs(new Date())
    const isDisabled = this.isDisabled(date)
    const isStart = !!this.dateStart && isSameAs(this.dateStart)
    const isEnd = !!this.dateEnd && isSameAs(this.dateEnd)
    const isInsideRange = this.dateStart != null &&
      this.dateEnd != null &&
      isBefore(this.dateStart, date) &&
      isBefore(date, this.dateEnd)
    const isHighlighted = !!this.highlightedDate && isSameAs(this.highlightedDate)
    const isInsidePotentialRange = this.isInsidePotentialRangeInclusive(date)

    return {
      isToday,
      isDisabled,
      isEnabled: !isDisabled,
      isStart,
      isEnd,
      isInsideRange,
      isOutsideRange: !isInsideRange,
      isHighlighted,
      isInsidePotentialRange,
    }
  }

  public get dayContexts() {
    // TODO: This is run too often
    const dayContexts = new Map<string, YahteeDateRangePickerContext>()
    const [start, end] = [startOfMonth(this.displayDate), endOfMonth(addMonths(this.displayDate, this.calendarCount))]
    eachDayOfInterval({start, end}).forEach(day => {
      const iso = day.toISOString()
      const context = this.getContextFor(day)
      dayContexts.set(iso, context)
    })
    return dayContexts
  }

  public ngOnInit(): void {
    this.strategy.init.call(this)
  }

}

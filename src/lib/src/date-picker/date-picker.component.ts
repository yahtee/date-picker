import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef} from '@angular/core'
import {eachDayOfInterval, endOfMonth, isBefore, isSameDay, startOfMonth} from 'date-fns'

export interface YahteeDatePickerContext {
  isHighlighted: boolean
  isSelected: boolean
}

@Component({
  selector: 'yahtee-date-picker',
  template: `
    <yahtee-dumb-calendar [displayDate]="displayDate"
                          [dayContexts]="dayContexts"
                          [dateTemplate]="dateTemplate"
                          [dayOfWeekTemplate]="dayOfWeekTemplate"
                          [weekStartsOn]="weekStartsOn"
                          (dateClick)="onDateClick($event)"
                          (dateMouseLeave)="onDateMouseLeave($event)"
                          (dateMouseEnter)="onDateMouseEnter($event)"
    ></yahtee-dumb-calendar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YahteeDatePickerComponent implements OnInit, OnChanges {

  @Input() public date: Date | null = null
  @Output() public dateChange = new EventEmitter<Date>()

  @Input() public dateTemplate: TemplateRef<any>
  @Input() public dayOfWeekTemplate: TemplateRef<{ $implicit: 0 | 1 | 2 | 3 | 4 | 5 | 6 }>

  @Input() public displayDate: Date = new Date()
  @Input() public weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 1

  @Input() public disableDates: Date[] = []
  @Input() public disableAllDatesUntil: Date | null = null
  @Input() public disableAllDatesFrom: Date | null = null
  @Input() public allowSelectingDisabledDates: boolean = false

  public hoveredDate: Date | null = null

  public onDateClick(date: Date): void {
      console.log('click on', date)
    if (!this.isDisabled(date)) {
      this.date = date
      this.dateChange.emit(date)
    }
  }

  public onDateMouseEnter(date: Date): void {
    // console.log('mouse enter', date)
    this.hoveredDate = date
    this.cdr.detectChanges()
  }

  public onDateMouseLeave(date: Date): void {
    this.hoveredDate = null
    this.cdr.detectChanges()
  }

  private isDisabled(date: Date): boolean {
    return this.disableDates.some(disabledDate => isSameDay(disabledDate, date)) ||
      (!!this.disableAllDatesUntil && isBefore(date, this.disableAllDatesUntil)) ||
      (!!this.disableAllDatesFrom && isBefore(this.disableAllDatesFrom, date))
  }

  private getContextFor(date: Date): YahteeDatePickerContext {
    const isHighlighted = !!this.hoveredDate && isSameDay(date, this.hoveredDate)
    const isSelected = !!this.date && isSameDay(date, this.date)

    return {
      isHighlighted,
      isSelected,
    }
  }

  public get dayContexts() {
    const dayContexts = new Map<string, YahteeDatePickerContext>()
    const [start, end] = [startOfMonth(this.displayDate), endOfMonth(this.displayDate)]
    eachDayOfInterval({start, end}).forEach(day => {
      const iso = day.toISOString()
      const context = this.getContextFor(day)
      dayContexts.set(iso, context)
    })
    return dayContexts
  }

  constructor(private cdr: ChangeDetectorRef) {
    this.cdr.detach()
  }

  public ngOnInit(): void {
    // this.updateDayContexts()
  }

  public ngOnChanges(s: SimpleChanges): void {
    this.cdr.detectChanges()
  }

}

@Directive({
  selector: 'yahtee-date-picker[formControl],yahtee-date-picker[formControlName]',
})
export class YahteeDatePickerControlValueAccessorDirective {
}

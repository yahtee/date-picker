import {ChangeDetectionStrategy, Component, Directive, EventEmitter, forwardRef, Input, OnInit, Output, Self, TemplateRef} from '@angular/core'
import {addMonths, eachDayOfInterval, endOfMonth, isBefore, isSameDay, startOfMonth} from 'date-fns'
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms'

export interface YahteeDatePickerContext {
  isHighlighted: boolean
  isSelected: boolean
  isToday: boolean
  isDisabled: boolean
}

@Component({
  selector: 'yahtee-date-picker',
  template: `
    <yahtee-dumb-calendar *ngFor="let index of calendarCount | range"
                          [dateTemplate]="dateTemplate"
                          [dayOfWeekTemplate]="dayOfWeekTemplate"
                          [dayContexts]="dayContexts"
                          [displayDate]="displayDate | addMonths : index"
                          [weekStartsOn]="weekStartsOn"
                          [disableOutline]="disableOutline"
                          (dateClick)="onDateClick($event)"
                          (dateMouseLeave)="onDateMouseLeave($event)"
                          (dateMouseEnter)="onDateMouseEnter($event)"
    ></yahtee-dumb-calendar>
  `,
  styles: [`:host {
    display: flex
  }`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YahteeDatePickerComponent {

  @Input() public date: Date | null = null
  @Output() public dateChange = new EventEmitter<Date>()

  @Input() public dateTemplate: TemplateRef<any>
  @Input() public dayOfWeekTemplate: TemplateRef<{ $implicit: 0 | 1 | 2 | 3 | 4 | 5 | 6 }>

  @Input() public displayDate: Date = new Date()
  @Input() public weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 1
  @Input() public calendarCount: number = 1

  @Input() public disableDates: Date[] = []
  @Input() public disableAllDatesUntil: Date | null = null
  @Input() public disableAllDatesFrom: Date | null = null
  @Input() public allowSelectingDisabledDates: boolean = false

  @Input() public disableOutline: boolean

  public hoveredDate: Date | null = null

  public onDateClick(date: Date): void {
    if (!this.isDisabled(date)) {
      this.date = date
      this.dateChange.emit(date)
    }
  }

  public onDateMouseEnter(date: Date): void {
    this.hoveredDate = date
  }

  public onDateMouseLeave(date: Date): void {
    this.hoveredDate = null
  }

  public isDisabled(date: Date): boolean {
    return this.disableDates.some(disabledDate => isSameDay(disabledDate, date)) ||
      (!!this.disableAllDatesUntil && isBefore(date, this.disableAllDatesUntil)) ||
      (!!this.disableAllDatesFrom && isBefore(this.disableAllDatesFrom, date))
  }

  private getContextFor(date: Date): YahteeDatePickerContext {
    const isHighlighted = !!this.hoveredDate && isSameDay(date, this.hoveredDate)
    const isSelected = !!this.date && isSameDay(date, this.date)
    const isToday = !!this.date && isSameDay(date, Date.now())
    const isDisabled = !!this.date && this.isDisabled(date)

    return {
      isHighlighted,
      isSelected,
      isToday,
      isDisabled,
    }
  }

  public get dayContexts() {
    // TODO: This is run too often
    const dayContexts = new Map<string, YahteeDatePickerContext>()
    const [start, end] = [startOfMonth(this.displayDate), endOfMonth(addMonths(this.displayDate, this.calendarCount))]
    eachDayOfInterval({start, end}).forEach(day => {
      const iso = day.toISOString()
      const context = this.getContextFor(day)
      dayContexts.set(iso, context)
    })
    return dayContexts
  }

}

@Directive({
  selector: 'yahtee-date-picker[formControl],yahtee-date-picker[formControlName]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YahteeDatePickerControlValueAccessorDirective),
      multi: true,
    },
  ],
})
export class YahteeDatePickerControlValueAccessorDirective implements ControlValueAccessor, OnInit {

  constructor(@Self() private datePickerCmp: YahteeDatePickerComponent) {
  }

  private onChange = (date: Date): void => {}
  private onTouched = (date: Date): void => {}

  public writeValue(date: Date): void {
    this.datePickerCmp.date = date
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  public ngOnInit(): void {
    this.datePickerCmp.dateChange.subscribe((date: Date) => this.onChange(date))
  }

}

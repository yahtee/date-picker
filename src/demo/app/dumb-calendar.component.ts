import {Component} from '@angular/core'
import {addMonths, eachDayOfInterval} from 'date-fns'

@Component({
  template: `
    <h1>Dumb Calendar</h1>

    <yahtee-dumb-calendar [weekStartsOn]="1"
                          [displayDate]="date"
                          [dayOfWeekTemplate]="dayOfWeekTpl"
                          [dateTemplate]="dateTpl"
                          [dayContexts]="dayContexts"
                          (dateClick)="onClick($event)"
    ></yahtee-dumb-calendar>

    <button type="button" (click)="onPrev()">Previous</button>
    <button type="button" (click)="onNext()">Next</button>

    <div>{{ current }}</div>

    <ng-template #dayOfWeekTpl let-number>{{ number }}</ng-template>

    <ng-template #dateTpl let-date>[{{ date && date.getDate() }}]</ng-template>
  `,
})
export class DumbCalendarDemo {

  date = new Date(2017, 0, 1)
  dayContexts: Map<string, { $implicit: Date }>

  current: Date

  onPrev() {
    this.date = addMonths(this.date, -1)
  }

  onNext() {
    this.date = addMonths(this.date, +1)
  }

  constructor() {
    this.dayContexts = new Map<string, any>()
    const [start, end] = [new Date(2017, 0, 1), new Date(2018, 0, 1)]
    eachDayOfInterval({start, end}).forEach(day => {
      this.dayContexts.set(day.toISOString(), {$implicit: day})
    })
  }

  onClick(date: Date): void {
    this.current = date
  }

}

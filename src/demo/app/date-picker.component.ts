import {Component, Pipe, PipeTransform} from '@angular/core'
import {addDays, addMonths, format} from 'date-fns'
import {FormControl} from '@angular/forms'

@Pipe({name: 'dateFnsFormat'})
export class DateFnsFormatPipe implements PipeTransform {
  public transform(date: Date | null, formatString: string): string {
    if (date == null) {
      return ''
    }
    return format(date, formatString)
  }
}

@Component({
  template: `
    <h1>Date Picker</h1>

    <div>{{ control.value | dateFnsFormat: 'YYYY-MM-DD' }}</div>

    <yahtee-date-picker [displayDate]="displayDate"
                        [dateTemplate]="dateTemplate"
                        [dayOfWeekTemplate]="dayOfWeekTemplate"
                        [formControl]="control"
                        [calendarCount]="2"
    ></yahtee-date-picker>

    <button (click)="prev()">Prev</button>
    <button (click)="next()">Next</button>

    <ng-template #dayOfWeekTemplate let-date>
      {{ date | dateFnsFormat: 'dd' }}
    </ng-template>

    <ng-template #dateTemplate
                 let-date
                 let-isHighlighted="isHighlighted"
                 let-isStart="isStart"
                 let-isEnd="isEnd"
                 let-isToday="isToday"
    >
      <div class="date"
           [class.is-highlighted]="isHighlighted"
           [class.is-selected]="isSelected"
           [class.is-today]="isToday"
      >
        {{ date | dateFnsFormat: 'D' }}
      </div>
    </ng-template>
  `,
  styles: [`
    :host {
      font-size: 1em;
    }

    .date {
      width: 3rem;
      height: 3rem;
      border: 1px solid rgba(0, 0, 0, .1);
      line-height: 3rem;
      text-align: center;
      font-family: Roboto, sans-serif;
    }

    .is-highlighted {
      background-color: yellow;
    }

    .is-selected {
      background-color: tomato;
    }

    .is-today {
      font-weight: bold;
    }
  `],
})
export class DatePickerDemo {
  control = new FormControl(new Date(2017, 9, 1))
  displayDate = new Date()
  next = () => this.displayDate = addMonths(this.displayDate, 1)
  prev = () => this.displayDate = addMonths(this.displayDate, -1)

}

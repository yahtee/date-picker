import {Component, Pipe, PipeTransform} from '@angular/core'
import {addDays, addMonths, format} from 'date-fns'

@Pipe({name: 'dateFnsFormat'})
export class DateFnsFormatPipe implements PipeTransform {
  public transform(date: Date | null, formatString: string): string {
    if (date == null) {
      return ''
    }
    return format(date, formatString)
  }
}

@Pipe({name: 'printDayOfWeek'})
export class DateFnsPrintDayOfWeek implements PipeTransform {
  public transform(number: 0 | 1 | 2 | 3 | 4 | 5 | 6, formatString: string): string {
    const anArbitrarySunday = new Date(2017, 9, 22)
    return format(addDays(anArbitrarySunday, number), formatString)
  }
}

@Component({
  template: `
    <h1>Date Picker</h1>

    <div>{{ date | dateFnsFormat: 'YYYY-MM-DD' }}</div>

    <yahtee-date-picker [displayDate]="displayDate"
                        [dateTemplate]="dateTemplate"
                        [dayOfWeekTemplate]="dayOfWeekTemplate"
                        [(date)]="date"
    ></yahtee-date-picker>

    <button (click)="prev()">Prev</button>
    <button (click)="next()">Next</button>

    <ng-template #dayOfWeekTemplate let-number>
      {{ number | printDayOfWeek: 'dd' }}
    </ng-template>

    <ng-template #dateTemplate
                 let-date
                 let-isHighlighted="isHighlighted"
                 let-isSelected="isSelected"
    >
      <div class="date"
           [class.is-highlighted]="isHighlighted"
           [class.is-selected]="isSelected"
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
      font-weight: bold;
    }
  `],
})
export class DatePickerDemo {
  date: Date
  displayDate = new Date()
  next = () => this.displayDate = addMonths(this.displayDate, 1)
  prev = () => this.displayDate = addMonths(this.displayDate, -1)
}

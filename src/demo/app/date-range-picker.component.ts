import {Component} from '@angular/core';

@Component({
  template: `
    <yahtee-date-range-picker [dateTemplate]="dateTemplate"
                              [dayOfWeekTemplate]="dayOfWeekTemplate"
                              [calendarCount]="3"
                              #yahtee="yahtee"
    ></yahtee-date-range-picker>

    <pre>{{ yahtee.context.brush }}</pre>

    <pre>{{ yahtee.dateStart | dateFnsFormat: 'YYYY-MM-DD' }}</pre>
    <br>
    <pre>{{ yahtee.dateEnd | dateFnsFormat: 'YYYY-MM-DD' }}</pre>

    <button (click)="yahtee.context.brush = 'start'">Pick start</button>
    <button (click)="yahtee.context.brush = 'end'">Pick end</button>

    <ng-template #dayOfWeekTemplate let-day>
      {{ day | date: 'EEE' }}
    </ng-template>

    <ng-template #dateTemplate
                 let-date
                 let-isHighlighted="isHighlighted"
                 let-isSelected="isSelected"
                 let-isToday="isToday"
                 let-isStart="isStart"
                 let-isEnd="isEnd"
                 let-isInsideRange="isInsideRange"
                 let-isOutsideRange="isOutsideRange"
                 let-isInsidePotentialRange="isInsidePotentialRange"
                 let-isDisabled="isDisabled"
                 let-isEnabled="isEnabled"
    >
      <div class="date"
           [class.is-not-null]="date != null"
           [class.is-highlighted]="isHighlighted"
           [class.is-selected]="isSelected"
           [class.is-today]="isToday"
           [class.is-start]="isStart"
           [class.is-end]="isEnd"
           [class.is-inside-range]="isInsideRange"
           [class.is-outside-range]="isOutsideRange"
           [class.is-inside-potential-range]="isInsidePotentialRange"
           [class.is-disabled]="isDisabled"
           [class.is-enabled]="isEnabled"
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

    .is-today {
      font-weight: bold;
    }

    .is-start {
      background-color: blue;
    }

    .is-end {
      background-color: blue;
    }

    .is-inside-range {
      background-color: aquamarine;
    }

    .is-highlighted {
      background-color: yellow
    }
  `],
})
export class DateRangePickerDemo {
}

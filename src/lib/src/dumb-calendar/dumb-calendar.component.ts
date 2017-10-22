import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef} from '@angular/core'
import {dateMatrix} from '../util/date-matrix'
import {cyclicNumbers} from '../util/cyclic-numbers'
import {isSameDay} from 'date-fns'

export type DateContexts = Map<string, { [key: string]: boolean }>

@Component({
  selector: 'yahtee-dumb-calendar',
  template: `

    <table cellspacing="0" cellpadding="0">
      <tr>
        <th *ngFor="let number of cyclicNumbers; trackBy: index">
          <ng-template [ngTemplateOutlet]="dayOfWeekTemplate"
                       [ngTemplateOutletContext]="{$implicit: number}"
          ></ng-template>
        </th>
      </tr>
      <tr *ngFor="let week of dateMatrix; trackBy: index">
        <td *ngFor="let day of week; trackBy: index"
        >
          <!--<pre *ngIf="day">{{ dayContexts.get(day.toISOString()).isHighlighted }}</pre>-->
          <yahtee-date [template]="dateTemplate"
                       [date]="day"
                       [context]="dayContexts.get(day && day.toISOString())"
                       (click)="onClick(day)"
                       (keyup.enter)="onClick(day)"
                       (focus)="onMouseEnter(day)"
                       (mouseenter)="onMouseEnter(day)"
                       (blur)="onMouseLeave(day)"
                       (mouseleave)="onMouseLeave(day)"
          >
          </yahtee-date>
        </td>
      </tr>
    </table>

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YahteeDumbCalendarComponent implements OnInit, OnChanges {

  @Input() public dateTemplate: TemplateRef<any>
  @Input() public dayContexts: DateContexts
  @Input() public dayOfWeekTemplate: TemplateRef<{ $implicit: 0 | 1 | 2 | 3 | 4 | 5 | 6 }>

  @Input() public weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 1
  @Input() public displayDate: Date = new Date()

  @Output() public dateMouseEnter = new EventEmitter<Date>()
  @Output() public dateMouseLeave = new EventEmitter<Date | null>()
  @Output() public dateClick = new EventEmitter<Date>()

  public dateMatrix: (Date | null)[][]

  public updateDateMatrix(): void {
    console.log('updating date matrix')
    this.dateMatrix = dateMatrix(this.displayDate, this.weekStartsOn)
    this.cdr.detectChanges()
  }

  public get cyclicNumbers(): number[] {
    return cyclicNumbers(this.weekStartsOn)
  }

  public onMouseEnter(date: Date | null): void {
    if (date != null) {
      this.dateMouseEnter.emit(date)
    }
  }

  public onMouseLeave(date: Date | null): void {
    if (date != null) {
      this.dateMouseLeave.emit(date)
    }
  }

  public onClick(date: Date | null): void {
    console.log('dumb calendar on click', date)
    if (date != null) {
      this.dateClick.emit(date)
    }
  }

  public index(index: number): number {
    return index
  }

  constructor(private cdr: ChangeDetectorRef) {
    this.cdr.detach()
  }

  ngOnInit() {
  }

  ngOnChanges(s: SimpleChanges) {
    if (s['displayDate'] || s['weekStartsOn'] && this.dayContexts != null) {
      this.updateDateMatrix()
    } else if (s['dayContexts']) {
      this.cdr.detectChanges()
    }
  }

}

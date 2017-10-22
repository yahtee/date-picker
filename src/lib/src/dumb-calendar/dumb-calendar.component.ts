import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core'
import dateMatrix from '../util/date-matrix'

@Component({
  selector: 'yahtee-dumb-calendar',
  templateUrl: './dumb-calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DumbCalendarComponent {

  @Input() public dateTemplate: TemplateRef<any>
  @Input() public context: any

  @Input() public weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 1
  @Input() public displayDate: Date = new Date()

  @Output() public dateMouseEnter = new EventEmitter<Date>()
  @Output() public dateMouseLeave = new EventEmitter<Date>()
  @Output() public dateClick = new EventEmitter<Date>()

  public onMouseEnter(date: Date): void {
    this.dateMouseEnter.emit(date)
  }

  public onMouseLeave(date: Date): void {
    this.dateMouseLeave.emit(date)
  }

  public onClick(date: Date): void {
    this.dateClick.emit(date)
  }

  public trackByIndex(index: number): number {
    return index
  }

  public get dateMatrix(): (Date | null)[][] {
    console.log('date matrix recalculation')
    return dateMatrix(this.displayDate, this.weekStartsOn)
  }

}

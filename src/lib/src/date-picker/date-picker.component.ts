import {Component, EventEmitter, Input, Output} from '@angular/core'

@Component({
  selector: 'yahtee-date-picker',
  template: ``,
})
export class YahteeDatePickerComponent {

  @Input() public date: Date | null = null
  @Output() public dateChange = new EventEmitter<Date>()

  @Input() public weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 1
  @Input() public displayDate: Date = new Date()

  @Input() public disableDates: Date[] = []
  @Input() public disableAllDatesUntil: Date | null = null
  @Input() public disableAllDatesFrom: Date | null = null
  @Input() public allowSelectingDisabledDates: boolean = false

}

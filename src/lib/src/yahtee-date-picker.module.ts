import {NgModule} from '@angular/core'
import {YahteeDateRangePickerComponent} from './date-range-picker/date-range-picker.component'
import {YahteeDatePickerComponent, YahteeDatePickerControlValueAccessorDirective} from './date-picker/date-picker.component'
import {YahteeDumbCalendarComponent} from './dumb-calendar/dumb-calendar.component'
import {CommonModule} from '@angular/common'
import {YahteeDateComponent} from './date/date.component'
import {RangePipe} from './pipes/range.pipe'
import {AddMonthsPipe, NextMonthPipe, TomorrowPipe} from './util/pipes'

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    RangePipe,
    TomorrowPipe,
    NextMonthPipe,
    AddMonthsPipe,

    YahteeDateComponent,
    YahteeDumbCalendarComponent,
    YahteeDatePickerComponent,
    YahteeDateRangePickerComponent,
    YahteeDatePickerControlValueAccessorDirective,
  ],
  exports: [
    YahteeDateComponent,
    YahteeDumbCalendarComponent,
    YahteeDatePickerComponent,
    YahteeDateRangePickerComponent,
    YahteeDatePickerControlValueAccessorDirective,
  ],
})
export class YahteeDatePickerModule {
}

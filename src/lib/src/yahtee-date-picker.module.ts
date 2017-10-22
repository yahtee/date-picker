import {NgModule} from '@angular/core'
import {YahteeDateRangePickerComponent} from './date-range-picker/date-range-picker.component'
import {YahteeDatePickerComponent} from './date-picker/date-picker.component'

@NgModule({
  declarations: [
    YahteeDatePickerComponent,
    YahteeDateRangePickerComponent,
  ],
  exports: [
    YahteeDatePickerComponent,
    YahteeDateRangePickerComponent,
  ],
})
export class YahteeDatePickerModule {
}

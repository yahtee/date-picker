import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {AppComponent} from './app.component'
import {RouterModule} from '@angular/router'
import {YahteeDatePickerModule} from 'yahtee-date-picker'
import {DumbCalendarDemo} from './dumb-calendar.component'
import {DateFnsFormatPipe, DateFnsPrintDayOfWeek, DatePickerDemo} from './date-picker.component'
import {DateRangePickerDemo} from './date-range-picker.component'
import {ReactiveFormsModule} from '@angular/forms'

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/dumb-calendar',
        pathMatch: 'full',
      },
      {
        path: '',
        children: [
          {
            path: 'dumb-calendar',
            component: DumbCalendarDemo,
          },
          {
            path: 'date-picker',
            component: DatePickerDemo,
          },
          {
            path: 'date-range-picker',
            component: DateRangePickerDemo,
          },
        ],
      },
    ]),
    YahteeDatePickerModule,
  ],
  declarations: [
    AppComponent,
    DumbCalendarDemo,
    DatePickerDemo,
    DateRangePickerDemo,
    DateFnsFormatPipe,
    DateFnsPrintDayOfWeek,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}

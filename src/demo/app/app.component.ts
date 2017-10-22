import {Component} from '@angular/core'

@Component({
  selector: 'demo-app',
  template: `
    <nav>
      <ul>
        <li><a routerLink="dumb-calendar">Dumb Calendar</a>
        <li><a routerLink="date-picker">Date Picker</a>
        <li><a routerLink="date-range-picker">Date Range Picker</a>
      </ul>
    </nav>
    <hr>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
}

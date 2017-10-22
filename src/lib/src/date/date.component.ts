import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, SimpleChanges, TemplateRef} from '@angular/core'

function areShallowlyEqualAssumingSameBooleanKeys(a: { [key: string]: boolean } | null,
                                                  b: { [key: string]: boolean } | null): boolean {
  if (a == null || b == null) {
    return false
  } else {
    return Object.keys(a).every(key => a[key] === b[key])
  }
}

export interface YahteeCalendarImplicitContext {
  $implicit: Date
}

export type YahteeCalendarContext<T> = YahteeCalendarImplicitContext & T


@Component({
  selector: 'yahtee-date',
  template: `
    <!--<pre>{{ date && date.getDay() }}</pre>-->
    <ng-template [ngTemplateOutlet]="template"
                 [ngTemplateOutletContext]="mergedContext"
    ></ng-template>
  `,
  host: {
    'tabindex': '0',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YahteeDateComponent {

  @Input() public date: Date
  @Input() public template: TemplateRef<any>
  @Input() public context: YahteeCalendarContext<any>

  public mergedContext: YahteeCalendarContext<any>

  public updateMergedContext() {
    if (this.mergedContext == null || this.context == null) {
      this.mergedContext = {
        $implicit: this.date,
        ...this.context,
      }
    } else {
      this.mergedContext['$implicit'] = this.date
      Object.keys(this.context).forEach(key => this.mergedContext[key] = this.context[key])
    }
    this.cdr.detectChanges()
  }

  constructor(private cdr: ChangeDetectorRef) {
    this.cdr.detach()
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['context']) {
      if (changes['context'].firstChange) {
        this.updateMergedContext()
      } else if (!areShallowlyEqualAssumingSameBooleanKeys(
          changes['context'].previousValue,
          changes['context'].currentValue,
        )) {
        this.updateMergedContext()
      }
    }

    if (changes['date']) {
      this.updateMergedContext()
    }
  }

}

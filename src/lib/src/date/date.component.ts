import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input, SimpleChanges, TemplateRef} from '@angular/core'

function areShallowlyEqualAssumingSameBooleanKeys(a: object, b: object): boolean {
  return Object.keys(a).every(key => a[key] === b[key])
}

export interface YahteeCalendarImplicitContext {
  $implicit: Date
}

export type YahteeCalendarContext<T> = YahteeCalendarImplicitContext & T


@Component({
  selector: 'yahtee-date',
  template: `
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

  public get mergedContext() {
    return {
      ...this.context,
      $implicit: this.date,
    }
  }

  constructor(private cdr: ChangeDetectorRef) {
    this.cdr.detach()
  }

  @HostListener('click') test() {
    console.log('cmoodofasofdiafds')
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['context']) {
      if (changes['context'].firstChange) {
        this.cdr.detectChanges()
      } else if (!areShallowlyEqualAssumingSameBooleanKeys(
          changes['context'].previousValue,
          changes['context'].currentValue,
        )) {
        console.log('cmon', this.date, changes['context'].currentValue)
        this.cdr.detectChanges()
      }
    }

    if (changes['date']) {
      this.cdr.detectChanges()
    }
  }

}

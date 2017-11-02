import {AbstractControl} from '@angular/forms'
import {DateRange} from '../date-range-picker/date-range-picker.component'

export function DateRangePickerValidatorRequired(control: AbstractControl) {
  const value = control.value as DateRange

  if (value == null) {
    return {required: true}
  }

  if (value.start == null || value.end == null) {
    return {required: true}
  }

  return null
}

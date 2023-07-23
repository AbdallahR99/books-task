import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appNumberValidation]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: NumberValidationDirective,
      multi: true,
    },
  ],
  standalone: true
})
export class NumberValidationDirective implements Validator {
  @Input() maxLength = 0;
  @Input() minLength = 0;
  @Input() maxValue = 0;
  @Input() minValue = 0;

  validate(control: AbstractControl<number, number>): ValidationErrors | null {
    const value = control.value;
    if (value === null || value === undefined) {
      return null;
    }
    if (typeof value !== 'number') {
      return { invalidNumber: true };
    }
    if (this.maxLength > 0 && value.toString().length > this.maxLength) {
      control.setValue(+(value.toString().substring(0, this.maxLength)));
    }
    if (this.minLength > 0 && value.toString().length < this.minLength) {
      control.setValue(+(value.toString().padStart(this.minLength, '0')));
    }
    if (this.maxValue > 0 && +value > this.maxValue) {
      control.setValue(this.maxValue);
    }
    if (this.minValue > 0 && +value < this.minValue) {
      control.setValue(this.minValue);
    }
    return null;
  }

}

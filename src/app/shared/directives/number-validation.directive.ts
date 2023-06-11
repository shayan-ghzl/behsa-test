import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appNumberValidation]',
  providers: [{provide: NG_VALIDATORS, useExisting: NumberValidationDirective, multi: true}]
})
export class NumberValidationDirective implements Validator{

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    let status = false;
    if (/^[0-9\u06F0-\u06F9]{3,12}$/.test(control.value)) {
      status = true;
    }
    return (status) ? null : {'numberCustomValidation': 'only numbers are allowed'};
  }
  
}

import { Directive, ElementRef, Input } from '@angular/core';

import { NG_VALIDATORS, Validator, AbstractControl, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appMaxFileSize]',
  providers: [{provide: NG_VALIDATORS, useExisting: MaxFileSizeValidator, multi: true}]
})
export class MaxFileSizeValidator implements Validator {
  @Input('appMaxFileSize') maxFileSize: number;

  constructor(private el: ElementRef) { }

  validate(control: AbstractControl): {[key: string]: any} | null {
    return this.maxFileSize ? maxFileSizeValidate(this.maxFileSize, this.el.nativeElement.files)(control)
                              : null;
  }
}

export function maxFileSizeValidate(maxFileSize: number, files: any): ValidatorFn {
  maxFileSize *= 1024 * 1024; // Transform MB into B
  return (control: AbstractControl): {[key: string]: any} | null => {
    let overLimit = false;
    if (files[0]) {
      overLimit = maxFileSize < files[0].size;
    }
    
    return overLimit ? {'maxFileSize': {value: control.value}} : null;
  };
}

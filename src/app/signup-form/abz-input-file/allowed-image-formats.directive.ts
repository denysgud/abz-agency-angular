import { Directive, ElementRef, Input } from '@angular/core';

import { NG_VALIDATORS, Validator, AbstractControl, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appAllowedImageFormats]',
  providers: [{provide: NG_VALIDATORS, useExisting: AllowedImageFormatsDirective, multi: true}]
})
export class AllowedImageFormatsDirective implements Validator {
  @Input('appAllowedImageFormats') allowedFormats: string[];

  constructor(private el: ElementRef) { }

  validate(control: AbstractControl): {[key: string]: any} | null {
    return this.allowedFormats ? allowedFormatValidate(this.allowedFormats, this.el.nativeElement.files)(control)
                              : null;
  }
}

export function allowedFormatValidate(allowedFormats: string[], files: any): ValidatorFn {  
  return (control: AbstractControl): {[key: string]: any} | null => {
    let forbiddenFormat = false;
    let type;
    let format;
    
    if (files[0]) {
      type = files[0].type.split('/')[0];
      format = files[0].type.split('/')[1];
      
      if (type = 'image') {
        if (allowedFormats.indexOf(format) == -1) {
          forbiddenFormat = true;
        }
      } else {
        forbiddenFormat = true;
      }
    }
    
    return forbiddenFormat ? {'allowedFormat': {value: control.value}} : null;
  };
}

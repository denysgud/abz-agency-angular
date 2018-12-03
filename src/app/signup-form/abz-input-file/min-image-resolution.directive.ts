import { Directive, ElementRef, Input, forwardRef } from '@angular/core';
import { NG_ASYNC_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { Observable } from "rxjs";

@Directive({
  selector: '[appMinImageResolution]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: forwardRef(() => MinImageResolutionDirective), multi: true}]
})
export class MinImageResolutionDirective implements Validator {
  @Input('appMinImageResolution') imageRes: string;

  constructor(private el: ElementRef) { }

  validate( c : AbstractControl ) : Promise<{[key : string] : any}>|Observable<{[key : string] : any}> {
    return this.minImageResValidate(this.imageRes, this.el.nativeElement.files);
  }

  minImageResValidate(maxFileSize: string, files: any) {
    let width = parseInt(maxFileSize.split('x')[0]);
    let height = parseInt(maxFileSize.split('x')[1]);
    let file = files[0];

    return new Observable(observer => {

      if (file && file.type.search(/image/) != -1) {
        let img = new Image();

        img.onload = function (e) {
          if( e['path'][0].width >= width && e['path'][0].height >= height ) {
            observer.next(null);
            observer.complete();
          } else {
            observer.next({minImageResInvalid: true});
            observer.complete();
          }
        };

        img.src = window.URL.createObjectURL(file);
      } else {
        observer.next({minImageResInvalid: true});
        observer.complete();
      }
      
    });
  }
}

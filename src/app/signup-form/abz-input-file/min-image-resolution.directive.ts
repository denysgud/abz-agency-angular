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

        img.onload = function () {
          let self: any = this; // Angular can't compile this.width/this.height
          
          if( self.width >= width && self.height >= height ) {
            
            observer.next(null);
            observer.complete();
          } else {
            observer.next({minImgRes: true});
            observer.complete();
          }
        };

        img.src = window.URL.createObjectURL(file);
      } else {
        observer.next({minImgRes: true});
        observer.complete();
      }
      
    });
  }
}

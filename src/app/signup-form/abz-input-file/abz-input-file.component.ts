import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Renderer2,
  ViewChild,
  ElementRef
} from '@angular/core';
 
import { FormGroup } from '@angular/forms';
import { Subject }    from 'rxjs';

@Component({
  selector: 'app-abz-input-file',
  templateUrl: './abz-input-file.component.html',
  styleUrls: ['./abz-input-file.component.less']
})
export class AbzInputFileComponent implements OnInit, OnDestroy {
  @Input('group') public userForm: FormGroup;
  @Input() parentSubject: Subject<any>;

  maxFileSize: number = 5; // MB
  minImgRes: string = "70x70" // 70px width x 70px height
  allowedFormats: string[] = ['jpeg', 'jpg'];
  
  @ViewChild('inputCont')
  private inputCont: ElementRef;

  constructor(
    private renderer: Renderer2
  ) { }

  
  ngOnInit() {
    this.parentSubject.subscribe(event => {
      // Reset select value
      this.renderer.setProperty(this.inputCont.nativeElement, 'innerText', 'Upload your photo');
    });
  }

  ngOnDestroy() {
    // needed if child gets re-created (eg on some model changes)
    // note that subsequent subscriptions on the same subject will fail
    // so the parent has to re-create parentSubject on changes
    this.parentSubject.unsubscribe();
  }

  inputChanged(e): void {
    let fileName = e.currentTarget.value.split( '\\' ).pop() || 'Upload your photo';
    
    this.renderer.setProperty(this.inputCont.nativeElement, 'innerText', fileName);
    
  }
}

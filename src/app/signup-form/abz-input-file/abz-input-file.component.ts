import {
  Component,
  OnInit,
  Input,
  Renderer2,
  ViewChild,
  ElementRef
} from '@angular/core';
 
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-abz-input-file',
  templateUrl: './abz-input-file.component.html',
  styleUrls: ['./abz-input-file.component.less']
})
export class AbzInputFileComponent implements OnInit {
  @Input('group') public userForm: FormGroup;
  
  @ViewChild('inputCont')
  private inputCont: ElementRef;

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit() {
  }

  inputChanged(e): void {
    let fileName = e.currentTarget.value.split( '\\' ).pop() || 'Upload your photo';
    
    this.renderer.setProperty(this.inputCont.nativeElement, 'innerText', fileName);
  }
}

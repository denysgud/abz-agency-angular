import {
  Component,
  OnDestroy,
  Input,
  ElementRef,
  ViewChild,
  Renderer2,
  HostListener,
  OnInit
} from '@angular/core';

import { FormGroup } from '@angular/forms';
import { Subject }    from 'rxjs';

@Component({
  selector: 'app-abz-select',
  templateUrl: './abz-select.component.html',
  styleUrls: ['./abz-select.component.less']
})
export class AbzSelectComponent implements OnInit, OnDestroy {
  @Input() public options: any[];
  @Input('group') public userForm: FormGroup;
  @Input() private controlName: string;
  @Input() parentSubject: Subject<any>;

  @ViewChild('selectCont')
  private selectCont: ElementRef;
  @ViewChild('selectItems')
  private selectItems: ElementRef;

  private selectItemsHeight: string;
  public selectValue: any;

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.parentSubject.subscribe(event => {
      // Reset select value
      this.renderer.setProperty(this.selectCont.nativeElement, 'innerText', 'Select your position');
    });
  }

  ngOnDestroy() {
    // needed if child gets re-created (eg on some model changes)
    // note that subsequent subscriptions on the same subject will fail
    // so the parent has to re-create parentSubject on changes
    this.parentSubject.unsubscribe();
  }

  toggleSelect(e): void {
    e.stopPropagation();
    this.selectItemsHeight = this.selectItems.nativeElement.scrollHeight + 'px';
    if (this.selectCont.nativeElement.classList.contains('active')) {
      this.closeSelect();
    } else {
      this.openSelect();
    }
  }

  closeSelect(): void {
    if (this.selectCont.nativeElement.classList.contains('active')) {
      this.renderer.removeClass(this.selectCont.nativeElement, 'active');
      this.renderer.removeStyle(this.selectItems.nativeElement, 'max-height');
    }
  }
  
  openSelect(): void {
    this.selectItemsHeight = this.selectItems.nativeElement.scrollHeight + 'px';

    this.renderer.addClass(this.selectCont.nativeElement, 'active');
    this.renderer.setStyle(this.selectItems.nativeElement, 'max-height', this.selectItemsHeight);
  }

  chooseItem(e, value, name): void {
    /* Prevent document click */
    e.stopPropagation();

    /* Get option value */
    this.selectValue = value;
    
    /* Prepare default select */
    this.userForm.get(this.controlName).setValue(this.selectValue);
    this.userForm.get(this.controlName).markAsDirty();
    this.userForm.get(this.controlName).markAsTouched();

    /* Update custom select */
    this.renderer.setProperty(this.selectCont.nativeElement, 'innerText', name);
    this.renderer.addClass(e.currentTarget, 'selected');

    this.closeSelect();
  };

  openCustomSelect(e): void {
    /* Allow only tab */
    if (e.keyCode != '9') {
      e.preventDefault();
    } else {
      this.closeSelect();
    }
    /* If press enter open select menu */
    if (e.keyCode == '13') {
      this.openSelect();
    }

    /* TODO: implement all key codes support */
  }

  /* Close select after click outside element */
  @HostListener("document:click", ["$event"])
  public onClick(event: any): void {
    this.closeSelect();
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { PositionsService } from './positions.service';
import { UsersService } from '../users/users.service';
import { Position } from './positions';

import { Subject }    from 'rxjs';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.less']
})
export class SignupFormComponent implements OnInit {
  @Input() usersComp: any;

  public formSubmitting: boolean = false;
  public formSubmittedSuccess: boolean = false;
  public formSubmittedError: boolean = false;
  public formSubmitAttempt: boolean = false;

  public positions: Position[];
  public userForm = this.fb.group({
    name: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(60)
      ]
    ],
    email: ['', [
        Validators.required,
        Validators.email
      ]
    ],
    phone: ['', [
        Validators.required,
        Validators.pattern(/^[\+]{0,1}380([0-9]{9})$/),
        Validators.maxLength(13)
      ]
    ],
    position_id: ['', [
        Validators.required,
        Validators.pattern(/[0-9]+/),
        Validators.min(1)
      ]
    ],
    photo: ['', [
        Validators.required,
        // appMaxFileSize(5) implemented as directive
        // appMinImageResolution("70x70") implemented as directive
        // appAllowedImageFormats(['jpeg', [jpg]])
      ]
    ],
  });
  private imageToUpload: File;

  // Child components notification
  public parentSubject:Subject<any> = new Subject();

  constructor(
    private positionsService: PositionsService,
    private fb: FormBuilder,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.getPostitions();
  }

  getPostitions(): void {
    this.positionsService.getUsers()
    .subscribe(data => {
      this.positions = data.positions;
    });
  }

  submitForm(): void {
    const formValue = this.userForm.value;
    const formData = new FormData();

    this.userForm.value.position_id = parseInt(this.userForm.value.position_id);
    
    Object.keys(formValue).forEach(function (item) {
      if (item != 'photo') {        
        formData.append(item, formValue[item]);
      }
    });
    
    formData.append('photo', this.imageToUpload);
    
    if (this.userForm.valid) {
      this.formSubmitting = true;
      this.formSubmitAttempt = true;
      this.createUser(formData); 
    }
  }

  createUser(userData): void {
    this.usersService.getToken()
    .subscribe(data => {      
      this.usersService.createtUser(userData, data.token)
      .subscribe(
        data => {
          this.formSubmitting = false;
          this.formSubmittedSuccess = true;

          // reset default form inputs
          this.userForm.reset();
      
          // Notify custom components
          this.notifyChildren();

          // Update users block
          this.usersComp.getUpdatedUsers();
        },
        error => {
          console.log(error);
          
          this.formSubmitting = false;
          this.formSubmittedError = true;
        }
      );
    });
  }

  // Listen image changes
  onImageAdded(file): void {
    this.imageToUpload = file;
  }

  // Child components notification
  notifyChildren() {
    this.parentSubject.next('Form submitted');
  }
}

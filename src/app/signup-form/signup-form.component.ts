import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { PositionsService } from './positions.service';
import { Position } from './positions';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.less']
})
export class SignupFormComponent implements OnInit {
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
        Validators.pattern(/^(\+380)[0-9]{9}/),
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
      ]
    ],
  });

  constructor(
    private positionsService: PositionsService,
    private fb: FormBuilder
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
    console.log(this.userForm.value); 
  }
}

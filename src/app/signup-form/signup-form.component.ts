import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { PositionsService } from './positions.service';
import { Position } from './positions';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.less']
})
export class SignupFormComponent implements OnInit {
  public positions: Position[];
  public userForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    position_id: new FormControl(''),
    photo: new FormControl(''),
  });

  constructor(
    private positionsService: PositionsService
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

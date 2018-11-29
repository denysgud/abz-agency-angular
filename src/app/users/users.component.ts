import { Component, OnInit } from '@angular/core';

import { UsersService } from './users.service';
import { User } from './user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {
  public users: User[];
  public userLoading: boolean = false;
  public maxNumUsers: number;
  private usersPerPage: number = 6;
  private pageToLoad: number = 1;

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.getUsers(this.usersPerPage, this.pageToLoad)
    .subscribe(data => {
      this.users = data.users;
      this.maxNumUsers = data.total_users;
    });
  }

  loadMoreUsers(): void {
    this.userLoading = true;
    this.usersService.getUsers(this.usersPerPage, ++this.pageToLoad)
    .subscribe(data => {
      this.users = this.users.concat(data.users);
      this.maxNumUsers = data.total_users;
      this.userLoading = false;
    });
  }

}

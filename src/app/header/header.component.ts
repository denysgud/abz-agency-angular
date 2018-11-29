import {
  Component,
  OnInit,
  HostListener
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  group,
  query,
  animateChild
} from '@angular/animations';

import { UsersService } from '../users/users.service';
import { User } from '../users/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  animations: [
    trigger('mobMenuBackgroundAnimation', [
      state('open', style({
        backgroundColor: 'rgba(0, 0, 0, .3)',
        pointerEvents: 'auto'
      })),
      state('closed', style({
        backgroundColor: 'rgba(0, 0, 0, 0)'
      })),
      transition('closed => open', [
        group([
          query('@mobMenuAnimation', [
            animateChild()
          ]),
          animate('330ms ease-out'),
        ]),
      ]),
      transition('open => closed', [
        group([
          animate('130ms ease-in'),
          query('@mobMenuAnimation', [
            animateChild()
          ]),
        ]),
      ]),
    ]),
    trigger('mobMenuAnimation', [
      state('open', style({
        transform: 'translateX(0)'
      })),
      state('closed', style({
        transform: 'translateX(-103%)'
      })),
      transition('closed => open', [
        animate('330ms ease-out')
      ]),
      transition('open => closed', [
        animate('130ms ease-in')
      ]),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  public currentUser: User;
  public mobMenuIsOpen: boolean = false;
  private currentUserId: number = 1;
  private windWidth: any;

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.windWidth = window.innerWidth;
    this.getCurrentUser();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windWidth = window.innerWidth;
  }

  getCurrentUser(): void {
    this.usersService.getUser(this.currentUserId)
    .subscribe(data => {
      this.currentUser = data.user;
    });
  }

  toggleMenu(): void {
    if (this.windWidth < 992) {
      this.mobMenuIsOpen = !this.mobMenuIsOpen;
    }
  }
}

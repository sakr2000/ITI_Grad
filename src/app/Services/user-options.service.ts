import { Injectable, OnDestroy, OnInit } from '@angular/core';
interface UserOptions {
  darkMode: boolean;
  lang: string;
  rtl: boolean;
  sideNavHide: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class UserOptionsService implements OnInit, OnDestroy {
  ActiveUser: any;
  ngOnInit(): void {
    this.ActiveUser = JSON.parse(sessionStorage.getItem('user')!);
  }

  getUserData() {
    if (this.ActiveUser) {
      return this.ActiveUser;
    } else if (sessionStorage.getItem('user')) {
      this.ActiveUser = JSON.parse(sessionStorage.getItem('user')!);
      return this.ActiveUser;
    } else {
      return null;
    }
  }

  setUserData(user: any) {
    this.ActiveUser = user;
    sessionStorage.setItem('user', JSON.stringify(this.ActiveUser));
  }
  saveData() {
    if (this.ActiveUser) {
      sessionStorage.setItem('user', JSON.stringify(this.ActiveUser));
    }
  }
  ngOnDestroy(): void {
    this.saveData();
  }
}

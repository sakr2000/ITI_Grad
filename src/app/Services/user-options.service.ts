import { Injectable, OnInit } from '@angular/core';
interface UserOptions {
  darkMode: boolean;
  lang: string;
  rtl: boolean;
  sideNavHide: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class UserOptionsService implements OnInit {
  public userOptions: UserOptions = {
    darkMode: false,
    lang: 'en',
    rtl: false,
    sideNavHide: false,
  };

  ngOnInit(): void {
    if (localStorage.getItem('options')) {
      this.userOptions = JSON.parse(localStorage.getItem('options')!);
    } else {
      this.saveChanges();
    }
  }

  changeProps<T extends keyof UserOptions>(prop: T, value: UserOptions[T]) {
    this.userOptions[prop] = value;
    this.saveChanges();
  }
  saveChanges() {
    localStorage.setItem('options', JSON.stringify(this.userOptions));
  }
}

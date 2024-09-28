import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { GetUser } from '../Models/user.model';
import { FieldPrivilegeDTO } from '../Models/FieldJob';
interface UserOptions {
  darkMode: boolean;
  lang: string;
  rtl: boolean;
  sideNavHide: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class UserDataService implements OnInit, OnDestroy {
  ActiveUser: GetUser | null = null;
  ngOnInit(): void {
    this.ActiveUser = JSON.parse(sessionStorage.getItem('user')!);
  }

  getUserData(): GetUser | null {
    if (this.ActiveUser) {
      return this.ActiveUser;
    } else if (sessionStorage.getItem('user')) {
      this.ActiveUser = JSON.parse(sessionStorage.getItem('user')!);
      return this.ActiveUser;
    } else {
      return null;
    }
  }

  getPrivileges(): FieldPrivilegeDTO[] | null {
    let user = this.getUserData();
    if (user) {
      return user.fieldJob?.fieldPrivilegeDTO ?? null;
    } else {
      return null;
    }
  }

  hasRole(role: string): boolean {
    let user = this.getUserData();
    return user ? user.role.includes(role) : false;
  }

  isAdmin(): boolean {
    return this.hasRole('Admin');
  }

  isSeller(): boolean {
    return this.hasRole('Seller');
  }

  isEmployee(): boolean {
    return this.hasRole('Employee');
  }

  isAgent(): boolean {
    return this.hasRole('Agent');
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

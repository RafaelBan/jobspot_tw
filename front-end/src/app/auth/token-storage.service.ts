import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USER_FIRST_NAME = 'User First Name';
const USER_NAME = 'User Name';
const ROLE = 'Role';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY) || '';
  }

  public saveFirstName(firstName: string) {
    window.sessionStorage.removeItem(USER_FIRST_NAME);
    window.sessionStorage.setItem(USER_FIRST_NAME, firstName);
  }

  public getFirstName(): string {
    return sessionStorage.getItem(USER_FIRST_NAME) || '';
  }

  public saveUserName(username: string) {
    window.sessionStorage.removeItem(USER_NAME);
    window.sessionStorage.setItem(USER_NAME, username);
  }

  public getUserName(): string {
    return sessionStorage.getItem(USER_NAME) || '';
  }

  public saveRole(role: string) {
    window.sessionStorage.removeItem(ROLE);
    window.sessionStorage.setItem(ROLE, role);
  }

  public getRole(): string {
    return sessionStorage.getItem(ROLE) || '';
  }
}

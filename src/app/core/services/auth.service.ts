import { Injectable } from '@angular/core';
import { STORAGE_USER_KEY } from '../const';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private usernameDefault = 'alitour';
    private passwordDefault = '123456';

    constructor(private _router: Router) {
    }

    static isAuthenticated(): boolean {
        return !!localStorage.getItem('user');
    }

    logout(redirect?: boolean): void {
        localStorage.removeItem('user');
        if (redirect) {
            this._router.navigate(['auth/login']);
        }
    }

    authenticate(credentiales: { username: string, password: string }): void {
        if (credentiales.username === this.usernameDefault && credentiales.password === this.passwordDefault) {
            localStorage.setItem(STORAGE_USER_KEY, 'user!!!');
        }
    }
}

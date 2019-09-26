import { Injectable } from '@angular/core';
import { STORAGE_USER_KEY } from '../const';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {IUserAuth} from '../interfaces/user.interface';
import {UserEndpoint} from '../endpoints/user.endpoint';
import {tap} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})

export class AuthService {
    onLogout = new BehaviorSubject<IUserAuth>(AuthService.getAuthUser());

    constructor(private _router: Router, private http: HttpClient) {
    }

    static getToken(): string {
        if (AuthService.isAuthenticated()) {
            return AuthService.getAuthUser().token;
        }
        return null;
    }

    static isAuthenticated(): boolean {
        return !!localStorage.getItem(STORAGE_USER_KEY);
    }

    static setAuhUser(user: IUserAuth): void {
        localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
    }

    static getAuthUser(): IUserAuth {
        if (AuthService.isAuthenticated()) {
            return JSON.parse(localStorage.getItem(STORAGE_USER_KEY));
        } else {
            return null;
        }
    }

    logout(redirect?: boolean): void {
        localStorage.clear();
        this.onLogout.next(null);
        if (redirect) {
            this._router.navigate(['auth/login']);
        }
    }

    authenticate(credentiales: { username: string, password: string }): Observable<IUserAuth> {
        return this.http.post<IUserAuth>(UserEndpoint.authenticate, credentiales)
            .pipe(tap((user) => {
                AuthService.setAuhUser(user);
                this.onLogout.next(user);
            }));
    }
}


// export class AuthService {
//     onLogout = new BehaviorSubject<IUserAuth>(AuthService.getAuthUser());

//     // private usernameDefault = 'alitour';
//     // private passwordDefault = '123456';

//     constructor(private _router: Router) {
//     }

//     static isAuthenticated(): boolean {
//         return !!localStorage.getItem('user');
//     }

//     logout(redirect?: boolean): void {
//         localStorage.clear();
//         if (redirect) {
//             this._router.navigate(['auth/login']);
//         }
//     }

//     authenticate(credentiales: { username: string, password: string }): void {
//         if (credentiales.username === this.usernameDefault && credentiales.password === this.passwordDefault) {
//             localStorage.setItem(STORAGE_USER_KEY, 'user!!!');
//         }
//     }
// }

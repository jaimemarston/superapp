import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { UserEndpoint } from '../endpoints/user.endpoint';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    getUsers(): Observable<Array<IUser>> {
        return this.http.get<Array<IUser>>(UserEndpoint.rest).pipe(
            map(users => {
                users = users.map(u => {
                    if (!u.foto) {
                        u.foto = 'assets/images/avatars/profile.jpg';
                    }
                    return u;
                });
                return users;
            })
        );
    }

    getUser(id: number): Observable<IUser> {
        return this.http.get<IUser>(`${UserEndpoint.rest}${id}/`);
    }

    addUser(user: FormData): Observable<IUser> {
        return this.http.post<IUser>(UserEndpoint.rest, user);
    }

    editUser(id: number, user: FormData): Observable<IUser> {
        return this.http.patch<IUser>(`${UserEndpoint.rest}${id}/`, user);
    }

    deleteUser(id: number): Observable<any> {
        return this.http.delete(`${UserEndpoint.rest}${id}/`);
    }
}

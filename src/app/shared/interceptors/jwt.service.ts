import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthService} from '../../core/services/auth.service';
import {TOKEN_KEY} from '../../core/const';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private router: Router,
                private authService: AuthService) {

    }

    static headerAuthorization(token: string): string {
        return `${TOKEN_KEY} ${token}`;
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = AuthService.getToken();
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: JwtInterceptor.headerAuthorization(token)
                }
            });
        }

        return next.handle(request)
            .pipe(
                tap((event: HttpEvent<any>) => event, (error) => {
                    if (error instanceof HttpErrorResponse) {
                        if (error.status === 401) {
                            this.authService.logout(true);
                        }
                    }
                })
            );
    }
}
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

    constructor(private loginService: LoginService) { }

    /**
     * Automatically add access token for each request
     * 
     * @param req
     * @param next
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('access_token');
        if (token) {
            req = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + token)
            });
        }
        return next.handle(req)
            .pipe(

                // The access token still exists but expires
                catchError(err => {
                    if (err instanceof HttpErrorResponse && err.status === 401) {
                        const refresh_token = localStorage.getItem('refresh_token');
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('refresh_token');

                        // Call the server to refresh token
                        this.loginService.refreshToken(refresh_token)
                            .subscribe(data => {
                                localStorage.setItem('access_token', data['access_token']),
                                localStorage.setItem('refresh_token', data['refresh_token'])
                                return next.handle(req)
                            })
                    } else {
                        return throwError(err);
                    }
                })
            )
    }
}
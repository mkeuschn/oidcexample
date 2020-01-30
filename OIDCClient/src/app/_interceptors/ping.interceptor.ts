import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class PingInterceptor implements HttpInterceptor {

    constructor(public oAuthService: OAuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.oAuthService.hasValidAccessToken() && !request.url.startsWith('http://localhost:5000')) {
            request = request.clone({
                setHeaders: {
                    'Cache-Control': 'no-cache',
                    Pragma: 'no-cache',
                    Authorization: `Bearer ${this.oAuthService.getAccessToken()}`
                    // Authorization: `Bearer ${this.oAuthService.getIdToken()}`
                }
            });
        }
        return next.handle(request);
    }
}

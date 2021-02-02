import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';

import { authCodeFlowConfig } from '../auth.config';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class OidcInterceptor implements HttpInterceptor {

    constructor(public oAuthService: OAuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const issuer = authCodeFlowConfig.issuer ? authCodeFlowConfig.issuer : 'dummy';
        if (this.oAuthService.hasValidAccessToken() && !request.url.startsWith(issuer)) {
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

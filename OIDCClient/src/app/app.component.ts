import { Component } from '@angular/core';
import { OAuthService, JwksValidationHandler, OAuthEvent, OAuthStorage } from 'angular-oauth2-oidc';

import { authConfig } from './authConfig';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent {
    title = 'OIDCClient';

    constructor(private oauthService: OAuthService, private storage: OAuthStorage) {
        this.configure();
    }

    private configure() {
        this.oauthService.configure(authConfig);
        // this.oauthService.setupAutomaticSilentRefresh();
        this.oauthService.tokenValidationHandler = new JwksValidationHandler();

        this.oauthService.loadDiscoveryDocument().then(() => {
            this.oauthService.tryLogin().then(_ => {
                const hasValidAccessToken = this.oauthService.hasValidAccessToken();
                if (!hasValidAccessToken) {
                    this.oauthService.initCodeFlow();
                }
            }).catch(err => {
                console.log(err);
            });
        });

        this.oauthService.events.subscribe(event => {
            if (event instanceof OAuthEvent && event.type === 'token_received') {
                this.oauthService.loadUserProfile().then((userInfo) => {
                    this.storage.setItem('UserInfo', JSON.stringify(userInfo));
                });
            } else {
                console.log(event);
            }
        });
    }
}

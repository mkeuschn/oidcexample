import { Component } from '@angular/core';
import { OAuthService, UserInfo } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';

import { authCodeFlowConfig } from './auth.config';
import { ExtendedUserInfo } from './_models/extended-user-info';
import { UserInfoService } from './_services/user-info.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'oidc-client';

    constructor(private oauthService: OAuthService, private userInfoService: UserInfoService) {
        this.configure();
    }

    private configure() {
        this.oauthService.configure(authCodeFlowConfig);
        this.oauthService.setupAutomaticSilentRefresh();

        this.oauthService.loadDiscoveryDocumentAndLogin();

        // Automatically load user profile
        this.oauthService.events
            .pipe(filter(e => e.type === 'token_received'))
            .subscribe(_ => {
                this.oauthService.loadUserProfile().then((userInfo: UserInfo) => {
                    this.userInfoService.update(new ExtendedUserInfo().deserialize(userInfo));
                });
            });
    }
}

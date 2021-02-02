import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { UserInfoService } from 'src/app/_services/user-info.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    public info: any;

    constructor(private userInfoService: UserInfoService, private oAuthService: OAuthService) { }

    ngOnInit(): void {
        // this.userInfoService.userInfo.subscribe((info) => {
        //     this.info = info;
        // });

        this.info = this.oAuthService.getIdentityClaims();
    }

}

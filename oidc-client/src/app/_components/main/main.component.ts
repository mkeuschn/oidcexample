import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { UserInfoService } from 'src/app/_services/user-info.service';
import { timer } from 'rxjs';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    public timer: any;
    public now: Date;
    public idTokenExpiresIn: any;
    public accessTokenExpiresIn: any;
    public idTokenExpirationDate: Date;
    public accessTokenExpirationDate: Date;

    public info: any;
    public data: any;

    constructor(
        private userInfoService: UserInfoService,
        private oAuthService: OAuthService,
        private httpClient: HttpClient) {
            this.now = new Date();
            this.idTokenExpirationDate = new Date();
            this.accessTokenExpirationDate = new Date();
        }

    ngOnInit(): void {
        this.userInfoService.userInfo.subscribe((info) => {
            this.info = info;
        });

        // this.info = this.oAuthService.getIdentityClaims();
        this.oberserableTimer();
    }

    ngOnDestroy() {
        this.timer.unsubscribe();
    }

    public reload() {
        this.httpClient.get(`http://localhost:9000/weatherforecast`).subscribe(resp => {
            this.data = resp;
        }, error => {
            console.log(error);
        });
    }

    oberserableTimer() {
        const source = timer(0, 1000);
        this.timer = source.subscribe(val => {
            this.now = new Date();
            this.idTokenExpirationDate = new Date(this.oAuthService.getIdTokenExpiration());
            this.accessTokenExpirationDate = new Date(this.oAuthService.getAccessTokenExpiration());
            this.idTokenExpiresIn = this.diff(this.idTokenExpirationDate.getTime(), this.now.getTime());
            this.accessTokenExpiresIn = this.diff(this.oAuthService.getAccessTokenExpiration(), this.now.getTime());
        });
    }

    diff(first: number, second: number): string {
        const milliseconds = first-second;
        const totalSeconds = Math.floor(milliseconds / 1000);
        const seconds = totalSeconds % 60;
        const minutes = Math.floor(totalSeconds / 60) % 60;
        const hours = Math.floor(totalSeconds / 3600);
        return `${("00" + hours).slice(-2)}:${("00" + minutes).slice(-2)}:${("00" + seconds).slice(-2)}`
    }
}

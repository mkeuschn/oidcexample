import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OAuthService, OAuthEvent } from 'angular-oauth2-oidc';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {

    public data: any;

    public editor: any;
    public editorOptions = {language: 'javascript', formatOnPaste: true};
    public code: any;

    constructor(private httpClient: HttpClient, private oauthService: OAuthService) {
        this.data = { some: 'field' };
        this.oauthService.events.subscribe(event => {
            if (event instanceof OAuthEvent && event.type === 'token_received') {
                this.reload();
            }
        });
    }

    ngOnInit() {
        if (this.oauthService.hasValidAccessToken()) {
            this.reload();
        }
    }

    public reload() {
        this.httpClient.get(`http://localhost:9000/weatherforecast`).subscribe(resp => {
            this.data = resp;
        }, error => {
            console.log(error);
        });
    }
}

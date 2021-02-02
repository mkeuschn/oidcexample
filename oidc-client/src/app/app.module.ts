import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { OAuthModule } from 'angular-oauth2-oidc';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './_interceptors';
import { MainComponent } from './_components/main/main.component';
import { UserInfoService } from './_services/user-info.service';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        OAuthModule.forRoot()
    ],
    providers: [
        httpInterceptorProviders,
        UserInfoService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

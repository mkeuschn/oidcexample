import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OAuthModule } from 'angular-oauth2-oidc';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { httpInterceptorProviders } from './_interceptors';
import { MainComponent } from './_components/main/main.component';
import { FormsModule } from '@angular/forms';

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
        httpInterceptorProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInfo } from 'angular-oauth2-oidc';
import { ExtendedUserInfo } from '../_models/extended-user-info';

@Injectable()
export class UserInfoService {
    private subject: BehaviorSubject<ExtendedUserInfo> = new BehaviorSubject<ExtendedUserInfo>(new ExtendedUserInfo());

    public userInfo: Observable<ExtendedUserInfo> = this.subject.asObservable();

    constructor() {}

    public update(userInfo: ExtendedUserInfo) {
        this.subject.next(userInfo);
    }
}

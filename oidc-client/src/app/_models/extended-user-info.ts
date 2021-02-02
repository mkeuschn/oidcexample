import { UserInfo } from 'angular-oauth2-oidc';
import { Deserializable } from './deserializable.model';

export class ExtendedUserInfo implements UserInfo, Deserializable {

    public sub: string;

    constructor() {
        this.sub = '';
    }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

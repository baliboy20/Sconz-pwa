import {Injectable} from '@angular/core';

import * as Parse from 'parse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // @ts-ignore
  user: Parse.User = undefined;
  constructor() {
  }

  async signIn(creds: { pw: string, email: string }): Promise<any> {
    return Parse.User.logIn(creds.email, creds.pw)
      .then(a => this.user = a );
  }

  async addUser(creds: { email: string, pw: string }): Promise<any> {
    try {
      const user = new Parse.User();
      user.set('username', creds.email);
      user.set('password', creds.pw);
      user.set('email', creds.email);
      user.set('phone', '07412367761');
      const result = await user.signUp({});
      return result;
    } catch (err) {
      console.log('SignUp Error', err.message);
    }
  }

  isSignedIn(): boolean {

    const retval = this.user !== undefined && this.user.authenticated();
    console.log('is signed in ', retval);
    return retval;
  }

  async signOut(): Promise<any> {
    return Parse.User.logOut();
  }
}

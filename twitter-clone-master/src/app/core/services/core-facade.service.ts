import { isEmptyData } from '../../shared/utils/common.utils';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CoreActions from '../store/auth/auth-store.actions';
import * as CoreSelectors from '../store/auth/auth-store.selectors';
import * as ProfileActions from '../store/profile/profile-store.actions';
import * as ProfileSelectors from '../store/profile/profile-store.selectors';
import { IAuth } from '../models/auth.model';
import { UserProfile } from '../models/user-profile.model';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CoreFacadeService {

  constructor(private store: Store<any>, private http: HttpClient, private cookieService: CookieService) { }

  callLoginWithGoogle() {
    this.store.dispatch(CoreActions.loginUserWithGoogle());
    this.store.select(CoreSelectors.selectAuthInfo).subscribe(user => {
      if (user && user.email) {
        this.cookieService.set('userEmail', user.email);
      }
    });
  }
  getUserAuthInfo() {
    this.store.dispatch(CoreActions.fetchAuthInfo());
  }

  getCurrentUserInfo() {
    return this.store.select(CoreSelectors.selectAuthInfo);
  }

  isValidUser(user: IAuth) {
    return !isEmptyData(user?.id);
  }

  logoutUser() {
    this.store.dispatch(CoreActions.logoutUser());
  }

  createProfile(profile: UserProfile) {
    this.store.dispatch(ProfileActions.createProfile({ data: profile }));
  }

  getUserProfile() {
    return this.store.select(ProfileSelectors.selectUserInfo);
  }

  registerWithEmailPassword(userInfo: { email: string, password: string }) {
    this.store.dispatch(CoreActions.registerUserWithEmailPassword({ data: userInfo }));
  }

  loginWithEmailPassword(userInfo: { email: string, password: string }) {
    this.store.dispatch(CoreActions.loginUserWithEmailPassword({ data: userInfo }));
    localStorage.setItem('userEmail', userInfo.email);
  }

  private apiUrl = 'https://susacalender.el.r.appspot.com/api/user/signup';



  signupUser(email: string, displayName: string): Observable<any> {
    const body = { email, userName: displayName, isVerified: true };
    return this.http.post(this.apiUrl, body).pipe(
      catchError(error => {
        console.error('Error during sign up:', error);
        return throwError(() => new Error('Error during sign up'));
      })
    );
   }

}

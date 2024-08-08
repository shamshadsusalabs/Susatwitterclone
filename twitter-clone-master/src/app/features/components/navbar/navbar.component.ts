import { FeatureFacadeService } from '../../services/feature-facade.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTwitter, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { faBell, faCaretDown, faEnvelope, faHashtag, faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'twitter-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  faTwitter: IconDefinition = faTwitter;
  faHome: IconDefinition = faHome;
  faCalendar: IconDefinition = faHashtag;
  faMessage: IconDefinition = faEnvelope;
  faNotification: IconDefinition = faBell;
  faDropdown: IconDefinition = faCaretDown;
  faAccount: IconDefinition = faUser;

  userProfile$ = this.featureFacade.getUserProfile();

  constructor(private featureFacade: FeatureFacadeService,private cookieService: CookieService) { }

  ngOnInit(): void {
  }



  logoutUser() {
    this.featureFacade.logoutUser();
  }

  onErrorImageUrl(target: any, displayName: any) {
     const api = `https://ui-avatars.com/api/?name=${displayName}&background=0D8ABC&color=fff&size=128&rounded=true&bold=true&font-size=0.5';`
    target.src = api;
  }







  onclick() {
    const userEmail = this.cookieService.get('userEmail');
    if (!userEmail) {
      console.error('No email found in cookies');
      return;
    }

    window.location.href = `https://melodic-arcadia-417919.web.app/googleSigIn/login?email=${encodeURIComponent(userEmail)}`;
  }
}

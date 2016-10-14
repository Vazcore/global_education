import { Component } from '@angular/core';
import { PageService } from '../../pages/page.service';
import { LoginService } from '../../pages/login/login.service';

@Component({
  selector: 'ag-header',
  templateUrl: './header.html'
})
export class Header {
  pageService: PageService;
  loginService: LoginService;
  pageInfo: Object = {};
  loggedIn: Boolean = false;

  constructor(_pageS: PageService, _loginS: LoginService
  ) {
    this.loginService = _loginS;
    this.pageService = _pageS;

    this.loggedIn = this.loginService.isLoggedIn();

    // stream for navigation changes => trigger navigate method
    _pageS.getPageChanger()
    .subscribe(pageInfo => {
      this.pageInfo = pageInfo;
    });

    // stream for changes in token
    this.loginService.getTokenStream()
    .subscribe(({action}) => {
      this.loggedIn = this.loginService.isLoggedIn(); 
    });
  }

  logout() {
    this.loginService.logout();
  }

}
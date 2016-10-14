import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { config } from '../../app/app.config';
import { LoginService } from '../login/login.service';
import { LoginPage } from '../login/login';
import { PageService } from '../page.service';
import { Navigation } from '../../app/navigation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public nav:NavController;
  public loginService: LoginService;
  public pageService: PageService;
  public pageInfo: Object = {
    title: "Home",
    description: "It's a Home Page"
  };
  constructor(public navCtrl: NavController, _loginS: LoginService,
    _pageS: PageService, _nav: Navigation
  ) {
    this.loginService = _loginS;
    this.nav = navCtrl;
    _nav.init(navCtrl);
    this.pageService = _pageS;
  }
  ngOnInit() {
    if(!this.loginService.getToken()) {
      this.nav.setRoot(LoginPage);
    } else {
      this.pageService.setPage(this.pageInfo);
    }
  }
}

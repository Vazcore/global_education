import { Component, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginService } from './login.service';
import { HomePage } from '../home/home';
import { PageService } from '../page.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public loginService: LoginService;
  public navCtrl: NavController;
  private pageInfo: Object = {
    title: 'Login',
    description: 'Login Page'
  };
  constructor(public loginS: LoginService, _navCtrl: NavController,
  _pageS: PageService) {
    this.loginService = loginS;
    this.navCtrl = _navCtrl;
    _pageS.setPage(this.pageInfo);
    if (loginS.getToken()) {
      _navCtrl.setRoot(HomePage);
    }
  }
  login(loginE: String, passE: String) {
    this.loginService.login(loginE.value, passE.value)
    .subscribe(({action}) => {
      if (action === 'login') {
        this.navCtrl.setRoot(HomePage);
      }      
    });
  }
}
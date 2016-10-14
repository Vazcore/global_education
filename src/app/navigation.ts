import { EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

export class Navigation {
  private navCtrl: NavController;
  private navUpdated: EventEmitter<any>; 
  
  init(navCtrl: NavController) {
    this.navCtrl = navCtrl;
    this.navUpdated = new EventEmitter();
  }

  navigate({type, path}) {
    if (type === 'next') {
      switch(path) {
        case 'home':
          this.navCtrl.push(HomePage);
          break;
      }
    } else if (type === 'root') {
      switch(path) {
        case 'home':
          this.navCtrl.setRoot(HomePage);
          break;
        case 'login':
          this.navCtrl.setRoot(LoginPage);
          break;
      }
    }
  }

}
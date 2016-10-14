import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { TabsPage } from '../pages/tabs/tabs';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { LoginService } from '../pages/login/login.service';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { PageService } from '../pages/page.service';
import { Navigation } from './navigation';

@Component({
  templateUrl: 'app.html',
  providers: [Navigation]
})
export class MyApp {
  rootPage = HomePage;
  pageInfo: Object = {};

  constructor(platform: Platform, _nav: Navigation, _pageS: PageService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });

    _pageS.getNavStream().subscribe(navInfo => {      
      _nav.navigate(navInfo);
    });

  }
}

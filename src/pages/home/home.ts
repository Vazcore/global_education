import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { config } from '../../app/app.config';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  config:Object = config;
  constructor(public navCtrl: NavController) {

  }

}

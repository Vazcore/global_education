import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { PageService } from '../page.service';
import { config } from '../../app/app.config';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
  private token: String;
  private http: Http;
  public tokenUpdated: EventEmitter<any>;
  pageService: PageService;
  navStream: EventEmitter<any>;
  
  constructor(public httpP: Http, _pageS: PageService) {
    this.http = httpP;
    this.tokenUpdated = new EventEmitter();
    this.pageService = _pageS;
    this.navStream = _pageS.getNavStream();
  }

  getTokenStream(): EventEmitter<any> {
    return this.tokenUpdated;
  }

  getToken(): String {
    this.token = localStorage.getItem('token');    
    return this.token;
  }

  setToken(token: String): String {
    this.token = token;
    localStorage.setItem('token', token);
    return this.token;
  }

  login(login: String, pass: String) {
    this.http.post(config.host + '/authenticate', {
      name: login,
      password: pass
    })
    .map(res => res.json())
    .subscribe(data => {
      if (data.success === true && data.token) {
        this.setToken(data.token);
        this.tokenUpdated.emit({action: 'login', value: this.getToken()});
      }
    });

    return this.tokenUpdated;
  }

  isLoggedIn() {
    return this.getToken() !== null && this.getToken() !== undefined; 
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token');
    this.tokenUpdated.emit({action: 'logout'});
    this.pageService.navigate({
      type: 'root',
      path: 'login'
    });
  }

}
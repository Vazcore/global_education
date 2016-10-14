import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class PageService {
  private pageInfo: Object;
  private pageUpdated: EventEmitter<any>;
  private navUpdated: EventEmitter<any>;

  constructor() {
    this.pageUpdated = new EventEmitter();
    this.navUpdated = new EventEmitter();
  }

  getPageChanger(): EventEmitter<any> {
    return this.pageUpdated;
  }

  getPage(): Object {
    return this.pageInfo;
  }

  setPage(page: Object) {
    this.pageInfo = page;
    this.pageUpdated.emit(this.pageInfo);
  }
  
  navigate(nav) {
    this.navUpdated.emit(nav);
  }

  getNavStream(): EventEmitter<any> {
    return this.navUpdated;
  }

}
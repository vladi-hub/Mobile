import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the EventLocalStorage provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EventLocalStorage {

  constructor(public http: Http) {
    console.log('Hello EventLocalStorage Provider');
  }

  saveEventsToLocalStorage(events : any) {
    window.localStorage.setItem('events', JSON.stringify(events));
  }

  getEventsFromLocalStorage() : any | null {
    
    if(window.localStorage.getItem('events')) {
      return JSON.parse(window.localStorage.getItem('events'));
    }
    else return null;
    
  }
}
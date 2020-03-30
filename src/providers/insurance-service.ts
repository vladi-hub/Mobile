import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the InsuranceService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class InsuranceService {

  constructor(public http: Http) {}

  getInsuranceData(telephone : string) : Observable<any>{
    console.log('Getting data');
    return Observable.create((observer : Observer<string>) => {
      observer.next('null');
    })
  }

}

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { InsuranceService } from '../providers/insurance-service'

import { CalendarEvent } from '../objects/calendar-event'

/*
  Generated class for the InsuranceServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class InsuranceServiceProvider extends InsuranceService{

  calendarEvents : Array<CalendarEvent>;
  
  //test phone: 0888901325, 'http://insys.smartfinbg.com/app_connect.php?tel={%22Telephone%22:%220888901325%22}'
  eventsUrlBeginning : string = 'http://insys.smartfinbg.com/app_connect.php?tel={%22Telephone%22:%22';
  eventsUrlEnd : string = '%22}';

  constructor(public http : Http) {
    super(http);
  }

  getInsuranceData(telephone : string) : Observable<Response>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.eventsUrlBeginning + telephone + this.eventsUrlEnd, options);
  }


}

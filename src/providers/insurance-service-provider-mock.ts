import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { InsuranceService } from '../providers/insurance-service'

import { CalendarEvent } from '../objects/calendar-event'

/*
  Generated class for the InsuranceServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class InsuranceServiceProviderMock extends InsuranceService{

  calendarEvents : Array<CalendarEvent>;

  getInsuranceData(telephone : string) : Observable<string>{
    return Observable.create((observer: Observer<string>) => {
      this.calendarEvents = new Array();
      this.calendarEvents.push(new CalendarEvent(new Date, "InsType", "RegPlate"));
      this.calendarEvents.push(new CalendarEvent(new Date, "InsType", "RegPlate"));
      this.calendarEvents.push(new CalendarEvent(new Date, "InsType", "RegPlate"));
      // this.calendarEvents.push(new CalendarEvent('Event2', '', '', new Date(), new Date()));
      // this.calendarEvents.push(new CalendarEvent('Event3', '', '', new Date(), new Date()));

      observer.next(JSON.stringify(this.calendarEvents));
    })
  }


}

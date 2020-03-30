import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import { Calendar, CalendarOptions } from 'ionic-native';
import { CalendarEvent } from '../../objects/calendar-event'

import { InsuranceService } from '../../providers/insurance-service'
import { EventLocalStorage } from '../../providers/event-local-storage'

/*
  Generated class for the CalendarEventsList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-calendar-events-list',
  templateUrl: 'calendar-events-list.html'
})
export class CalendarEventsListPage {

  events: Array < CalendarEvent >;

  calOptions : CalendarOptions;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public insuranceService: InsuranceService, public eventLocalStorage: EventLocalStorage) {

    if (this.navParams.get('events')) {
      console.log(this.navParams.get('events'));

      let responseEvents = JSON.parse(this.navParams.get('events').trim());

      this.parseResponseEvents(responseEvents);
      this.eventLocalStorage.saveEventsToLocalStorage(responseEvents);

      console.log(this.events[0].getDateString());
    }

    this.calOptions = Calendar.getCalendarOptions();
    
    //set the reminders to 3 days and 1 day
    this.calOptions.firstReminderMinutes = 3 * 24 * 60;
    this.calOptions.secondReminderMinutes = 1 * 24 * 60;

  }


  ionViewDidLoad() {
    let lastSync: string = '';

    console.log((new Date()).toISOString());

    // window.localStorage.removeItem('lastSync');

    if (lastSync = window.localStorage.getItem('lastSync')) {
      // console.log("Last sync: ", lastSync);
      // console.log("Now: ", (new Date()).getTime());
      // console.log("Last sync ms: ", (new Date(lastSync)).getTime());
      
      let diff = Math.abs((new Date()).getTime() - (new Date(lastSync)).getTime());
      console.log("Diff: ", diff);
      
      //7 * 24 * 60 * 60 * 1000 = milliseconds in a week
      if (diff > 7 * 24 * 60 * 60 * 1000) {
        this.sync();
        console.log("Syncing");
      } else {
        this.loadEventsFromLocalStorage();
      }
    } else {
      this.sync();
      console.log("Syncing");
    }
  }
  
  syncManually() {
    this.sync();
  }

  sync() {
    this.insuranceService.getInsuranceData(window.localStorage.getItem('phoneNumber')).subscribe(
      (response: Response) => {
        console.log(response);
        console.log(JSON.parse(response.text().trim()));

        let responseEvents = JSON.parse(response.text().trim());
        responseEvents.push(Object.assign({}, (responseEvents[0])));
        responseEvents.push(Object.assign({}, (responseEvents[0])));
        responseEvents[1].InsType = "Event_1";
        responseEvents[2].InsType = "Event_2";        

        this.parseResponseEvents(responseEvents);
        this.eventLocalStorage.saveEventsToLocalStorage(responseEvents);

        let lastSync : Date = (new Date());
        window.localStorage.setItem('lastSync', lastSync.toISOString());
      }
    )
  }

  parseResponseEvents(responseEvents: any) {
    this.events = new Array();

    // let promises = new Array<Promise<any>>();

    for (let event of responseEvents) {
      let cev: CalendarEvent = new CalendarEvent(new Date((event.EndDate.split(" "))[0]), event.InsType, event.RegPlate);

      this.events.push(cev);
      
      // promises.push(Calendar.findEvent(cev.InsType, "", cev.RegPlate, cev.EndDate, cev.EndDate));

      // Calendar.findEvent(cev.InsType, "", cev.RegPlate, cev.EndDate, cev.EndDate).then(
      //   (msg) => {console.log("EVENT:", JSON.stringify(cev)); cev.isInCalendar = true;}
      // );

    }

    this.findEventsRecursively(0);
  }

  loadEventsFromLocalStorage() {
    this.events = new Array();

    let responseEvents = this.eventLocalStorage.getEventsFromLocalStorage();

    if (responseEvents) {
      for (let event of responseEvents) {
        let cev: CalendarEvent = new CalendarEvent(new Date((event.EndDate.split(" "))[0]), event.InsType, event.RegPlate);
        cev.isInCalendar = event.isInCalendar;
        this.events.push(cev);
      }

      this.findEventsRecursively(0);
    }
  }


  addAllEvents() {
    this.addEventsToCalendarRecursively(0);

    // this.events.forEach((event: CalendarEvent, index, array) => {
    //   // event.isInCalendar = true;
    //   Calendar.createEvent(event.InsType, "", event.RegPlate, event.EndDate, event.EndDate).then(
    //     (msg) => {
    //       console.log(msg);
    //       event.isInCalendar = true;
    //     }, (err) => {
    //       console.log(err);
    //     });
    // });

  }

  removeAllEvents() {
    this.removeEventsFromCalendarRecursively(0);
    // this
    //   .events
    //   .forEach((event: CalendarEvent, index, array) => {
    //     // event.isInCalendar = false;
    //     Calendar
    //       .deleteEvent(event.InsType, "", event.RegPlate, event.EndDate, event.EndDate)
    //       .then((msg) => {
    //         console.log(msg);
    //         event.isInCalendar = false;
    //       }, (err) => {
    //         console.log(err);
    //       });

    //   });
  }

  addEventToCalendar(index: number) {
    let event = this.events[index];
    Calendar
      .createEventWithOptions(event.InsType, "", event.RegPlate, event.EndDate, event.EndDate, this.calOptions)
      .then((msg) => {
        console.log(msg);
        event.isInCalendar = true;
        console.log(JSON.stringify(event));
      }, (err) => {
        console.log(err);
      });
  }

  addEventsToCalendarRecursively(index : number) : Promise<any> {
    if(index < this.events.length) {
      let event = this.events[index];
      let self = this;
      return Calendar
        .createEventWithOptions(event.InsType, "", event.RegPlate, event.EndDate, event.EndDate, self.calOptions)
        .then((msg) => {
          console.log(msg);
          event.isInCalendar = true;
          console.log(JSON.stringify(event));
          self.addEventsToCalendarRecursively(index + 1);
        }, (err) => {
          console.log(err);
          self.addEventsToCalendarRecursively(index + 1);          
        });
    }
  }

  removeEventFromCalendar(index: number) {
    let event = this.events[index];
    Calendar
      .deleteEvent(event.InsType, "", event.RegPlate, event.EndDate, event.EndDate)
      .then((msg) => {
        console.log(msg);
        event.isInCalendar = false;
      }, (err) => {
        console.log(err);
      });
  }

  removeEventsFromCalendarRecursively(index : number) : Promise<any> {
    if(index < this.events.length) {
      let event = this.events[index];
      let self = this;
      return Calendar
        .deleteEvent(event.InsType, "", event.RegPlate, event.EndDate, event.EndDate)
        .then((msg) => {
          console.log(msg);
          event.isInCalendar = false;
          console.log(JSON.stringify(event));
          self.removeEventsFromCalendarRecursively(index + 1);
        }, (err) => {
          console.log(err);
          self.removeEventsFromCalendarRecursively(index + 1);
        });
    }
  }

  findEventsRecursively(index : number) : Promise<any> {
    if(index < this.events.length) {
      let event = this.events[index];
      let self = this;
      return Calendar
        .findEventWithOptions(event.InsType, "", event.RegPlate, event.EndDate, event.EndDate, self.calOptions)
        .then((foundEvents) => {
          console.log(foundEvents);
          
          if(foundEvents.length > 0) {
            event.isInCalendar = true;
          }
          
          console.log(JSON.stringify(event));
          self.findEventsRecursively(index + 1);
        }, (err) => {
          console.log(err);
          self.findEventsRecursively(index + 1);
        });
    }
  }

}


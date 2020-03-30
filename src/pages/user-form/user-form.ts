import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import { Calendar } from 'ionic-native';

import { CalendarEventsListPage } from '../calendar-events-list/calendar-events-list'

import { InsuranceService } from '../../providers/insurance-service'

/*
  Generated class for the UserForm page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-form',
  templateUrl: 'user-form.html'
})
export class UserFormPage {
  phoneNumber: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public insuranceService : InsuranceService) {

  }

  ionViewDidLoad() {
    // window.localStorage.removeItem('phoneNumber');
    // window.localStorage.clear();

    Calendar.hasReadWritePermission().then((result) => {
      if(result == false) {
        Calendar.requestReadWritePermission().then((success) => {console.log(success);});
      }
    })
      

    if(window.localStorage.getItem('phoneNumber')) {
        this.navCtrl.setRoot(CalendarEventsListPage);      
    }
  }

  logForm(userForm) {

    console.log(userForm.value)

    window.localStorage.setItem('phoneNumber', this.phoneNumber);

    this.navCtrl.setRoot(CalendarEventsListPage);
    
    // this.insuranceService.getInsuranceData().subscribe(
    //   (response : Response) => {
    //     console.log(response);
    //     console.log(JSON.parse(response.text().trim()));
    //   }
    // )
  }

}

// ﻿﻿[{"0":"0000-00-00 00:00:00","1":"GO","2":"CO4094BK","EndDate":"0000-00-00 00:00:00","InsType":"GO","RegPlate":"CO4094BK"}]
		
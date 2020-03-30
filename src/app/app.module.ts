import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { UserFormPage } from '../pages/user-form/user-form'
import { CalendarEventsListPage } from '../pages/calendar-events-list/calendar-events-list'

import { InsuranceService } from '../providers/insurance-service'
import { InsuranceServiceProvider } from '../providers/insurance-service-provider'
import { EventLocalStorage } from '../providers/event-local-storage'


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    UserFormPage,
    CalendarEventsListPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    FormsModule,
    HttpModule    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    UserFormPage,
    CalendarEventsListPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: InsuranceService, useClass: InsuranceServiceProvider},
    EventLocalStorage]
})
export class AppModule {}

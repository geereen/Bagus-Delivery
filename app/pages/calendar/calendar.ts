import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Calendar } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/calendar/calendar.html',
})
export class CalendarPage {

  public title: string;
  public note: string;
  public startDate: Date;
  public endDate: Date;
  public titleUpdated: string;
  public noteUpdated: string;

 constructor(public navCtrl: NavController, public toastCtrl: ToastController) {
   this.navCtrl = navCtrl;

   this.title = 'Event 1';
   this.note = 'Creating an event !';
   this.startDate = new Date();
   this.startDate.setMinutes(this.startDate.getMinutes() + 10);
   this.endDate = new Date();
   this.endDate.setHours(this.startDate.getHours() + 1);

   this.titleUpdated = 'Event updated';
   this.noteUpdated = 'We update the event !';
 } // constructor

 public createEvent():void{
   let options:any = {
     firstReminderMinutes:5
   };

   Calendar.createEventWithOptions(this.title, null, this.note, this.startDate, this.endDate, options).then(() => {
     let toast = this.toastCtrl.create({
       message:'Created',
       position: 'top',
       cssClass: 'text-center',
       duration: 3000
     });
     toast.present();
   });
 } // createEvent

 public deleteEvent():void{
   Calendar.deleteEvent(this.title, null, this.note, this.startDate, this.endDate).then(data => {
     let toast = this.toastCtrl.create({
       message:data===true ? 'Deleted' : 'Not deleted',
       position: 'top',
       cssClass: 'text-center',
       duration: 3000
     });
     toast.present();
   });
 } // deleteEvent

 public openCalendar():void{
   Calendar.openCalendar(this.startDate);
 } // openCalendar

}

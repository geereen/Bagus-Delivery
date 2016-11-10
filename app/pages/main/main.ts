import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { Storage, LocalStorage } from 'ionic-angular';
import { HTTP_PROVIDERS, Http } from '@angular/http';

import { FoodPage } from '../food/food';
import { NotifyPage } from '../notify/notify';


@Component({
  templateUrl: 'build/pages/main/main.html',
})
export class MainPage {
  public local: Storage;
  public id_member: any;
  Mylinkget = 'http://localhost/Bagus/api/getdata/notify.php?id=';  // 192.168.139.250
  num: any;
  public basket: any[];

  constructor(private navCtrl: NavController,private popoverCtrl: PopoverController, private http: Http) {
    this.navCtrl = navCtrl;
    this.http = http;
    this.local = new Storage(LocalStorage);

    this.local.set("basket", JSON.stringify([{"id_food":"","name":"","price":""}]));

    this.basket = JSON.parse(localStorage.getItem("basket"));
    console.log(this.basket);

    this.local.get('id_member').then((data) => {
      this.id_member = data;
      this.http.get(this.Mylinkget+this.id_member).subscribe(
        (response) => {
          this.num = response.json().num;
        }
      );
      console.log('id_member: '+this.id_member);
    });

  } // constructor

  popupNotify(event){
    let popover = this.popoverCtrl.create(NotifyPage);

    popover.present({
      ev:event
    });
  } // popupNotify

  goToChicken() {
    this.navCtrl.push(FoodPage,{
      id: this.id_member,
      type: 1,
      basket: this.basket,
      title: 'ไก่'
    });
  } // goToChicken

  goToBerger() {
    this.navCtrl.push(FoodPage,{
      id: this.id_member,
      type: 2,
      basket: this.basket,
      title: 'เบอร์เกอร์'
    });
  } // goToBerger

  goToSalad() {
    this.navCtrl.push(FoodPage,{
      id: this.id_member,
      type: 3,
      basket: this.basket,
      title: 'สลัด'
    });
  } // goToSalad

  goToSpagetthi() {
    this.navCtrl.push(FoodPage,{
      id: this.id_member,
      type: 4,
      basket: this.basket,
      title: 'สปาเก็ตตี้'
    });
  } // goToSpagetthi

}

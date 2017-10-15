import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { HTTP_PROVIDERS, Http } from '@angular/http';
import { Storage, LocalStorage } from 'ionic-angular';

import { CartPage } from '../cart/cart';

@Component({
  providers: [HTTP_PROVIDERS],
  templateUrl: 'build/pages/food/food.html',
})
export class FoodPage {
  public local: Storage;
  id_member: any;
  title: any;
  type: number;
  items: Array<{}>; //ประกาศตัวแปร array เปล่า
  Mylinkget = 'http://192.168.0.101/Bagus/api/getdata/food.php?type=';  // 192.168.139.250
  public product: any[];

  constructor(private navCtrl: NavController, private http: Http, private navParam: NavParams, private toastCtrl: ToastController) {
    this.local = new Storage(LocalStorage);
    this.id_member = navParam.get("id");
    this.title = navParam.get("title");
    this.type = navParam.get("type");
    this.product = navParam.get("basket");
    this.http = http;
    this.navCtrl = navCtrl;
    // this.product = [];

    if(this.product.length == 0){
      this.product = [];
    }else if(this.product.length == 1){
      this.product.pop();
    }

    this.http.get(this.Mylinkget+this.type).subscribe(
    (response) => {
      this.items = response.json().data;
      }
    );

    console.log('id_member: '+this.id_member);

  } // constructor

  addToCart(item){
    this.product.push({
      id_food: item.id_food,
      name: item.food_name,
      price: item.price
    });

    console.log(JSON.stringify(this.product));
    this.local.set("basket", JSON.stringify(this.product));


    let toast = this.toastCtrl.create({
      message: 'เพิ่ม '+item.food_name+' ลงตะกร้า',
      position: 'top',
      cssClass: 'text-center',
      duration: 700
    });
    toast.present();

    return this.product;
  } // addToCart

  goToCart(){
    this.navCtrl.push(CartPage,{
      cart: this.product,
      id_member: this.id_member
    });

  } // goToCart

  ShowToast(){
    let toast = this.toastCtrl.create({
      message: 'กรุณาเข้าสู่ระบบ',
      position: 'middle',
      cssClass: 'text-center',
      duration: 1000
    });
    toast.present();
  } // ShowToast

}

import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Checkout } from '../../providers/checkout/checkout';
import { Storage, LocalStorage } from 'ionic-angular';

import { MainPage } from '../main/main';

@Component({
  providers: [Checkout],
  templateUrl: 'build/pages/cart/cart.html',
})
export class CartPage {
  qty: any;
  id_member: any;
  sum: any;
  public cart: any[];
  public local: Storage;

  constructor(private navCtrl: NavController, private navParam: NavParams, private checkout: Checkout, private alertCtrl: AlertController) {
    this.id_member = navParam.get("id_member");
    this.cart = navParam.get("cart");
    this.navCtrl = navCtrl;
    this.local = new Storage(LocalStorage);
    this.checkout = checkout; // providers

    if(this.cart.length == 0){
      this.cart = null;
    }else{
      this.qty = [];
      this.sum = 0;
      for(let i = 0; i < this.cart.length; i++){
          this.qty[i]= 1;
          this.sum += this.cart[i].price*this.qty[i];
      }
    }

    console.log('id_member: '+this.id_member);
  } // constructor

    plus(i) {
      this.qty[i] += 1;
      this.sum = 0;
      for(let i = 0; i < this.cart.length; i++){
          this.sum += this.cart[i].price*this.qty[i];
      }
      console.log('ราคารวม: '+this.sum);
    } // plus

    minus(i) {
      if(this.qty[i]-1 < 1 ){
        this.qty[i] = 1
      }else{
        this.qty[i] -= 1;
        this.sum = 0;
        for(let i = 0; i < this.cart.length; i++){
            this.sum += this.cart[i].price*this.qty[i];
        }
        console.log('ราคารวม: '+this.sum);
      }
    } // minus

    removeItem(item){
      let index = this.cart.indexOf(item);
      if(index > -1){
          this.cart.splice(index, 1);
      }
      this.sum = 0;
      for(let i = 0; i < this.cart.length; i++){
          this.sum += this.cart[i].price*this.qty[i];
      }
      console.log('ราคารวม: '+this.sum);
    } // removeItem

    CheckOut(event){
      this.local.remove('basket');

      let data = [];

      for(let i = 0; i < this.cart.length; i++ ){
        data[i] = {
          id_food: parseInt(this.cart[i].id_food),
          amount: this.qty[i]
        }
      } // for

      //let jsonString = JSON.stringify(data);
      let body = "id="+this.id_member+ "&data="+JSON.stringify(data);

      this.checkout.save(body).then((response)=>{
        // สั่งให้ Alert
        let alert = this.alertCtrl.create({
          title: 'สั่งซื้อ',
          subTitle: response.message, //message เป็นค่าที่ส่งกลับมาจาก server
          buttons: ['ตกลง']
        });
        alert.present(alert);
        this.navCtrl.setRoot(MainPage, {}, { animate: true, direction: 'forward' });

        }).catch((err)=>{
            console.log(err);
        });
        event.preventDefault();


      for(let i = 0; i < data.length; i++){
        console.log(data[i]);
      } // for
      console.log(body);

    } // CheckOut

}

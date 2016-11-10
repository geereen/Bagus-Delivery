import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Storage, LocalStorage } from 'ionic-angular';

import { RegisPage } from '../regis/regis';
import { MainPage } from '../main/main';
import { Login } from '../../providers/login/login';

import { FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators } from '@angular/common';

@Component({
  providers: [Login],
  directives: [FORM_DIRECTIVES],
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
  loginForm: ControlGroup;
  public local: Storage;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, private Formlogin: FormBuilder,
     private login: Login, private loadingCtrl: LoadingController) {
    this.navCtrl = navCtrl;
    this.login = login;
    this.local = new Storage(LocalStorage);

    this.loginForm = this.Formlogin.group({

      username: ["", Validators.required],
      password: ["", Validators.compose([Validators.required,Validators.minLength(6)])] //อย่างน้อย 6 ตัว

    });
  } // constructor


  checklogin(event){
  //ดึงค่ามาจากฟอร์มแต่ละตัว
  let username = this.loginForm.controls['username'].value;
  let password = this.loginForm.controls['password'].value;
  // กำหนดตัวแปร body เพื่อส่งให้ method post() ของ provider
  let body = "username=" +username+ "&password=" +password;

  this.login.post(body).then((response)=>{
      // สั่งให้ Alert
      let alert = this.alertCtrl.create({
        title: 'เข้าสู่ระบบ',
        subTitle: response.message, //message เป็นค่าที่ส่งกลับมาจาก server
        buttons: ['ตกลง']
      });

      if(response.message == 'สำเร็จ'){
        this.local.set('id_member', response.id); // รับ id สมาชิกจาก server
        this.local.set('member', response.name); // รับ name สมาชิกจาก server
        // this.local.get('member').then((data) => this.newlocal = response.name);
        let loader = this.loadingCtrl.create({
            content: "ยินดีต้อนรับ...",
            duration: 1000
        });
        loader.present();
        //response.data = this.items;
        this.navCtrl.setRoot(MainPage);

      }else{
        alert.present(alert);
        this.navCtrl.setRoot(LoginPage);
      }

    }).catch((err)=>{
        console.log(err);
    });
    event.preventDefault();
  } // checklogin


  goToRegis(){
    this.navCtrl.push(RegisPage);
  }

}

import { Component } from '@angular/core';
import { NavController, Alert } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';

import { Regis } from '../../providers/regis/regis';
import { FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators } from '@angular/common';

@Component({
  providers: [Regis],
  directives: [FORM_DIRECTIVES],
  templateUrl: 'build/pages/regis/regis.html',
})

export class RegisPage {
regisForm: ControlGroup;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, private Formregis: FormBuilder, private regis: Regis){
    this.navCtrl = navCtrl;
    this.regis = regis;

    this.regisForm = this.Formregis.group({

      fullname: ["", Validators.required], //ผู้ใช้จะต้องกรอก
      email: ["", Validators.required],
      tel: ["", Validators.required],
      address: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", Validators.compose([Validators.required,Validators.minLength(6)])] //อย่างน้อย 6 ตัว

    });
  } // constructor

// method เพิ่มสมาชิก
 addMember(event){

 // ดึงค่ามาจากฟอร์มแต่ละตัว
 let fullname = this.regisForm.controls['fullname'].value;
 let email = this.regisForm.controls['email'].value;
 let tel = this.regisForm.controls['tel'].value;
 let address = this.regisForm.controls['address'].value;
 let username = this.regisForm.controls['username'].value;
 let password = this.regisForm.controls['password'].value;
 // กำหนดตัวแปร body เพื่อส่งให้ method save() ของ provider เพื่อบันทึกข้อมูล
 let body = "fullname="+fullname+ "&email="+email+ "&address="+address+ "&tel="+tel+ "&username="+username+ "&password="+password;

 this.regis.save(body).then((response)=>{
     // สั่งให้ Alert ทำงานเมื่อบันทึกข้อมูลเรียบร้อย
     let alert = this.alertCtrl.create({
       title: 'สมัครสมาชิก',
       subTitle: response.message, // message เป็นค่าที่ส่งกลับมาจาก Backend
       buttons: ['ตกลง']
     });
     alert.present(alert);
     this.navCtrl.pop(LoginPage);
   }).catch((err)=>{
       console.log(err);
   });
   event.preventDefault();
 } // addMember

}

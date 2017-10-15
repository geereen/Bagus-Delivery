import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HTTP_PROVIDERS, Http } from '@angular/http';

import { MainPage } from '../main/main';


@Component({
  providers: [HTTP_PROVIDERS],
  templateUrl: 'build/pages/detailnotif/detailnotif.html',
})
export class DetailnotifPage {
  Mylinkget = 'http://192.168.0.101/Bagus/api/getdata/staff.php?id=';
  items: Array<{}>;
  id_staff: any;
  notify_txt: any;
  notify_type: any;
  title: any;

  constructor(private navCtrl: NavController, private navParam: NavParams, private http: Http) {
    this.navCtrl = navCtrl;
    this.http = http;

    this.id_staff = navParam.get("id_staff");
    this.notify_txt = navParam.get("notify_txt");
    this.notify_type = navParam.get("notify_type");

    if(this.notify_type == 1){
      this.title = "การแจ้งเตือน";
    }else{
      this.title = "โปรไฟล์ผู้จัดส่ง";
    }

    this.http.get(this.Mylinkget+this.id_staff).subscribe(
    (response) => {
      this.items = response.json().data; //ดึงข้อมูลที่ได้ แล้วกําหนดให้กับตัวแปร itmes ของคลาสนี
     }
    );

    console.log('id_staff: '+this.id_staff);
  } // constructor

  goToMain(){
    // this.navCtrl.setRoot(MainPage, {}, { animate: true, direction: 'forward' });
    this.navCtrl.pop();
  } // goToMain

}

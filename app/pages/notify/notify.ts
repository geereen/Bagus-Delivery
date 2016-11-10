import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage, LocalStorage } from 'ionic-angular';

import { DetailnotifPage } from '../detailnotif/detailnotif';

@Component({
  templateUrl: 'build/pages/notify/notify.html',
})
export class NotifyPage {
  public local: Storage;
  id_member: any;
  num: any;
  items: Array<{}>;
  Mylinkget = 'http://localhost/Bagus/api/getdata/notify.php?id=';  // 192.168.139.250
  UpdateNoify = 'http://localhost/Bagus/api/putdata/notify.php?id=';

  constructor(private navCtrl: NavController, private http: Http) {
    this.navCtrl = navCtrl;
    this.http = http;
    this.local = new Storage(LocalStorage);

    this.local.get('id_member').then((value) => {
      this.http.get(this.Mylinkget+value).subscribe(
      (response) => {
        this.items = response.json().data; //ดึงข้อมูลที่ได้ แล้วกําหนดให้กับตัวแปร itmes ของคลาสนี
        this.num = response.json().num;
        }
      );
    });



  } // constructor

  goToDetailNotification(item){
    this.http.get(this.UpdateNoify+item.id_notify).subscribe(
    (response) => {
        console.log('การแจ้งเตือนที่'+item.id_order+': '+response.json().message);
      }
    );

    this.navCtrl.push(DetailnotifPage,{
      id_staff: item.id_staff,
      notify_txt: item.notify_txt,
      notify_type: item.notify_type
    });
  } // goToDetailNotification

}

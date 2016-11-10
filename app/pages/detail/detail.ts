import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HTTP_PROVIDERS, Http } from '@angular/http';


@Component({
  providers: [HTTP_PROVIDERS],
  templateUrl: 'build/pages/detail/detail.html',
})
export class DetailPage {
  id: number;
  title: string;
  items: Array<{}>;
  Mylink = 'http://localhost/Bagus/api/getdata/order_detail.php?id=';
  sum: number;
  status: number;
  time: any;
  txtstatus: string;

  constructor(private navCtrl: NavController, private navParam: NavParams, private http: Http) {
      this.id = navParam.get("id");
      this.title = navParam.get("title");
      this.http = http;

      this.http.get(this.Mylink+this.id).subscribe(
      (response) => {
        this.items = response.json().data;
        this.sum = response.json().sum;
        this.status = response.json().status;
        this.time = response.json().time;
          if(this.status == 4){
            this.txtstatus = "ส่งเรียบร้อยแล้ว";
          }else if(this.status == 3){
            this.txtstatus = "จัดส่ง";
          }else if(this.status == 2){
            this.txtstatus = "กำลังปรุงอาหาร";
          }else{
            this.txtstatus = "รอคิว";
          }
        } // response
      );

  } // constructor

}

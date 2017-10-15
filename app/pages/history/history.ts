import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HTTP_PROVIDERS, Http } from '@angular/http';
import { DetailPage } from '../detail/detail';

@Component({
  providers: [HTTP_PROVIDERS],
  templateUrl: 'build/pages/history/history.html',
})
export class HistoryPage {
  id: number;
  items: Array<{}>;
  Mylink = 'http://192.168.0.101/Bagus/api/getdata/order_history.php?id=';
  i: string;

  constructor(private navCtrl: NavController, private navParam: NavParams, private http: Http) {
    this.id = navParam.get("id");
    this.http = http;

    this.http.get(this.Mylink+this.id).subscribe(
    (response) => {
      this.items = response.json().data;
      this.i = response.json().i;
      }
    );

  } // constructor

  goToDetail(item){
    this.navCtrl.push(DetailPage,{
      id: item.id_order,
      title: item.order_date
    });
  } // goToDetail

}

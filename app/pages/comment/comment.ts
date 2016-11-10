import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HTTP_PROVIDERS, Http, Headers } from '@angular/http';
import { FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators } from '@angular/common';
import { Storage, LocalStorage } from 'ionic-angular';

@Component({
  providers: [HTTP_PROVIDERS],
  directives: [FORM_DIRECTIVES],
  templateUrl: 'build/pages/comment/comment.html',
})
export class CommentPage {
  public local: Storage;
  public idlocal: any;
  commentForm: ControlGroup;
  items: Array<{}>;
  Mylinkget = 'http://localhost/Bagus/api/getdata/comment.php'; // ถ้าลงในมือถือจริงให้เปลี่ยน localhost เป็นหมายเลข IP เครื่อง Server
  Mylinkput = 'http://localhost/Bagus/api/putdata/comment.php';
  // 192.168.139.250 IP PSU
  // 172.18.22.168 802.1 PSU
  data: any = null;
  //id: number;
  searchQuery: string = '';
  item: string[];

  constructor(private navCtrl: NavController, private http: Http, private Formcomment: FormBuilder, private navParam: NavParams) {
    this.local = new Storage(LocalStorage);
    this.local.get('id_member').then((data) => this.idlocal = data);
    //this.id = navParam.get("id");
    this.navCtrl = navCtrl;
    this.http = http;

    this.http.get(this.Mylinkget).subscribe(
    (response) => {
      this.items = response.json().data;
      }
    );

    this.commentForm = this.Formcomment.group({
      comment: ["", Validators.required]
    });

  } // constructor


  addcomment(event){
    let comment = this.commentForm.controls['comment'].value;
    let body = "id="+this.idlocal+"&comment="+comment;

    this.post(body).then((response)=>{
      this.navCtrl.setRoot(CommentPage);
      }).catch((err)=>{
          console.log(err);
      });
      event.preventDefault();

  } // addcomment

  post(body:string) {
    let headers = new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }
    // don't have the data yet
    return new Promise(resolve => {
      this.http.post(this.Mylinkput,body,{headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        this.data = data;
        resolve(this.data);
        });
    });

  } // post

}

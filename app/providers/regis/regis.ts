import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class Regis {
data: any = null;
Mylink = 'http://localhost/Bagus/api/putdata/member.php'; // ถ้าลงในมือถือจริงให้เปลี่ยน localhost เป็นหมายเลข IP เครื่อง Server

  constructor(private http: Http) {} // constructor

  //method สำหรับส่งข้อมูลจากฟอร์มไปบันทึกที่ Backend
  save(body:string) {
    let headers = new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }
    // don't have the data yet
    return new Promise(resolve => {
      this.http.post(this.Mylink,body,{headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        this.data = data;
        resolve(this.data);
        });
    });
  }

}

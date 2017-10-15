import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Profile {
  data: any = null;
  Mylinkput = 'http://192.168.0.101/Bagus/api/putdata/profile.php?id='; // 192.168.139.250

  constructor(private http: Http) {}

  post(body:string,id_member) {
    let headers = new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }
    // don't have the data yet
    return new Promise(resolve => {
      this.http.post(this.Mylinkput+id_member,body,{headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        this.data = data;
        resolve(this.data);
        });
    });
  } // post

}

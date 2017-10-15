import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators } from '@angular/common';
import { ActionSheetController } from 'ionic-angular';
import { Camera, Transfer } from 'ionic-native';

import { Profile } from '../../providers/profile/profile';


@Component({
  providers: [Profile],
  directives: [FORM_DIRECTIVES],
  templateUrl: 'build/pages/profile/profile.html',
})
export class ProfilePage {
  profileForm: ControlGroup;
  id: number;
  pic: string;
  items: Array<{}>;
  Mylinkget = 'http://192.168.0.101/Bagus/api/getdata/profile.php?id='; // ถ้าลงในมือถือจริงให้เปลี่ยน localhost เป็นหมายเลข IP เครื่อง Server
  Mylinkupload = 'http://192.168.0.101/Bagus/api/putdata/upload_pic.php?id=';
  imageSrc: string;

  constructor(private navCtrl: NavController, private navParam: NavParams, private http: Http, private Formprofile: FormBuilder, private alertCtrl: AlertController, private profile: Profile,public actionSheetCtrl: ActionSheetController) {
    this.id = navParam.get("id");
    this.profile = profile;
    this.http = http;

    this.imageSrc = null;

    this.http.get(this.Mylinkget+this.id).subscribe(
    (response) => {
      this.items = response.json().data;
      this.pic = response.json().pic;
      }
    );

    this.profileForm = this.Formprofile.group({
      fullname: ["", Validators.required],
      email: ["", Validators.required],
      tel: ["", Validators.required],
      address: ["", Validators.required]
    });

  } // constructor

  openMenu() {
   let actionSheet = this.actionSheetCtrl.create({
    //  title: 'กรุณาเลือก',
     buttons: [
       {
         text: 'ถ่ายภาพ',
         role: 'Camera',
         handler: () => {
           this.takePhoto();
           console.log('Camera clicked');
         }
       },{
         text: 'เลือกภาพ',
         role: 'Gallery',
         handler: () => {
           this.openGallery();
           console.log('Gallery clicked');
         }
       },{
         text: 'ยกเลิก',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
     ]
   });
   actionSheet.present();
 } // openMenu

   openGallery() {
    let cameraOptions = {
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.FILE_URI,
      maximumImageCount: 1,
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: Camera.EncodingType.JPEG,
      correctOrientation: true
    }

    Camera.getPicture(cameraOptions)
      .then(file_uri => this.imageSrc = file_uri,
      err => console.log(err));
  } // openGallery

  takePhoto (){
   let cameraOptions = {
     sourceType: Camera.PictureSourceType.CAMERA,
     destinationType: Camera.DestinationType.FILE_URI,
     quality: 100,
     targetWidth: 1000,
     targetHeight: 1000,
     encodingType: Camera.EncodingType.JPEG,
     correctOrientation: true
   }

   Camera.getPicture(cameraOptions)
     .then(file_uri => this.imageSrc = file_uri,
     err => console.log(err));
     //this.Upload();
 } // takePhoto

 Upload(){
      let imageURI = this.imageSrc;
      let fileTransfer = new Transfer();

      let server = this.Mylinkupload+this.id+"&old_pic="+this.pic;
      let options = {
        fileKey:"myCameraImg",
        fileName:imageURI.substr(imageURI.lastIndexOf('/')+1),
        mimeType:"image/jpeg",
        chunkedMode:false,
        headers: {'Content-Type' : undefined}
      };

      fileTransfer.upload(imageURI, server, options)
        .then((response) => {
            // alert('success:'+imageURI);
            let alert = this.alertCtrl.create({
              title: 'อัพโหลด',
              subTitle: 'สำเร็จ',
              buttons: ['ตกลง']
            });
            alert.present(alert);
            this.navCtrl.setRoot(ProfilePage,{
              id: this.id
            },{ animate: true, direction: 'forward' });

        }).catch((error) => {
            //alert('error:'+error);
            let alert = this.alertCtrl.create({
              title: 'อัพโหลด',
              subTitle: 'ไม่สำเร็จ',
              buttons: ['ตกลง']
            });
            alert.present(alert);
        });

 } // Upload

  Editprofile(event){
    let fullname = this.profileForm.controls['fullname'].value;
    let email = this.profileForm.controls['email'].value;
    let tel = this.profileForm.controls['tel'].value;
    let address = this.profileForm.controls['address'].value;

    let body = "fullname=" +fullname+ "&email=" +email+ "&address=" +address+ "&tel=" +tel;

    this.profile.post(body,this.id).then((response)=>{
      // สั่งให้ Alert
      let alert = this.alertCtrl.create({
        title: 'แก้ไขข้อมูลส่วนตัว',
        subTitle: response.message, //message เป็นค่าที่ส่งกลับมาจาก server
        buttons: ['ตกลง']
      });
      alert.present(alert);
      this.navCtrl.setRoot(ProfilePage,{
        id: this.id
      },{ animate: true, direction: 'forward' });

      }).catch((err)=>{
          console.log(err);
      });
      event.preventDefault();
  } // Editprofile

} // Main Class

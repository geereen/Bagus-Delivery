import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, LoadingController, ToastController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

declare var google;

@Component({
  templateUrl: 'build/pages/map/map.html',
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  locationA: any;
  locationB: any;
  Distance: any;

  constructor(private navCtrl: NavController, private platform: Platform, private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    let loader = this.loadingCtrl.create({
        content: "Please wait...",
        duration: 1000
    });
    loader.present();

    platform.ready().then(() => {
      this.loadMap();
    });

  } // constructor

    loadMap(){
      let options = { timeout: 10000, enableHighAccuracy: true};
      Geolocation.getCurrentPosition(options).then((position) => {

        let MylatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        let mapOptions = {
          center: MylatLng ,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        // mark ตำแหน่งปัจจุบัน -------------------------------------
        let marker = new google.maps.Marker({
          map: this.map,
          label: 'A',
          animation: google.maps.Animation.DROP,
          position: MylatLng
        }); // หมุด ตำแหน่งปัจจุบัน
        let content = "<h4>This Your Location</h4>";
        this.addInfoWindow(marker, content);

        this.locationA = MylatLng;
        console.log('A:'+this.locationA);
        // ปิด mark ตำแหน่งปัจจุบัน -------------------------------------

        // mark ตำแหน่ง Bagus -------------------------------------
        let bagusLatLng = new google.maps.LatLng(6.86545,101.24106);
        let markerBagus = new google.maps.Marker({
          map: this.map,
          label: 'B',
          position: bagusLatLng,
          //draggable: true,
        }); // หมุด Bagus

        this.locationB = bagusLatLng;
        console.log('B:'+this.locationB);

        let contentBagus = "<h4>This Bagus Chicken</h4>";
        let infoWindow = new google.maps.InfoWindow({
          content: contentBagus
        });

        google.maps.event.addListener(markerBagus, 'click', () => {
          infoWindow.open(this.map, markerBagus);
        });
        // ปิด mark ตำแหน่ง Bagus -------------------------------------


      }, (err) => {
        console.log(err);
      });

    } // loadMap

  addInfoWindow(marker, content){
      let infoWindow = new google.maps.InfoWindow({
        content: content
      });

      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
      });

  } // addInfoWindow

  calcRoute() {
    let directionDisplay = new google.maps.DirectionsRenderer();
    let directionsService = new google.maps.DirectionsService();

    let start = this.locationA;
    let end = this.locationB;
    let request = {
        origin:start,
        destination:end,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
        // unitSystem: google.maps.DirectionsUnitSystem.IMPERIAL
    };

    directionsService.route(request, (response, status) => {
      if (status == google.maps.DirectionsStatus.OK) {
        directionDisplay.setDirections(response);
        let distance = (response.routes[0].legs[0].distance.value/1000).toFixed(1);
        let time = response.routes[0].legs[0].duration.text;

        console.log('ระยะทาง: '+distance+' km'); // distance.value = เมตร ถ้า distance.text = ไมล์
        console.log('เวลา: ' +time); // duration.value = วินาที ถ้า duration.text = นาที

        this.ShowDistance(distance, time);
        
      } else {
        console.log("directions response: " +status);
        // oops, there's no route between these two locations
        // every time this happens, a kitten dies
        // so please, ensure your address is formatted properly
      }
    });
    directionDisplay.setMap(this.map);

  } // calcRoute

  ShowDistance(distance, time){
    let toast = this.toastCtrl.create({
      message: 'Distance: '+distance+' km '+time,
      position: 'buttom',
      cssClass: 'text-center',
      duration: 10000
    });
    toast.present();
  }

} // Main Class

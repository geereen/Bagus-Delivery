import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { Storage, LocalStorage } from 'ionic-angular';

import { MainPage } from './pages/main/main';
import { LoginPage } from './pages/login/login';
import { MapPage } from './pages/map/map';
import { ProfilePage } from './pages/profile/profile';
import { HistoryPage } from './pages/history/history';
import { CommentPage } from './pages/comment/comment';
import { AboutPage } from './pages/about/about';
import { CalendarPage } from './pages/calendar/calendar';


@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MainPage;

  pages: Array<{title: string, component: any, icon: string}>;

  public local: Storage;
  public idlocal: any;
  public namelocal: any;

  constructor(public platform: Platform) {
    this.initializeApp();
    this.local = new Storage(LocalStorage);

    this.local.get('id_member').then((data) => this.idlocal = data);
    this.local.get('member').then((data) => this.namelocal = data);
    // used for an example of ngFor and navigation
    this.pages = [

      { title: 'เมนู', component: MainPage, icon: 'restaurant' },
      { title: 'แผนที่', component: MapPage, icon: 'pin' },
      { title: 'ปฏิทิน', component: CalendarPage, icon: 'calendar' }

    ];

  } // constructor

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  login(){
    this.nav.setRoot(LoginPage);
  }

  logout(){
    this.local.clear();
    //this.local.remove('member');
    this.nav.setRoot(MainPage);
  }

  goToProfile(){
    this.nav.setRoot(ProfilePage,{
      id: this.idlocal
    });
  }

  goToHistory(){
    this.nav.setRoot(HistoryPage,{
      id: this.idlocal
    });
  }

  goToComment(){
    this.nav.setRoot(CommentPage);
  }

  goToAbout(){
    this.nav.setRoot(AboutPage);
  }

} // Main Class

ionicBootstrap(MyApp, [], {
  prodMode: true //true คือ production mode
});

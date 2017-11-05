import { Component, ViewChild } from '@angular/core';
import { Events, MenuController, Nav, Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import {AdMob, AdMobOptions, AdSize, AdExtras} from '@ionic-native/admob';
import {AdMob} from '@ionic-native/admob';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { AboutPage } from '../pages/info/about';
import { HelpPage } from '../pages/info/help';

declare var window: any;
declare var Windows: any;
declare var navigator: any;
declare var TVJS: any;
declare var WinJS: any;

export interface PageObj {
  title: string;
  component: any;
  params: any;
  icon?: string;
  index?: number;
}

@Component({
  templateUrl: 'app.html',
  providers: [StatusBar, SplashScreen, AdMob]
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = DashboardPage;
  appPages: PageObj[] = [
    /*{ title: 'Favs', component: FavsPage },*/
    { title: 'Dashboard', component: DashboardPage, params: {}, icon: 'information-circle' },
    /*{ title: 'Admin Commands', component: AdminPage, params: {}, icon: 'information-circle' },*/
    { title: 'Help', component: HelpPage, params: {}, icon: 'information-circle' },
    { title: 'About', component: AboutPage, params: {}, icon: 'information-circle' }
  ];

  constructor(public events: Events, public menu: MenuController, public platform: Platform, public toastCtrl: ToastController,
              public statusBar: StatusBar, public splashScreen: SplashScreen, public adMob: AdMob) {

    platform.ready().then(() => {
      if (this.platform.is("cordova")) {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      }

      if (this.platform.is("cordova")) {
        //var admobid = {banner: "ca-app-pub-4615642243411455/7055418360", interstitial: ""};
        var options = {
          adId:"ca-app-pub-4615642243411455/7055418360",
          position: 8,
          overlap: true,
          autoShow: true
        };
        this.adMob.createBanner(options).then( response => {
          //let toastPopup = this.toastCtrl.create({message: response, duration: 5000, position: 'top'});
          //toastPopup.present();
        });
      }

      if (typeof Windows !== "undefined") {
        try {
          // Turn off mouse mode, values = keyboard, gamepad
          navigator.gamepadInputEmulation = "keyboard";
        } catch(e) {
          //let toastPopup = this.toastCtrl.create({message: "gamepadInputEmulation: " + e.message, duration: 5000, position: 'top'});
          //toastPopup.present();
        }

        try {
          // TV safe area off
          var applicationView = Windows.UI.ViewManagement.ApplicationView.getForCurrentView();
          applicationView.setDesiredBoundsMode(Windows.UI.ViewManagement.ApplicationViewBoundsMode.useCoreWindow);
          applicationView.PreferredLaunchWindowingMode = Windows.UI.ViewManagement.ApplicationViewWindowingMode.FullScreen;
        } catch(e) {
          //let toastPopup = this.toastCtrl.create({message: "ApplicationViewBoundsMode: " + e.message, duration: 5000, position: 'top'});
          //toastPopup.present();
        }

        try {
          //-- disable scaling
          //Windows.UI.ViewManagement.ApplicationViewScaling.TrySetDisableLayoutScaling(true);
          var applicationViewManagement = Windows.UI.ViewManagement;
          applicationViewManagement.ApplicationViewScaling.TrySetDisableLayoutScaling(true);
        } catch(e) {
          //let toastPopup = this.toastCtrl.create({message: "ApplicationViewScaling: " + e.message, duration: 5000, position: 'top'});
          //toastPopup.present();
        }

        try {
          //-- directional navigation
          TVJS.DirectionalNavigation.enabled = true;
          TVJS.DirectionalNavigation.focusableSelectors.push(".tv");
          TVJS.DirectionalNavigation.focusableSelectors.push(".tvBorder");
          TVJS.DirectionalNavigation.focusableSelectors.push(".back-button");
          TVJS.DirectionalNavigation.focusableSelectors.push(".bar-buttons");
          TVJS.DirectionalNavigation.focusableSelectors.push(".editing-view-port");
          TVJS.DirectionalNavigation.focusableSelectors.push("ion-select");
          TVJS.DirectionalNavigation.focusableSelectors.push("button");
        } catch(e) {
          //let toastPopup = this.toastCtrl.create({message: "DirectionalNavigation: " + e.message, duration: 5000, position: 'top'});
          //toastPopup.present();
        }

        if (WinJS) {
          //-- .win-xbox class
          //let toastPopup = this.toastCtrl.create({message: "This app requires a keyboard when used on the xbox to perform paste(crtl-v)", duration: 8000, position: 'top'});
          //toastPopup.present();
        }

      }

    });
  }

  tvBack(event: any) {
    if (event.keyCode === 13 || event.keyCode === 195 || event.button === 0) {
      this.nav.pop();
    }
  }

  isXbox() {
    //TODO: doe not work on xbox
    if (navigator.getGamepads) {
      var gamepads = navigator.getGamepads();
      if (gamepads[0]) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  openPageByEvent(event: any, page: any) {
    if (event.keyCode === 13 || event.keyCode === 195 || event.button === 0) {
      this.openPage(page);
    }
  }

  openPage(page: any) {
    this.nav.push(page.component, page.params);
  }
}

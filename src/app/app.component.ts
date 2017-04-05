import { Component, ViewChild } from '@angular/core';
import { Events, MenuController, Nav, Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AdMob, AdMobOptions, AdSize, AdExtras} from '@ionic-native/admob';

import { DashboardPage } from '../pages/dashboard/dashboard';
import { AboutPage } from '../pages/info/about';
import { HelpPage } from '../pages/info/help';

declare var window: any;
declare var Windows: any;
declare var navigator: any;
declare var TVJS: any;

export interface PageObj {
  title: string;
  component: any;
  params: any;
  icon?: string;
  index?: number;
}

@Component({
  templateUrl: 'app.template.html'
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
    this.adMob = adMob;
    this.statusBar = statusBar;
    this.splashScreen = splashScreen;
    platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if (this.platform.is("cordova")) {
        var admobid = {banner: "ca-app-pub-4615642243411455/7055418360", interstitial: ""};
        this.adMob.createBanner({
          adId:admobid.banner,
          position: 8,
          overlap: true,
          autoShow: true
        });
      }

      if (typeof Windows !== "undefined") {
        try {
          // Turn off mouse mode, values = keyboard, gamepad
          navigator.gamepadInputEmulation = "keyboard";
        } catch(e) {
          let toastPopup = this.toastCtrl.create({message: "gamepadInputEmulation: " + e.message, duration: 5000, position: 'top'});
          toastPopup.present();
        }

        try {
          // TV safe area off
          var applicationView = Windows.UI.ViewManagement.ApplicationView.getForCurrentView();
          applicationView.setDesiredBoundsMode(Windows.UI.ViewManagement.ApplicationViewBoundsMode.useCoreWindow);
          applicationView.PreferredLaunchWindowingMode = Windows.UI.ViewManagement.ApplicationViewWindowingMode.FullScreen;
        } catch(e) {
          let toastPopup = this.toastCtrl.create({message: "ApplicationViewBoundsMode: " + e.message, duration: 5000, position: 'top'});
          toastPopup.present();
        }

        try {
          //-- disable scaling
          //Windows.UI.ViewManagement.ApplicationViewScaling.TrySetDisableLayoutScaling(true);
          var applicationViewManagement = Windows.UI.ViewManagement;
          applicationViewManagement.ApplicationViewScaling.TrySetDisableLayoutScaling(true);
        } catch(e) {
          let toastPopup = this.toastCtrl.create({message: "ApplicationViewScaling: " + e.message, duration: 5000, position: 'top'});
          toastPopup.present();
        }

        try {
          //-- directional navigation
          TVJS.DirectionalNavigation.enabled = true;
          TVJS.DirectionalNavigation.focusableSelectors.push(".tv");
          TVJS.DirectionalNavigation.focusableSelectors.push(".tvBorder");
        } catch(e) {
          let toastPopup = this.toastCtrl.create({message: "DirectionalNavigation: " + e.message, duration: 5000, position: 'top'});
          toastPopup.present();
        }
      }
    });
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

  openPage(page: any) {
    this.nav.push(page.component, page.params);
  }
}

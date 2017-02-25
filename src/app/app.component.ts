import { Component, ViewChild } from '@angular/core';
import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import {StatusBar, AdMob} from 'ionic-native';

import { DashboardPage } from '../pages/dashboard/dashboard';
import { AboutPage } from '../pages/info/about';
import { HelpPage } from '../pages/info/help';

declare var window: any;
declare var Windows: any;
declare var navigator: any;

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

  constructor(public events: Events, public menu: MenuController, public platform: Platform) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      //if (this.platform.is("cordova")) {
        var admobid = {banner: "ca-app-pub-4615642243411455/7055418360", interstitial: ""};
        AdMob.createBanner({
          adId:admobid.banner,
          position: 8,
          overlap: true,
          autoShow: true
        });
      //}
      //this.setXboxOne();
    });
  }

  setXboxOne() {
    //-- xbox can only use ports: 49152-65535
    var returnMessage:any = "";
    try {
      // Turn off mouse mode
      navigator.gamepadInputEmulation = "keyboard";
      navigator.gamepadInputEmulation = "gamepad";
    } catch(e) {
        //returnMessage = e.message;
      }
      try {
        // TV safe area off
        var applicationView = Windows.UI.ViewManagement.ApplicationView.getForCurrentView();
        applicationView.setDesiredBoundsMode(Windows.UI.ViewManagement.ApplicationViewBoundsMode.useCoreWindow);
      } catch(e) {
        returnMessage = e.message;
      }
      return returnMessage;
  }

  openPage(page: any) {
    this.nav.push(page.component, page.params);
  }
}

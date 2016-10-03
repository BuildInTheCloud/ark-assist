import { Component, ViewChild, enableProdMode } from '@angular/core';
import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { Splashscreen, StatusBar } from 'ionic-native';

import { ColorPage } from '../pages/color/color';
import { AdminPage } from '../pages/commands/commands';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { DinoPage } from '../pages/dino/dino';
import { EntityPage } from '../pages/entity/entity';
import { AboutPage } from '../pages/info/about';
import { HelpPage } from '../pages/info/help';
import { FavsPage } from '../pages/recent/favs';

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

  constructor(public events: Events, public menu: MenuController, platform: Platform,) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      //this.setXboxOne();
    });
  }

  setXboxOne() {
    //-- xbox can only use ports: 49152-65535
    var returnMessage:any = "";
    try {
      // Turn off mouse mode
      //navigator.gamepadInputEmulation = "keyboard";
      //navigator.gamepadInputEmulation = "gamepad";
    } catch(e) {
        //returnMessage = e.message;
      }
      try {
        // TV safe area off
        //var applicationView = Windows.UI.ViewManagement.ApplicationView.getForCurrentView();
        //applicationView.setDesiredBoundsMode(Windows.UI.ViewManagement.ApplicationViewBoundsMode.useCoreWindow);
      } catch(e) {
        returnMessage = e.message;
      }
      return returnMessage;
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component, page.params);
  }
}
//-- run in prod mode
enableProdMode();
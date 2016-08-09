//declare var Windows: any;
//declare var navigator: any;

import { Component, ViewChild, enableProdMode } from '@angular/core';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { FavsPage } from './pages/recent/favs';
import { EntityPage } from './pages/entity/entity';
import { DinoPage } from './pages/dino/dino';
import { ColorPage } from './pages/color/color';
import { AdminPage } from './pages/commands/commands';
import { HelpPage } from './pages/info/help';
import { AboutPage } from './pages/info/about';

@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = AboutPage;

  pages: Array<{title: string, component: any, params: any }>;

  constructor(private platform: Platform) {
    this.initializeApp();
    this.pages = [
      /*{ title: 'Favs', component: FavsPage },*/
      { title: 'Ammunitions', component: EntityPage, params: {title:"Ammunitions", dataset: "ammunitions"} },
      { title: 'Armor', component: EntityPage, params: {title:"Armor", dataset: "armor"} },
      { title: 'Artifacts', component: EntityPage, params: {title:"Artifacts", dataset: "artifacts"} },
      { title: 'Attachments', component: EntityPage, params: {title:"Attachments", dataset: "attachments"} },
      { title: 'Consumables', component: EntityPage, params: {title:"Consumables", dataset: "consumables"} },
      { title: 'Eggs', component: EntityPage, params: {title:"Eggs", dataset: "eggs"} },
      { title: 'Dyes', component: EntityPage, params: {title:"Dyes", dataset: "dyes"} },
      { title: 'Farming', component: EntityPage, params: {title:"Farming", dataset: "farming"} },
      { title: 'Recipes', component: EntityPage, params: {title:"Recipes", dataset: "recipes"} },
      { title: 'Resources', component: EntityPage, params: {title:"Resources", dataset: "resources"} },
      { title: 'Saddles', component: EntityPage, params: {title:"Saddles", dataset: "saddles"} },
      { title: 'Seeds', component: EntityPage, params: {title:"Seeds", dataset: "seeds"} },
      { title: 'Skins', component: EntityPage, params: {title:"Skins", dataset: "skins"} },
      { title: 'Structures', component: EntityPage, params: {title:"Structures", dataset: "structures"} },
      { title: 'Tools', component: EntityPage, params: {title:"Tools", dataset: "tools"} },
      { title: 'Trophies', component: EntityPage, params: {title:"Trophies", dataset: "trophies"} },
      { title: 'Weapons', component: EntityPage, params: {title:"Weapons", dataset: "weapons"} },

      { title: 'Dinos', component: DinoPage, params: {} },
      { title: 'Dino Colors', component: ColorPage, params: {} },

      /*{ title: 'Admin Commands', component: AdminPage, params: {} },*/
      { title: 'Help', component: HelpPage, params: {} },
      { title: 'About', component: AboutPage, params: {} }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
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
enableProdMode();
ionicBootstrap(MyApp);

import { Component } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
declare var window: any;
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage {
  entityList:any[];
  platformMessage: string;
  loader: any;

  constructor(public navCtrl: NavController, public platform: Platform,
              public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.loader = this.navParams.get("loading");
    this.platform = platform;
  }

  ngOnInit() {
    this.loader.dismiss();
    this.platformMessage = this.platform.platforms().toString();
  }


}

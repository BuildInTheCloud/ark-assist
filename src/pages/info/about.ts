import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
declare var window: any;
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage {
  entityList:any[];
  platformMessage: string;

  constructor(public navCtrl: NavController, public platform: Platform) {
    this.platform = platform;
  }

  ngOnInit() {
    this.platformMessage = this.platform.platforms().toString();
  }


}

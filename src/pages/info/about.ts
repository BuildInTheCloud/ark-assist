import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
declare var window: any;
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage {
  entityList:any[];
  errorMessage: string;
  isCordovaApp:boolean = !!window.cordova;
  isWinJSApp:boolean = !!window.WinJS;

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
    if (this.isCordovaApp) {this.errorMessage = "CORDOVA APP";}
    if (this.isWinJSApp) {this.errorMessage = "WinJS APP";}
  }


}

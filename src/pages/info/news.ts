import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})

export class NewsPage {
  errorMessage: string;
  xboxErrorMessage: string;
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.loader = this.navParams.get("loading");
  }

  ngOnInit() {
    this.loader.dismiss();
  }

}

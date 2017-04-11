import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { StaticService } from '../../static-service/static-data';

@Component({
  selector: 'page-color',
  templateUrl: 'color.html',
  providers: [StaticService]
})

export class ColorPage {
  itemList:any[];
  errorMessage: string;
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: StaticService, public loadingCtrl: LoadingController) {
    this.loader = this.navParams.get("loading");
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.dataService.getColorList().then(
      data => { this.itemList = <any>data; this.loader.dismiss(); },
      error => { this.itemList = []; this.errorMessage = <any>error; }
    );
  }

}

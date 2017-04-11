import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
//import { DataService } from '../../providers/data-service/data-service';
import { StaticService } from '../../static-service/static-data';

@Component({
  selector: 'page-pgark',
  templateUrl: 'pgark.html',
  providers: [StaticService]
})

export class pgarkPage {
  pgSettings: any[];
  errorMessage: string;
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public StaticService: StaticService, public loadingCtrl: LoadingController) {
    this.loader = this.navParams.get("loading");
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.StaticService.getPGsettings().then(
        data => { this.pgSettings = data; this.loader.dismiss(); },
        error => { this.errorMessage = <any>error; }
    );
  }

}

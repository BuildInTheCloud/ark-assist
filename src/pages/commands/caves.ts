import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
//import { DataService } from '../../providers/data-service/data-service';
import { StaticService } from '../../static-service/static-data';

@Component({
  selector: 'page-caves',
  templateUrl: 'caves.html',
  providers: [StaticService]
})

export class CavesPage {
  islandCaves:any[];
  centerCaves:any[];
  scorchedCaves:any[];
  errorMessage: string;
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public StaticService: StaticService, public loadingCtrl: LoadingController) {
    this.loader = this.navParams.get("loading");
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.StaticService.getCaves().then(
        data => {
          this.islandCaves = [];
          this.centerCaves = [];
          this.scorchedCaves = [];
          for (var x = 0; x < data.length; x++) {
            if (data[x].map == "island") {
              this.islandCaves.push(data[x]);
            }
            if (data[x].map == "center") {
              this.centerCaves.push(data[x]);
            }
            if (data[x].map == "scorched") {
              this.scorchedCaves.push(data[x]);
            }
          }
          this.loader.dismiss();
        },
        error => { this.errorMessage = <any>error; }
    );
  }

}

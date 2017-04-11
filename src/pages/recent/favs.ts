import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
//import { DataService } from '../../providers/data-service/data-service';
import { StaticService } from '../../static-service/static-data';

@Component({
  selector: 'page-favs',
  templateUrl: 'favs.html',
  providers: [StaticService]
})

export class FavsPage {
  entityList:any[];
  errorMessage: string;
  xboxErrorMessage: string;
  loader: any;

  constructor(public navCtrl: NavController, public dataService: StaticService, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.loader = this.navParams.get("loading");
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.dataService.getFavsList()
      .subscribe(
        data => { this.entityList = data; this.loader.dismiss(); },
        error => { this.entityList = []; this.errorMessage = <any>error; }
      )
    ;
  }

}

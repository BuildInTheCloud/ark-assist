import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
//import { DataService } from '../../providers/data-service/data-service';
import { StaticService } from '../../static-service/static-data';

@Component({
  selector: 'page-commands',
  templateUrl: 'commands.html',
  providers: [StaticService]
})

export class CommandsPage {
  cmdList:any[];
  errorMessage: string;
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: StaticService, public loadingCtrl: LoadingController) {
    this.loader = this.navParams.get("loading");
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.dataService.getCommandList()
      .then(
        data => { this.cmdList = data; this.loader.dismiss(); },
        error => { this.cmdList = []; this.errorMessage = <any>error; }
      )
    ;
  }

}

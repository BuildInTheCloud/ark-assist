import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StaticService } from '../../static-service/static-data';

@Component({
  selector: 'page-explorer-notes',
  templateUrl: 'explorer.html',
  providers: [StaticService]
})

export class ExplorerNotesPage {
  category: string;
  pageTitle: string;
  entities: any[];

  constructor(public navCtrl: NavController, public dataService: StaticService, public navParams: NavParams) { }

  ngOnInit() {
    this.category = this.navParams.get("dataset");
    this.pageTitle = this.navParams.get("title");
    this.getList(this.navParams.get("dataset"));
  }

  getList(jsonFileName:string) {
    this.dataService.getEntityList(jsonFileName).then(
      data => { this.entities = data; },
      error => { this.entities = []; }
    );
  }

}

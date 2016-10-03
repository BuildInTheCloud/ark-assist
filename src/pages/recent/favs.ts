import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public dataService: StaticService) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.dataService.getFavsList()
      .subscribe(
        data => { this.entityList = data; },
        error => { this.entityList = []; this.errorMessage = <any>error; }
      )
    ;
  }

}

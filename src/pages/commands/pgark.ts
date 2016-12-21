import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public StaticService: StaticService) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.StaticService.getPGsettings().then(
        data => { this.pgSettings = data; },
        error => { this.errorMessage = <any>error; }
    );
  }

}

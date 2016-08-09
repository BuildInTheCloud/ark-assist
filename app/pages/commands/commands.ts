import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { DataService } from '../../providers/data-service/data-service';
import { StaticService } from '../../static-service/static-data';

@Component({
  templateUrl: 'build/pages/commands/commands.html',
  providers: [StaticService]
})

export class AdminPage {
  cmdList:any[];
  errorMessage: string;

  constructor(private navCtrl: NavController, private dataService: StaticService) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.dataService.getCommandList()
      .subscribe(
        data => { this.cmdList = data; },
        error => { this.cmdList = []; this.errorMessage = <any>error; }
      )
    ;
  }

}

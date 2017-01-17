import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public dataService: StaticService) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.dataService.getCommandList()
      .then(
        data => { this.cmdList = data; },
        error => { this.cmdList = []; this.errorMessage = <any>error; }
      )
    ;
  }

}


import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StaticService } from '../../static-service/static-data';

@Component({
  selector: 'page-color',
  templateUrl: 'color.html',
  providers: [StaticService]
})

export class ColorPage {
  itemList:any[];
  errorMessage: string;

  constructor(public navCtrl: NavController, public dataService: StaticService) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.dataService.getColorList()
      .subscribe(
        data => {
          this.itemList = data;
        },
        error => {
          this.itemList = [];
          this.errorMessage = <any>error;
        }
      )
    ;
  }

}

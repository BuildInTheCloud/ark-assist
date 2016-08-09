
import { Component } from '@angular/core';
import {DomSanitizationService} from '@angular/platform-browser';
import { NavController } from 'ionic-angular';
import { StaticService } from '../../static-service/static-data';

@Component({
  templateUrl: 'build/pages/color/color.html',
  providers: [StaticService]
})

export class ColorPage {
  itemList:any[];
  errorMessage: string;

  constructor(private navCtrl: NavController, private dataService: StaticService, private sanitizer: DomSanitizationService) { }

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

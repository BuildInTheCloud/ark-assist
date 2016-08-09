import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Clipboard, Toast} from 'ionic-native';
//import { DataService } from '../../providers/data-service/data-service';
import { StaticService } from '../../static-service/static-data';
import {} from "../../../globals";
declare var window: any;
declare var Windows: any;

@Component({
  templateUrl: 'build/pages/entity/entity.html',
  providers: [StaticService]
})

export class EntityPage {
  entities:any[];
  entityList:any[];
  errorMessage: string;
  pageTitle: string;
  searchFor: string;
  isCordovaApp:boolean = !!window.cordova;
  isWinJSApp:boolean = !!window.WinJS;

  constructor(private navCtrl: NavController, private dataService: StaticService, private navParams: NavParams) { }

  ngOnInit() {
    this.pageTitle = this.navParams.get("title");
    this.getList(this.navParams.get("dataset"));
  }

  getList(jsonFileName:string) {
    this.dataService.getEntityList(jsonFileName).then(
      data => {
        this.entities = data;
        this.entityList = this.entities;
      },
      error => { this.entities = []; this.entityList = []; this.errorMessage = <any>error; }
    );
  }

  onSearchInput(event) {
    var searchText = event.target.value;
    if (searchText == "" || searchText == undefined) {
      this.entityList = this.entities;
    } else {
      this.entityList = [];
      for (var x = 0; x < this.entities.length; x++) {
        if (this.entities[x].name && searchText) {
          if (this.entities[x].name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0) {
            this.entityList.push(this.entities[x]);
          }
        }
      }
    }
  }

  onSearchCancel(event) {
    this.entityList = this.entities;
  }

  copyText(indexVal:any) {
    var inputOBJ:any = document.getElementById("entity"+indexVal);
    if (this.isWinJSApp) {
      var dataPackage = new Windows.ApplicationModel.DataTransfer.DataPackage();
      dataPackage.setText(inputOBJ.innerText.replace(/\|/g,"\""));
      Windows.ApplicationModel.DataTransfer.Clipboard.setContent(dataPackage);
      var msgBox = new Windows.UI.Popups.MessageDialog("Copied: "+inputOBJ.innerText.replace(/\|/g,"\""));
      msgBox.showAsync();
    } else if (this.isCordovaApp) {
      Clipboard.copy(inputOBJ.innerText.replace(/\|/g,"\"")).then(function() {
          Toast.show("Copied: "+inputOBJ.innerText.replace(/\|/g,"\""), "short", "top").subscribe(toast => { console.log(toast); });
      }, function(err) {
          Toast.show("There was an error copying", "short", "top").subscribe(toast => { console.log(toast); });
      });
    } else {
      //-- web browser code
    }
  }

}

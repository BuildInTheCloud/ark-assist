import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Clipboard, Toast } from 'ionic-native';
//import { DataService } from '../../providers/data-service/data-service';
import { StaticService } from '../../static-service/static-data';
declare var window: any;
declare var Windows: any;

@Component({
  templateUrl: 'build/pages/dino/dino.html',
  providers: [StaticService]
})

export class DinoPage {
  dinos:any[];
  dinoList:any[];
  errorMessage: string;
  searchFor:string;
  isCordovaApp:boolean = !!window.cordova;
  isWinJSApp:boolean = !!window.WinJS;

  constructor(private navCtrl: NavController, private StaticService: StaticService) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.StaticService.getDinoList().then(
      data => {
        this.dinos = data;
        this.dinoList = this.dinos;
        console.log(this.dinos);
      },
      error => { this.dinos = []; this.dinoList = []; this.errorMessage = <any>error; }
    );
  }

  onSearchInput(event) {
    var searchText = event.target.value;
    if (searchText == "" || searchText == undefined) {
      this.dinoList = this.dinos;
    } else {
      this.dinoList = [];
      for (var x = 0; x < this.dinos.length; x++) {
        if (this.dinos[x].name && searchText) {
          if (this.dinos[x].name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0) {
            this.dinoList.push(this.dinos[x]);
          }
        }
      }
    }
  }

  onSearchCancel(event) {
    this.dinoList = this.dinos;
  }

  copyText(indexVal:any) {
    var inputOBJ:any = document.getElementById("dino"+indexVal);
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

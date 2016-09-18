import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import {Clipboard, Toast} from 'ionic-native';
//import { DataService } from '../../providers/data-service/data-service';
import { StaticService } from '../../static-service/static-data';
import {} from "../../../globals";
declare var window: any;
declare var Windows: any;
declare var document: any;

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

  constructor(private navCtrl: NavController, private dataService: StaticService, private navParams: NavParams, private platform: Platform) {
    this.platform = platform;
  }

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
    if (this.platform.is("core")) {
      var holdtext:any = document.getElementById("holdtext");
      holdtext.innerText = inputOBJ.innerText.replace(/\|/g,"\"");
      this.selectElementText(holdtext);
      var copysuccess = this.copySelectionText();
      alert((copysuccess ? "SUCCESSFUL COPY: ": "FAILED COPY: ") + holdtext.innerText);
    } else if (this.platform.is("windows")) {
      var dataPackage = new Windows.ApplicationModel.DataTransfer.DataPackage();
      dataPackage.setText(inputOBJ.innerText.replace(/\|/g,"\""));
      Windows.ApplicationModel.DataTransfer.Clipboard.setContent(dataPackage);
      var msgBox = new Windows.UI.Popups.MessageDialog("Copied: "+inputOBJ.innerText.replace(/\|/g,"\""));
      msgBox.showAsync();
    } else {
      Clipboard.copy(inputOBJ.innerText.replace(/\|/g,"\"")).then(function() {
          Toast.show("Copied: "+inputOBJ.innerText.replace(/\|/g,"\""), "short", "top").subscribe(toast => { console.log(toast); });
      }, function(err) {
          Toast.show("There was an error copying", "short", "top").subscribe(toast => { console.log(toast); });
      });
    }
  }

  selectElementText(el){
    var range = document.createRange() // create new range object
    range.selectNodeContents(el) // set range to encompass desired element text
    var selection = window.getSelection() // get Selection object from currently user selected text
    selection.removeAllRanges() // unselect any user selected text (if any)
    selection.addRange(range) // add range to Selection object to select it
  }

  copySelectionText(){
    var copysuccess // var to check whether execCommand successfully executed
    try{
      copysuccess = document.execCommand("copy") // run command to copy selected text to clipboard
    } catch(e){
      copysuccess = false
    }
    return copysuccess
  }

}

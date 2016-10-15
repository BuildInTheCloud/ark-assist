import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import {Clipboard, Toast} from 'ionic-native';
//import { DataService } from '../../providers/data-service/data-service';
import { StaticService } from '../../static-service/static-data';
declare var window: any;
declare var Windows: any;
declare var document: any;

@Component({
  selector: 'page-entity',
  templateUrl: 'entity.html',
  providers: [StaticService]
})

export class EntityPage {
  entities:any[];
  entityList:any[];
  errorMessage: string;
  pageTitle: string;
  searchFor: string;
  shouldShowCancel:boolean;
  quality: number = 0;
  category: string;

  constructor(public navCtrl: NavController, public dataService: StaticService, public navParams: NavParams, public platform: Platform, public toastCtrl: ToastController) {
    this.platform = platform;
  }

  ngOnInit() {
    this.category = this.navParams.get("dataset");
    this.pageTitle = this.navParams.get("title");
    this.getList(this.navParams.get("dataset"));
  }

  showQuality() {
    if (this.category == "armor" || this.category == "saddles" || this.category == "tools" || this.category == "weapons") {
      return true;
    } else {
      return false;
    }
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
    var pasteVAL = inputOBJ.innerText.replace(/\|/g,"\"");
    if (
          (this.platform.is("cordova") && this.platform.is("core")) ||
          (this.platform.is("cordova") && this.platform.is("mobile") && this.platform.is("windows"))
        ) {
      var dataPackage = new Windows.ApplicationModel.DataTransfer.DataPackage();
      dataPackage.setText(pasteVAL);
      Windows.ApplicationModel.DataTransfer.Clipboard.setContent(dataPackage);
      let toastPopup = this.toastCtrl.create({message: "Copied: "+pasteVAL, duration: 3000, position: 'top'});
      toastPopup.present();
    } else if (this.platform.is("cordova")) {
      Clipboard.copy(pasteVAL).then(function() {
        Toast.show("Copied: "+pasteVAL, "short", "top").subscribe(toast => { console.log(toast); });
      }, function(err) {
        Toast.show("There was an error copying to clipboard", "short", "top").subscribe(toast => { console.log(toast); });
      });
    } else {
      var holdtext:any = document.getElementById("holdtext");
      holdtext.innerText = pasteVAL;
      this.selectElementText(holdtext);
      var copysuccess = this.copySelectionText();
      let toastPopup = this.toastCtrl.create({message: (copysuccess ? "COPIED: ": "FAILED COPY: ") + holdtext.innerText, duration: 3000, position: 'top'});
      toastPopup.present();
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

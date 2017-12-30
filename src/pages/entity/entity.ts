import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ToastController, LoadingController } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { Toast } from '@ionic-native/toast/ngx';
//import { DataService } from '../../providers/data-service/data-service';
import { StaticService } from '../../static-service/static-data';
declare var Windows: any;
declare var document: any;

@Component({
  selector: 'page-entity',
  templateUrl: 'entity.html',
  providers: [StaticService, Clipboard, Toast]
})

export class EntityPage {
  entities:any[];
  entityList:any[];
  errorMessage: string;
  pageTitle: string;
  searchFor: string = "";
  shouldShowCancel:boolean;
  quality: number = 0;
  category: string;
  dlc: string;
  loader: any;

  constructor(public navCtrl: NavController, public dataService: StaticService, public navParams: NavParams,
              public platform: Platform, public toast: Toast, public clipboard: Clipboard,
              public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.loader = this.navParams.get("loading");
    this.platform = platform;
    this.toastCtrl = toastCtrl;
    this.toast = toast;
    this.clipboard = clipboard;
  }

  ngOnInit() {
    this.dlc = this.navParams.get("dlc");
    this.category = this.navParams.get("category");
    this.pageTitle = this.navParams.get("title");
    this.getList();
  }

  showQuality() {
    if (this.category == "armor" || this.category == "tools" || this.category == "weapons") {
      return true;
    } else {
      return false;
    }
  }

  getList() {
    this.dataService.getEntityList("craftable").then(
      data => {
        this.entities = [];
        if (this.category != "all") {
          for (var xx = 0; xx < data.length; xx++) {
            if (data[xx].category) {
              if (data[xx].category.toLowerCase() == this.category.toLowerCase()) {
                this.entities.push(data[xx]);
              }
            }
          }
        } else {
          this.entities = data;
        }
        if (this.dlc != "") {
          let tempData = this.entities;
          this.entities = [];
          for (var x = 0; x < tempData.length; x++) {
            if (tempData[x].dlc) {
              if (tempData[x].dlc.toLowerCase() == this.dlc.toLowerCase()) {
                this.entities.push(tempData[x]);
              }
            }
          }
        }
        this.entityList = this.entities;
        this.loader.dismiss();
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

  copyTextEvent(event, indexVal: string, type:any) {
    if (event.keyCode === 13 || event.keyCode === 195 || event.button === 0) {
      this.copyText(indexVal, type);
    }
  }

  copyText(indexVal:any, type:any, e?:any) {
    var inputOBJ:any = document.getElementById(type+indexVal);
    var pasteVAL = inputOBJ.innerText.replace(/\|/g,"\"");
    if (
          (this.platform.is("cordova") && this.platform.is("core")) ||
          (this.platform.is("cordova") && this.platform.is("mobile") && this.platform.is("windows"))
        ) {
      //console.log("FOR WINDOWS");
      var dataPackage = new Windows.ApplicationModel.DataTransfer.DataPackage();
      dataPackage.setText(pasteVAL);
      Windows.ApplicationModel.DataTransfer.Clipboard.setContent(dataPackage);
      let toastPopup = this.toastCtrl.create({message: "Copied: "+pasteVAL, duration: 3000, position: 'top'});
      toastPopup.present();
    } else if (this.platform.is("cordova")) {
      //console.log("FOR CORDOVA");
      this.clipboard.copy(pasteVAL);
      let toastPopup = this.toastCtrl.create({message: "Copied: "+pasteVAL, duration: 3000, position: 'top'});
      toastPopup.present();
    } else {
      //console.log("FOR BROWSER");
      var holdtext:any = document.getElementById("holdtext");
      holdtext.style.display = "block";
      holdtext.innerText = pasteVAL;
      holdtext.select();      
      document.execCommand('copy');
      let toastPopup = this.toastCtrl.create({ message: "COPIED: " + pasteVAL, duration: 3000, position: 'top' });
      toastPopup.present();
      holdtext.style.display = "none";
    }
  }

}

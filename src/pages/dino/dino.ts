import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ToastController, LoadingController } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';
import { Toast } from '@ionic-native/toast';
import { StaticService } from '../../static-service/static-data';
declare var Windows: any;

@Component({
  selector: 'page-dino',
  templateUrl: 'dino.html',
  providers: [StaticService, Clipboard, Toast]
})

export class DinoPage {
  dinos:any[];
  dinoList:any[];
  errorMessage: string;
  searchFor:string = "";
  shouldShowCancel:boolean;
  dinoLevel: number = 500;
  loader: any;

  constructor(public navCtrl: NavController, public StaticService: StaticService, public navParams: NavParams,
              public platform: Platform, public toast: Toast, public clipboard: Clipboard,
              public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.loader = this.navParams.get("loading");
    this.platform = platform;
    this.toastCtrl = toastCtrl;
    this.toast = toast;
    this.clipboard = clipboard;
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.StaticService.getDinoList().then(
      data => {
        this.dinos = data;
        this.dinoList = this.dinos;
        this.loader.dismiss();
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

  copyTextEvent(event, indexVal:any, type:any) {
    if (event.keyCode === 13 || event.keyCode === 195 || event.button === 0) {
      this.copyText(indexVal, type);
    }
  }

  copyText(indexVal:any, type:any) {
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

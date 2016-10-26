import { Component } from '@angular/core';
import { NavController, Platform, ToastController } from 'ionic-angular';
import {Clipboard, Toast } from 'ionic-native';
import { StaticService } from '../../static-service/static-data';
declare var window: any;
declare var Windows: any;

@Component({
  selector: 'page-dino',
  templateUrl: 'dino.html',
  providers: [StaticService]
})

export class DinoPage {
  dinos:any[];
  dinoList:any[];
  errorMessage: string;
  searchFor:string = "";
  shouldShowCancel:boolean;
  dinoLevel: number = 500;

  constructor(public navCtrl: NavController, public StaticService: StaticService,public platform: Platform, public toastCtrl: ToastController) {
    this.platform = platform;
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.StaticService.getDinoList().then(
      data => {
        this.dinos = data;
        this.dinoList = this.dinos;
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

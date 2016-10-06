import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import {Clipboard, Toast } from 'ionic-native';
//import { DataService } from '../../providers/data-service/data-service';
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
  searchFor:string;
  shouldShowCancel:boolean;
  dinoLevel: number = 500;

  constructor(public navCtrl: NavController, public StaticService: StaticService,public  platform: Platform) {
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

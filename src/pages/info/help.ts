import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-help',
  templateUrl: 'help.html'
})

export class HelpPage {
  entityList:any[];
  errorMessage: string;
  xboxErrorMessage: string;

  constructor(public navCtrl: NavController) { }

  ngOnInit() {

  }

}

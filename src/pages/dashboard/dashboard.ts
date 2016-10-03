import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EntityPage } from '../entity/entity';
import { DinoPage } from '../dino/dino';
import { ColorPage } from '../color/color';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})

export class DashboardPage {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {

  }

  goToPage( navTo: string ) {
    if (navTo == "dino") {
      this.navCtrl.push(DinoPage);
    } else if (navTo == "colors") {
      this.navCtrl.push(ColorPage);
    } else {
      this.navCtrl.push(EntityPage, { title: navTo, dataset: navTo.toLowerCase() } );
    }
  }

}

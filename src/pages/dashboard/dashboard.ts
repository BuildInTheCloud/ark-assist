import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EntityPage } from '../entity/entity';
import { DinoPage } from '../dino/dino';
import { ColorPage } from '../color/color';
import { NewsPage } from '../info/news';
import { ControlsPage } from '../commands/controls';
import { ExplorerNotesPage } from '../notes/explorer';
import { pgarkPage } from '../commands/pgark';
import { CavesPage } from '../commands/caves';
import { CommandsPage } from '../commands/commands';

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
    } else if (navTo == "News") {
      this.navCtrl.push(NewsPage);
    } else if (navTo == "Controls") {
      this.navCtrl.push(ControlsPage);
    } else if (navTo == "PGARK") {
      this.navCtrl.push(pgarkPage);
    } else if (navTo == "caves") {
      this.navCtrl.push(CavesPage);
    } else if (navTo == "commands") {
      this.navCtrl.push(CommandsPage);
    } else if (navTo == "Notes Island") {
      this.navCtrl.push(ExplorerNotesPage, { title: "The Island", dataset: "notes-island" } );
    } else if (navTo == "Notes Scorched") {
      this.navCtrl.push(ExplorerNotesPage, { title: "Scorched Earth", dataset: "notes-scorched" } );
    } else if (navTo == "Notes Center") {
      this.navCtrl.push(ExplorerNotesPage, { title: "The Center", dataset: "notes-center" } );
    } else {
      this.navCtrl.push(EntityPage, { title: navTo, dataset: navTo.toLowerCase() } );
    }
  }

}

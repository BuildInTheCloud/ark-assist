import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { EntityPage } from '../entity/entity';
import { DinoPage } from '../dino/dino';
import { ColorPage } from '../color/color';
import { NewsPage } from '../info/news';
import { ControlsPage } from '../commands/controls';
import { ExplorerNotesPage } from '../notes/explorer';
import { pgarkPage } from '../commands/pgark';
import { CavesPage } from '../commands/caves';
import { CommandsPage } from '../commands/commands';
import { AboutPage } from '../info/about';
import { HelpPage } from '../info/help';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})

export class DashboardPage {
  loader: any;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {

  }

  ngOnInit() {
  }

  goToPageByEvent(event, navTo: string) {
    if (event.keyCode === 13 || event.keyCode === 195 || event.button === 0) {
      this.goToPage(navTo);
    }
  }

  goToPage( navTo: string ) {
    let overlay = this.loadingCtrl.create({ content: "Loading " + navTo + " ..." });
    this.loader = overlay;
    this.loader.present().then(action => this.launchPage(navTo) );
  }

  launchPage(navTo: string ) {
    if (navTo == "dino") {
      this.navCtrl.push(DinoPage, {loading: this.loader} );
    } else if (navTo == "colors") {
      this.navCtrl.push(ColorPage, {loading: this.loader});
    } else if (navTo == "News") {
      this.navCtrl.push(NewsPage, {loading: this.loader});
    } else if (navTo == "Controls") {
      this.navCtrl.push(ControlsPage, {loading: this.loader});
    } else if (navTo == "PGARK") {
      this.navCtrl.push(pgarkPage, {loading: this.loader});
    } else if (navTo == "caves") {
      this.navCtrl.push(CavesPage, {loading: this.loader});
    } else if (navTo == "commands") {
      this.navCtrl.push(CommandsPage, {loading: this.loader});
    } else if (navTo == "Notes Island") {
      this.navCtrl.push(ExplorerNotesPage, { title: "The Island", dataset: "notes-island", loading: this.loader } );
    } else if (navTo == "Notes Scorched") {
      this.navCtrl.push(ExplorerNotesPage, { title: "Scorched Earth", dataset: "notes-scorched", loading: this.loader } );
    } else if (navTo == "Notes Center") {
      this.navCtrl.push(ExplorerNotesPage, { title: "The Center", dataset: "notes-center", loading: this.loader } );
    } else if (navTo == "help") {
      this.navCtrl.push(HelpPage, {loading: this.loader});
    } else if (navTo == "about") {
      this.navCtrl.push(AboutPage, {loading: this.loader});
    } else {
      this.navCtrl.push(EntityPage, { title: navTo, dataset: navTo.toLowerCase(), loading: this.loader } );
    }
  }

}

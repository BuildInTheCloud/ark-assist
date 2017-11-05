import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import {AdMob, AdMobOptions, AdSize, AdExtras} from '@ionic-native/admob';
import { AdMob } from '@ionic-native/admob';
import { Clipboard } from '@ionic-native/clipboard';
import { Toast } from '@ionic-native/toast';
import { ClipboardModule } from 'ngx-clipboard';

import { MyApp } from './app.component';
import { ColorPage } from '../pages/color/color';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { DinoPage } from '../pages/dino/dino';
import { EntityPage } from '../pages/entity/entity';
import { AboutPage } from '../pages/info/about';
import { HelpPage } from '../pages/info/help';
import { FavsPage } from '../pages/recent/favs';
import { NewsPage } from '../pages/info/news';
import { ControlsPage } from '../pages/commands/controls';
import { ExplorerNotesPage } from '../pages/notes/explorer';
import { pgarkPage } from '../pages/commands/pgark';
import { CavesPage } from '../pages/commands/caves';
import { CommandsPage } from '../pages/commands/commands';

@NgModule({
  declarations: [
    MyApp,
    ColorPage,
    CommandsPage,
    DashboardPage,
    DinoPage,
    EntityPage,
    AboutPage,
    HelpPage,
    FavsPage,
    NewsPage,
    ControlsPage,
    ExplorerNotesPage,
    pgarkPage,
    CavesPage
  ],
  imports: [
    ClipboardModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ColorPage,
    CommandsPage,
    DashboardPage,
    DinoPage,
    EntityPage,
    AboutPage,
    HelpPage,
    FavsPage,
    NewsPage,
    ControlsPage,
    ExplorerNotesPage,
    pgarkPage,
    CavesPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler },
    StatusBar,
    SplashScreen,
    AdMob,
    Clipboard,
    Toast
  ]
})
export class AppModule {}

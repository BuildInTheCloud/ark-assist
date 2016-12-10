import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ColorPage } from '../pages/color/color';
import { AdminPage } from '../pages/commands/commands';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { DinoPage } from '../pages/dino/dino';
import { EntityPage } from '../pages/entity/entity';
import { AboutPage } from '../pages/info/about';
import { HelpPage } from '../pages/info/help';
import { FavsPage } from '../pages/recent/favs';
import { NewsPage } from '../pages/info/news';
import { ControlsPage } from '../pages/commands/controls';
import { ExplorerNotesPage } from '../pages/notes/explorer';

@NgModule({
  declarations: [
    MyApp,
    ColorPage,
    AdminPage,
    DashboardPage,
    DinoPage,
    EntityPage,
    AboutPage,
    HelpPage,
    FavsPage,
    NewsPage,
    ControlsPage,
    ExplorerNotesPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ColorPage,
    AdminPage,
    DashboardPage,
    DinoPage,
    EntityPage,
    AboutPage,
    HelpPage,
    FavsPage,
    NewsPage,
    ControlsPage,
    ExplorerNotesPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

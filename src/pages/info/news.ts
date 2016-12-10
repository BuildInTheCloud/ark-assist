import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})

export class NewsPage {
  errorMessage: string;
  xboxErrorMessage: string;

  constructor(public navCtrl: NavController) { }

  ngOnInit() {

  }

}

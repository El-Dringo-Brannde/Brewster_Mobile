import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-beer-detail',
  templateUrl: 'beer-detail.html',
})
export class BeerDetailPage {
   private beer = {}; 

  constructor(
     public navCtrl: NavController, 
     public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.beer = this.navParams.get('beer');
  }

}

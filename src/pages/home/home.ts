import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ReviewPage } from './../review/review';
import { NewBeerPage } from './../new-beer/new-beer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }

  goToReviews(){
     this.navCtrl.push(ReviewPage);
  }

  goToNew(){
     this.navCtrl.push(NewBeerPage);
  }

}

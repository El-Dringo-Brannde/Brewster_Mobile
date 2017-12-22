import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ServerUrlProvider } from './../../providers/server-url/server-url';
import { BeerDetailPage } from './../beer-detail/beer-detail';
import { BeersProvider } from './../../providers/beers/beers';

@Component({
   selector: 'page-review',
   templateUrl: 'review.html',
})
export class ReviewPage {
   public hardSave = []; 
   public searchInput = '';
   public beersObj = {
         hardSave: <any>[],
         beers:<any> []
   };

   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public http: HttpClient,
      public server: ServerUrlProvider,
      public beers: BeersProvider,
      public sanitizer: DomSanitizer
   ) { }

   ionViewDidLoad() {
      this.getBeers();
   }

   getItems(){
      this.beersObj.beers = this.beersObj.hardSave; 
      if (this.searchInput && this.searchInput.trim() != '') {
         this.beersObj.beers = this.beersObj.beers.filter((item) => {
            return (item.name.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1);
         });
      }
   }

   async getBeers() {
      this.beersObj = await this.beers.getBeers()
   }

   viewBeer(beer){
      this.navCtrl.push(BeerDetailPage, { beer: beer});
   }

}

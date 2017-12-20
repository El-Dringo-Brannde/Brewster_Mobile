import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ServerUrlProvider } from './../../providers/server-url/server-url';
import { BeerDetailPage } from './../beer-detail/beer-detail';

@Component({
   selector: 'page-review',
   templateUrl: 'review.html',
})
export class ReviewPage {
   public beers = [];
   public hardSave = [];
   public searchInput = '';
   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public http: HttpClient,
      public server: ServerUrlProvider,
      public sanitizer: DomSanitizer
   ) { }

   ionViewDidLoad() {
      this.getBeers();
   }

   getItems(){
      this.beers = this.hardSave; 
      if (this.searchInput && this.searchInput.trim() != '') {
         this.beers = this.beers.filter((item) => {
            return (item.name.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1);
         })
      }
   }

   getBeers() {
      this.http.get(this.server.url() + '/beer')
         .subscribe((succ:any) => {
            this.beers = succ.map(el => {
               if(el.photo)
                  el.photo = this.sanitizer.bypassSecurityTrustUrl(el.photo);
               return el
            });
            this.hardSave = this.beers;
         });
   }

   viewBeer(beer){
      this.navCtrl.push(BeerDetailPage, { beer: beer});
   }

}

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

   getBeers() {
      this.http.get(this.server.url() + '/beer')
         .subscribe((succ:any) => {
            this.beers = succ.map(el => {
               if(el.photo)
                  el.photo = this.sanitizer.bypassSecurityTrustUrl(el.photo);
               return el
            });
         });
   }

   viewBeer(beer){
      this.navCtrl.push(BeerDetailPage, { beer: beer});
   }

}

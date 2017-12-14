import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClient } from '@angular/common/http';
import { ServerUrlProvider } from '../../providers/server-url/server-url';

@Component({
   selector: 'page-new-beer',
   templateUrl: 'new-beer.html',
})
export class NewBeerPage {
   private review = {
      photo:  null
   }
   private photoTaken:boolean = false;

   public options: CameraOptions = {
      quality: 10,
      targetHeight: 250, 
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true
   }

   constructor(public navCtrl: NavController,
      public navParams: NavParams,
      public camera: Camera,
      public http: HttpClient, 
      public server: ServerUrlProvider) { }


   openPhoto() {
      this.camera.getPicture(this.options).then(img => this.review.photo = "data:image/jpeg;base64," + img);
      this.photoTaken = true;

   }

   retakePhoto() {
      this.review.photo = null;
      this.camera.getPicture(this.options).then(img => this.review.photo = "data:image/jpeg;base64," + img)
   }

   submitReview(review){
      this.http.post(this.server.url() + '/beer', review)
         .subscribe((succ:any) => console.log(succ))
   }
    

   ionViewDidLoad() {
      console.log('ionViewDidLoad NewBeerPage');
   }

}

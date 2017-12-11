import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';


/**
 * Generated class for the NewBeerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-beer',
  templateUrl: 'new-beer.html',
})
export class NewBeerPage {
   public photo; 

   public options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
   }

  constructor(public navCtrl: NavController, 
      public navParams: NavParams,  
      public camera: Camera, 
      public sanitizer: DomSanitizer) {
  }
   
  
  openPhoto(){
      this.camera.getPicture(this.options).then(img =>{
         this.photo = "data:image/jpeg;base64," + img;
      })
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewBeerPage');
  }

}

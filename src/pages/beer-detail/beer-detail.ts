import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ServerUrlProvider } from '../../providers/server-url/server-url';


@Component({
  selector: 'page-beer-detail',
  templateUrl: 'beer-detail.html',
})
export class BeerDetailPage {
   private beer = { photo: '' }; 
   public options: CameraOptions = {
      quality: 10,
      targetHeight: 250, 
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true
   }

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public camera: Camera, 
      public http: HttpClient, 
      public toastr: ToastController,
      public server: ServerUrlProvider) {
  }

  ionViewDidLoad() {
    this.beer = this.navParams.get('beer');
    if (!this.beer.photo)
      this.beer.photo = 'https://i.imgur.com/Lz48tgp.jpg'
  }

  createToast(field, value){
     this.http.put(this.server.url() + '/beer', {
         data: this.beer,
         field: field, 
         value: value
      })  
      .subscribe(() => this.toastr.create({
            message: "Edited successfully!",
            duration: 1000,
            position: 'top'
         }).present())
  }

  deleteBeer(beer){
     console.log(beer)
     this.http.delete(this.server.url()+ '/beer', beer)
      .subscribe(() => {
         this.navCtrl.pop();
      })

  }

  retakePhoto() {
   this.camera.getPicture(this.options).then(img => this.beer.photo = "data:image/jpeg;base64," + img)
   }

}

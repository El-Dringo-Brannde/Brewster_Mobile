import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClient } from '@angular/common/http';
import { ServerUrlProvider } from '../../providers/server-url/server-url';
import { DomSanitizer } from '@angular/platform-browser';
import { 
   ToastController,
   AlertController
} from 'ionic-angular';

@Component({
   selector: 'page-new-beer',
   templateUrl: 'new-beer.html',
})
export class NewBeerPage {
   private review = {
      photo: <any>'', 
      name: '', 
      brewery: '',
      type: '',
      appearance: '',
      aroma: '',
      taste: '',
      rating: ''
   }
   private photoTaken:boolean = false;
   private submitting: boolean = false; 
   public options: CameraOptions = {
      quality: 10,
      targetHeight: 500, 
      destinationType: 0,
      encodingType: 1,
      allowEdit: true
   }

   constructor(public navCtrl: NavController,
      public navParams: NavParams,
      public camera: Camera,
      public http: HttpClient, 
      public server: ServerUrlProvider,
      public toastr: ToastController,
      public sanitizer: DomSanitizer,
      public alert: AlertController) { }


   openPhoto() {
      this.camera.getPicture(this.options).then(img => {
         this.review.photo = "data:image/png;base64," + img
         this.review.photo = this.sanitizer.bypassSecurityTrustUrl(this.review.photo);
      });
      this.photoTaken = true;
   }

   retakePhoto() {
      this.review.photo = null;
      this.camera.getPicture(this.options).then(img => {
         this.review.photo = "data:image/jpeg;base64," + img
         
      })
   }

   submitReview(review){
      console.log(this.review)
      if(!this.review.photo){
         this.alert.create({
            title: "Submission Error", 
            subTitle: "Please take a photo for submission",
            buttons: ["OK"]
         }).present();
      } else{
      this.submitting = true; 
      this.http.post(this.server.url() + '/beer', review)
         .subscribe((succ:any) => {
            this.toastr.create({
            message: "Submitted successfully!",
            duration: 1000,
            position: 'top'
         }).present() 
         this.resetReview();
         this.submitting = false; 
         this.photoTaken = false;
      })
      }
   }

   resetReview(){
      this.review = {
         photo: '', 
         name: '', 
         brewery: '',
         type: '',
         appearance: '',
         aroma: '',
         taste: '',
         rating: ''
      };
   }
    

   ionViewDidLoad() {
      console.log('ionViewDidLoad NewBeerPage');
   }

}

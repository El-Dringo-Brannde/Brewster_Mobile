import {
   Component
} from '@angular/core';
import {
   NavController,
   NavParams
} from 'ionic-angular';
import {
   Camera,
   CameraOptions
} from '@ionic-native/camera';
import {
   HttpClient
} from '@angular/common/http';
import {
   ServerUrlProvider
} from '../../providers/server-url/server-url';
import {
   ToastController,
   AlertController
} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
   selector: 'page-new-beer',
   templateUrl: 'new-beer.html',
})
export class NewBeerPage {
   private review = {
      photo: null,
      name: '',
      brewery: '',
      type: '',
      appearance: '',
      aroma: '',
      taste: '',
      rating: '', 
      user: ''
   }
   private photoTaken: boolean = false;
   private submitting: boolean = false;
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
      public server: ServerUrlProvider,
      public toastr: ToastController,
      public storage: Storage,
      public sanitizer: DomSanitizer,
      public alert: AlertController) {
         this.storage.get('user')
            .then(val => this.review.user = val)
      }


   openPhoto() {
      this.camera.getPicture(this.options).then(img => {
            this.review.photo = this.sanitizer.bypassSecurityTrustUrl("data:image/jpeg;base64," + img)
      });
      this.photoTaken = true;
   }

   retakePhoto() {
      this.review.photo = null;
      this.camera.getPicture(this.options).then(img => this.review.photo = "data:image/jpeg;base64," + img)
   }

   submitReview(review) {
      if (!this.review.photo) {
         this.alert.create({
            title: "Submission Error",
            subTitle: "Please take a photo for submission",
            buttons: ["OK"]
         }).present();
      } else {
         this.submitting = true;
         this.http.post(this.server.url() + '/beer', review)
            .subscribe((succ: any) => {
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

   resetReview() {
      this.review = {
         photo: '',
         name: '',
         brewery: '',
         type: '',
         appearance: '',
         aroma: '',
         taste: '',
         rating: '', 
         user: ''
      };
   }


   ionViewDidLoad() {
      console.log('ionViewDidLoad NewBeerPage');
   }

}
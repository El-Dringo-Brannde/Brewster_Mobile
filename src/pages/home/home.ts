import {
  Component,
  ElementRef,
} from '@angular/core';
import {
  NavController,
  ModalController
} from 'ionic-angular';
import { ReviewPage } from './../review/review';
import { NewBeerPage } from './../new-beer/new-beer';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { LoginPage } from './../login/login';


declare var google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  public searchElementRef: ElementRef;
  public userLatitude: number;
  public userLongitude: number;
  public zoom: number;
  public nearbyLocations: Array<any> = []; 

  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation, 
    private alert: AlertController,
    private storage: Storage, 
    private modal: ModalController) { 
      this.checkLogin(); 
      this.setCurrentPosition();
      this.zoom = 12;
    }

  private checkLogin(){
    this.storage.set('age', '');
    this.storage.get('age').then(val => {
      console.log(val)
      if(!val){
        console.log('alsdkjf')
        this.modal.create(LoginPage,{}, {
          showBackdrop: false, 
          enableBackdropDismiss: false
        }).present();
      }

        
      else   
        this.alert.create({
          title: val
        }).present()

    });
  }

  private setCurrentPosition() {
    this.geolocation.getCurrentPosition({enableHighAccuracy : true}).then((resp) => {
      this.userLatitude = resp.coords.latitude;
      this.userLongitude = resp.coords.longitude;
      var myLocation = new google.maps.LatLng(this.userLatitude, this.userLongitude);
      var map = new google.maps.Map(document.getElementById('map'), {
        center: myLocation
      });

      var barsAroundUser = new google.maps.places.PlacesService(map);
      var request = {
        location: myLocation,
        radius: '500',
        query: 'bar'
      };

      barsAroundUser.textSearch(request, res => {
        for (var el of res){
          this.nearbyLocations.push({
            latitude: el.geometry.location.lat(), 
            longitude: el.geometry.location.lng(),
            name: el.name, 
            address: el.formatted_address
          })
        } // ghetto hack since .map wasn't wanting to work
      });
    }).catch((err) => setTimeout(() => {
      this.setCurrentPosition()
    }, 500))
  }

  
  goToReviews() {
    this.navCtrl.push(ReviewPage);
  }

  goToNew() {
    this.navCtrl.push(NewBeerPage);
  }

}

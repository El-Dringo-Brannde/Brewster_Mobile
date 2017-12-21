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
import { LoginPage } from './../login/login';
import { HttpClient } from '@angular/common/http';
import { ServerUrlProvider } from './../../providers/server-url/server-url';
import { DomSanitizer } from '@angular/platform-browser';


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
  public loggedInUser: string; 
  public beers: Array<any> = [];
  public favorites: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation, 
    private storage: Storage, 
    private http: HttpClient,
    private server: ServerUrlProvider,
    private sanitizer: DomSanitizer,
    private modal: ModalController) { 
      this.checkLogin(); 
      this.setCurrentPosition();
      this.zoom = 12;
    }

  ionViewDidLoad(){
    this.checkLogin();
  }

  private checkLogin(){
    this.storage.get('user').then(val => {
      if(!val){
        this.modal.create(LoginPage,{}, {
          showBackdrop: false, 
          enableBackdropDismiss: false
        }).present();
      } else{ 
        this.loggedInUser = val;
        this.getBeers(val);
      } 
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

  getBeers(user) {
    this.http.get(this.server.url() + '/beer/' + user)
       .subscribe((succ: any) => {
          this.beers = succ.map(el => {
             if (el.photo)
                el.photo = this.sanitizer.bypassSecurityTrustUrl(el.photo);
             return el
          });
          this.favorites = this.beers.sort((a, b) => {
            return b.rating - a.rating
          })
       });
 }

  
  goToReviews() {
    this.navCtrl.push(ReviewPage, {
      user: this.loggedInUser
    });
  }

  goToNew() {
    this.navCtrl.push(NewBeerPage);
  }

}

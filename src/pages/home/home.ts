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
import { BeersProvider } from './../../providers/beers/beers';


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
  public beersObj = {
    beers:[], 
    hardSave: []
  }

  constructor(
    public navCtrl: NavController,
    public beers: BeersProvider,
    private geolocation: Geolocation) { 
    this.setCurrentPosition();
    this.zoom = 12;
  }

  async ionViewDidLoad(){
    this.beersObj = await this.beers.getBeers();
    this.sortBeers();
  }

  sortBeers(){
    this.beersObj.beers = this.beersObj.beers.map(x => Object.assign({}, x)).reverse();
    this.beersObj.hardSave = this.beersObj.hardSave.sort(function(a,b) { 
      return b.rating - a.rating;
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

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private login: boolean = true; 

  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {}

  switchLoginSignUp(){
    this.login = !this.login; 
  }

}

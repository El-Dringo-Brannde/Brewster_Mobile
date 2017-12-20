import { Component } from '@angular/core';
import { ServerUrlProvider } from './../../providers/server-url/server-url';
import { HttpClient } from '@angular/common/http';
import {
   NavController,
   NavParams,
   ViewController,
   ToastController,
} from 'ionic-angular';

import { Storage } from '@ionic/storage';


@Component({
   selector: 'page-login',
   templateUrl: 'login.html',
})
export class LoginPage {
   private login: boolean = true;
   private safe: boolean = true; 
   private username: string; 
   private newUsername: string; 
   private password: string; 
   private confirmPassword: string;
   

   constructor(public navCtrl: NavController,
      public navParams: NavParams, 
      public server: ServerUrlProvider, 
      public viewCtrl: ViewController,
      public toast: ToastController,
      private storage: Storage,
      public http: HttpClient) {}

   switchLoginSignUp() {
      this.login = !this.login;
   }

   submit() {
      if (this.login) 
        this.loginUser();
      else
        this.signUpUser();    
   }

   loginUser(){
    this.http.put(this.server.url() + '/user', {
      username: this.username,
      password: this.password
    })
    .subscribe((succ: any) => {
      if(succ.length != 0){   
        this.viewCtrl.dismiss();
        this.toast.create({
          message: 'Login Successful!', 
          position: 'bottom', 
          duration: 1000
        }).present();
        this.storage.set('user', succ[0].username);
      } else {
        this.toast.create({
          message: 'Invalid Login!', 
          position: 'bottom', 
          duration: 1000
        }).present();
      }
    })
   }

   checkUsername(){
    this.http.get(this.server.url() + '/user')
    .subscribe((succ: any) => {
      succ.map(el => {
        if(el.username == this.newUsername){
          this.safe = false; 
          this.toast.create({
            message: 'Username already taken!', 
            position: 'bottom', 
            duration: 1000
          }).present();
        } else
          this.safe = true; 
      })
    })
   }

   signUpUser(){
    if(this.password != this.confirmPassword){
      this.toast.create({
        message: 'Passwords do not match!', 
        position: 'bottom', 
        duration: 1000
      }).present();
     } else {
      this.http.post(this.server.url() + '/user', {
        username: this.newUsername,
        password: this.password
      })
      .subscribe((succ: any) => {
        this.toast.create({
          message: 'Profile Created!', 
          position: 'bottom', 
          duration: 1000
        }).present();
        this.viewCtrl.dismiss()
      })
     }
   }
}
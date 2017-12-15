import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ServerUrlProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServerUrlProvider {
   public serverURL: string = 'http://34.215.212.179:3105';
   constructor(public http: HttpClient) {
      console.log('Hello ServerUrlProvider Provider');
   }

   url() {
      return this.serverURL;
   }

}

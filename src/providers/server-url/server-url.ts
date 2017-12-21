import {
   HttpClient
} from '@angular/common/http';
import {
   Injectable
} from '@angular/core';

@Injectable()
export class ServerUrlProvider {
   public serverURL: string = 'http://34.215.212.179:3333';
   constructor(public http: HttpClient) {
      console.log('Hello ServerUrlProvider Provider');
   }

   url() {
      return this.serverURL;
   }

}
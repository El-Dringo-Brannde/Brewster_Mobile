import {
   HttpClient
} from '@angular/common/http';
import {
   Injectable
} from '@angular/core';

@Injectable()
export class ServerUrlProvider {
   public serverURL: string = 'http://localhost:3105';
   constructor(public http: HttpClient) {
      console.log('Hello ServerUrlProvider Provider');
   }

   url() {
      return this.serverURL;
   }

}
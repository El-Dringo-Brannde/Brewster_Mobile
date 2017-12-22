import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerUrlProvider } from './../../providers/server-url/server-url';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class BeersProvider {
  public beers = []; 
  public hardSave = [];

  constructor(public http: HttpClient,
    public sanitizer: DomSanitizer,
    public server: ServerUrlProvider) {
    console.log('Hello BeersProvider Provider');
  }

  async getBeers() : Promise<any>{
    return new Promise((res,rej) =>{
      this.http.get(this.server.url() + '/beer')
       .subscribe((succ:any) => {
          this.beers = succ.map(el => {
             if(el.photo)
                el.photo = this.sanitizer.bypassSecurityTrustUrl(el.photo);
             return el
          });
          this.hardSave = this.beers;
          res({
            hardSave: this.hardSave, 
            beers: this.beers
          })
       });
    });
 }
}

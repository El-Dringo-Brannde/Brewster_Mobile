import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { 
    IonicApp, 
    IonicErrorHandler, 
    IonicModule
} from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ReviewPage } from '../pages/review/review';
import { NewBeerPage } from '../pages/new-beer/new-beer';
import { BeerDetailPage } from '../pages/beer-detail/beer-detail';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Native modules 
import { Camera } from '@ionic-native/camera';
import { IonicStorageModule } from '@ionic/storage';
import { ServerUrlProvider } from '../providers/server-url/server-url';
import { AgmCoreModule } from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
   declarations: [
      MyApp,
      HomePage,
      ListPage,
      ReviewPage,
      NewBeerPage,
      BeerDetailPage, 
      LoginPage
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      IonicStorageModule.forRoot(),
      IonicModule.forRoot(MyApp),
      AgmCoreModule.forRoot({
         apiKey: 'AIzaSyBJEVphlYl0fGRo3o4l07GWDYDgcmt4uHA', 
         libraries: ['places']
       })
   ],
   bootstrap: [IonicApp],
   entryComponents: [
      MyApp,
      HomePage,
      ListPage,
      ReviewPage,
      NewBeerPage,
      BeerDetailPage,
      LoginPage
   ],
   providers: [
      StatusBar,
      SplashScreen,
      { provide: ErrorHandler, useClass: IonicErrorHandler },
      Camera,
      ServerUrlProvider,
      Geolocation
   ]
})
export class AppModule { }

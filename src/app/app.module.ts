import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ReviewPage } from '../pages/review/review';
import { NewBeerPage } from '../pages/new-beer/new-beer';
import { LoginPage } from '../pages/login/login';
import { BeerDetailPage } from '../pages/beer-detail/beer-detail';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Native modules 
import { Camera } from '@ionic-native/camera';
import { IonicStorageModule } from '@ionic/storage';
import { ServerUrlProvider } from '../providers/server-url/server-url';

@NgModule({
   declarations: [
      MyApp,
      HomePage,
      ListPage,
      ReviewPage,
      NewBeerPage,
      BeerDetailPage
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      IonicModule.forRoot(MyApp),
      IonicStorageModule.forRoot()
   ],
   bootstrap: [IonicApp],
   entryComponents: [
      MyApp,
      HomePage,
      ListPage,
      ReviewPage,
      NewBeerPage,
      BeerDetailPage
   ],
   providers: [
      StatusBar,
      SplashScreen,
      { provide: ErrorHandler, useClass: IonicErrorHandler },
      Camera,
      ServerUrlProvider,

   ]
})
export class AppModule { }

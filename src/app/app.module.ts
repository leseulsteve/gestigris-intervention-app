import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';

import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeModule } from './home/home.module';
import { AboutModule } from './about/about.module';
import { LoginModule } from './login/login.module';
import { EtablissementModule } from '@app/etablissement';
import { InterventionModule } from '@app/intervention';
import { DiscussionModule } from '@app/discussion';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    IonicModule.forRoot(AppComponent, { locationStrategy: 'path' }),
    CoreModule,
    SharedModule,
    HomeModule,
    AboutModule,
    LoginModule,
    EtablissementModule,
    InterventionModule,
    DiscussionModule,
    AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [
    Keyboard,
    StatusBar,
    SplashScreen,
    AngularFirestore,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ],
  bootstrap: [
    IonicApp,
    AppComponent 
  ]
})
export class AppModule { }

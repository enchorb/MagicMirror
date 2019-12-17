import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import 'hammerjs';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';

// Modules
import {SharedModule} from './modules/shared/shared.module';

// Components
import { AppComponent } from './app.component';

// Services
import { ModuleService } from './services/module.service';
import { UserService } from './services/user.service';
import { WeatherService } from './services/weather.service';
import { ComplimentService } from './services/compliment.service';
import { NewsFeedService } from './services/newsfeed.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'magic-mirror'),
    AngularFirestoreModule,
  ],
  providers: [ModuleService, UserService, WeatherService, ComplimentService, NewsFeedService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

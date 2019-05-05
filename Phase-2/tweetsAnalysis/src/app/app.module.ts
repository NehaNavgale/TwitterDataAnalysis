import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartsModule} from 'ng2-charts';
import { CharactersComponent } from './characters/characters.component';
import { YearwisechartComponent } from './yearwisechart/yearwisechart.component';
import { TweetsForMoviesComponent } from './tweets-for-movies/tweets-for-movies.component';
import { HashtagsComponent } from './hashtags/hashtags.component';

import { MapComponent } from './map/map.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { LanguageComponent } from './language/language.component';

@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    YearwisechartComponent,
    TweetsForMoviesComponent,
    HashtagsComponent,
    MapComponent,
    LanguageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    HttpClientModule,
    GoogleChartsModule.forRoot('AIzaSyAohWG1VqFhEHkxpXRV77aHYoGyRZB1ktU')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

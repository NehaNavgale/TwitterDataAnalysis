import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Data} from './locationData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tweetsAnalysis';
  geo_data = [];
  constructor(private http: HttpClient) {this.mapData(); }
  mapData() {
    console.log('inside');
    this.http.get('https://pbbackendanalysis.herokuapp.com/api/byEndGameLocation').subscribe((data: Data[]) => {
      data.forEach(y => {
        console.log(y.Location);
        this.geo_data.push([y.Location, y.NumberOfTweets]);
      });
      console.log('geo' + this.geo_data);
    }, error => {});
  }
}

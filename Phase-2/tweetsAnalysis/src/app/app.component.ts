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
    this.http.get('https://pbbackendanalysis.herokuapp.com/api/byCountry').subscribe((data: Data[]) => {
      data.forEach(y => {
        this.geo_data.push([y.location, y.count]);
      });
      console.log(this.geo_data);
    }, error => {});
  }
}

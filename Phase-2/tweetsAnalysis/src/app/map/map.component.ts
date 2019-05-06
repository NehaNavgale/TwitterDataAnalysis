import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Data} from '../locationData';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  geo_data = [];
  constructor(private http: HttpClient) {}
  mapData() {
    this.http.get('https://pbbackendanalysis.herokuapp.com/api/byCountry').subscribe((data: Data[]) => {
      data.forEach(y => {
        this.geo_data.push([y.location, y.count]);
      });
      console.log(this.geo_data);
    }, error => {});
  }
  ngOnInit() {
    this.mapData();
  }

}

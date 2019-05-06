import { Component, OnInit } from '@angular/core';
/* Imports */
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {HttpClient} from '@angular/common/http';

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-baendgame',
  templateUrl: './baendgame.component.html',
  styleUrls: ['./baendgame.component.css']
})
export class BaendgameComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    /*Get data from API*/
    this.http.get('https://pbbackendanalysis.herokuapp.com/api/beforeAndAfterRelease').subscribe(data => {
      /*console.log(data)*/
      this.createGraph(data);
    });
  }
    /*Charts*/
    createGraph(data) {
      const chart = am4core.create('baendgamechart', am4charts.PieChart);
   /*   for (const i in data) {
        data[i].color = chart.colors.next();
      }*/
   chart.data = data;
      // Set inner radius
      chart.innerRadius = am4core.percent(50);

// Add and configure Series
      const pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = 'NumberOfTweets';
      pieSeries.dataFields.category = 'Avengers';
      pieSeries.slices.template.stroke = am4core.color('#fff');
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;

// This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;
    }
}

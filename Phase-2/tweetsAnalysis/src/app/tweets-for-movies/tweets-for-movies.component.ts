import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forEach} from '@angular/router/src/utils/collection';

/* charts Imports */
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_material from '@amcharts/amcharts4/themes/material';

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);
// Themes end

@Component({
  selector: 'app-tweets-for-movies',
  templateUrl: './tweets-for-movies.component.html',
  styleUrls: ['./tweets-for-movies.component.css']
})
export class TweetsForMoviesComponent implements OnInit {
  private tweets: any;
  public filterData: [];

  constructor(private http: HttpClient) { }

  /* Start of Code for Moview*/
  ngOnInit() {
    this.http.get('https://pbbackendanalysis.herokuapp.com/api/byMovie').subscribe(data => {
      /*console.log(data)*/
      this.createGraph(data);
    });

  }
  createGraph(data) {
    const chart = am4core.create('tweetsformoviechart', am4charts.XYChart3D);

     for(const i in data) {
       data[i].color = chart.colors.next();
     }

 // Add data
     chart.data =  data;
 // Create axes
     const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
     categoryAxis.dataFields.category = 'Movie';
     categoryAxis.numberFormatter.numberFormat = '#';
     categoryAxis.renderer.inversed = true;

     const  valueAxis = chart.xAxes.push(new am4charts.ValueAxis());

 // Create series
     const series = chart.series.push(new am4charts.ColumnSeries3D());
     series.dataFields.valueX = 'NumberOfTweets';
     series.dataFields.categoryY = 'Movie';
     series.name = 'NumberOfTweets';
     series.columns.template.propertyFields.fill = 'color';
     series.columns.template.tooltipText = '{valueX}';
     series.columns.template.column3D.stroke = am4core.color('#fff');
     series.columns.template.column3D.strokeOpacity = 0.2;
   }
  /*End of Code for Movies*/


}

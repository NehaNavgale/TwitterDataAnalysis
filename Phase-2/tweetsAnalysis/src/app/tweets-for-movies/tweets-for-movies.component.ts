import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forEach} from '@angular/router/src/utils/collection';

/* charts Imports */
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';


/* Chart code */
// Themes begin
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

  /*ngOnInit() {
    this.http.get('https://pbbackendanalysis.herokuapp.com/api/byMovie').
    subscribe((respDataCondition: []) => {
      this.tweets = respDataCondition;
     /!* const result: string[] = [];
      Object.keys(this.tweets).forEach(key =>
      // this.tweets = respDataCondition[key].NumberOfTweets,
          result.push(this.tweets),
      );*!/
});
}*/

  ngOnInit() {
    /*Get data from API*/
    this.http.get('https://pbbackendanalysis.herokuapp.com/api/byMovie').subscribe(data => {
      console.log(data);
    });
    // Create chart instance
    const chart = am4core.create('chartdiv', am4charts.XYChart);

// Add data
    chart.data = [{
      'name': 'John',
      'points': 35654,
      'color': chart.colors.next(),
      'bullet': 'https://www.amcharts.com/lib/images/faces/A04.png'
    }, {
      'name': 'Damon',
      'points': 65456,
      'color': chart.colors.next(),
      'bullet': 'https://www.amcharts.com/lib/images/faces/C02.png'
    }, {
      'name': 'Patrick',
      'points': 45724,
      'color': chart.colors.next(),
      'bullet': 'https://www.amcharts.com/lib/images/faces/D02.png'
    }, {
      'name': 'Mark',
      'points': 13654,
      'color': chart.colors.next(),
      'bullet': 'https://www.amcharts.com/lib/images/faces/E01.png'
    }];

// Create axes
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'name';
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.inside = true;
    categoryAxis.renderer.labels.template.fill = am4core.color('#fff');
    categoryAxis.renderer.labels.template.fontSize = 20;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.strokeDasharray = '4,4';
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.min = 0;

// Do not crop bullets
    chart.maskBullets = false;

// Remove padding
    chart.paddingBottom = 0;

// Create series
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = 'points';
    series.dataFields.categoryX = 'name';
    series.columns.template.propertyFields.fill = 'color';
    series.columns.template.propertyFields.stroke = 'color';
    series.columns.template.column.cornerRadiusTopLeft = 15;
    series.columns.template.column.cornerRadiusTopRight = 15;
    series.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/b]';

// Add bullets
    const bullet = series.bullets.push(new am4charts.Bullet());
    const image = bullet.createChild(am4core.Image);
    image.horizontalCenter = 'middle';
    image.verticalCenter = 'bottom';
    image.dy = 20;
    image.y = am4core.percent(100);
    image.propertyFields.href = 'bullet';
    image.tooltipText = series.columns.template.tooltipText;
    image.propertyFields.fill = 'color';
    image.filters.push(new am4core.DropShadowFilter());
  }
}

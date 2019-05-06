import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

/* charts Imports */
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

@Component({
  selector: 'app-yearwisechart',
  templateUrl: './yearwisechart.component.html',
  styleUrls: ['./yearwisechart.component.css']
})
export class YearwisechartComponent implements OnInit {
  private tweets: any;
  public filterData: [];

  constructor(private http: HttpClient) { }

  ngOnInit() {

    /*Get data from API*/
    this.http.get('https://pbbackendanalysis.herokuapp.com/api/byYear').subscribe(data => {
      /*console.log(data)*/
      this.createGraph(data);
    });
    /*Charts*/
  }
  createGraph(data) {
    const chart = am4core.create('yearwisechart', am4charts.XYChart);
    // Use this, if you want to define your own color set
    // chart.colors.list = [
    //   am4core.color('#845EC2'),
    //   am4core.color('#D65DB1'),
    //   am4core.color('#FF6F91'),
    //   am4core.color('#FF9671'),
    //   am4core.color('#FFC75F'),
    //   am4core.color('#F9F871')
    // ];

    for (const i in data) {
      data[i].lineColor = chart.colors.next();
    }

// Add data
    chart.data =  data;
    console.log(chart.data);
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.ticks.template.disabled = false;
    categoryAxis.renderer.line.opacity = 0;
    categoryAxis.renderer.grid.template.disabled = false;
    categoryAxis.renderer.minGridDistance = 40;
    categoryAxis.dataFields.category = 'MovieYear';
    categoryAxis.startLocation = 0.4;
    categoryAxis.endLocation = 0.6;


    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = false;
    valueAxis.renderer.line.opacity = 0;
    valueAxis.renderer.ticks.template.disabled = false;
    valueAxis.min = 0;

    const lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.categoryX = 'MovieYear';
    lineSeries.dataFields.valueY = 'NumberOfTweets';
    lineSeries.tooltipText = 'NumberOfTweets:{valueY.NumberOfTweets}';
    lineSeries.fillOpacity = 0.5;
    lineSeries.strokeWidth = 3;
    lineSeries.propertyFields.stroke = 'lineColor';
    lineSeries.propertyFields.fill = 'lineColor';

    // @ts-ignore
    const bullet = lineSeries.bullets.push(new am4charts.CircleBullet());
    bullet.circle.radius = 6;
    bullet.circle.fill = am4core.color('#fff');
    bullet.circle.strokeWidth = 3;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = 'panX';
    chart.cursor.lineX.opacity = 0;
    chart.cursor.lineY.opacity = 0;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.parent = chart.bottomAxesContainer;

  }
}

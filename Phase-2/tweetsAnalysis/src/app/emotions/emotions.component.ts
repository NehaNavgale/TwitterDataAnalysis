import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

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
  selector: 'app-emotions',
  templateUrl: './emotions.component.html',
  styleUrls: ['./emotions.component.css']
})
export class EmotionsComponent implements OnInit {
  private tweets: any;
  public filterData: [];

  constructor(private http: HttpClient) { }

  ngOnInit() {

    /*Get data from API*/
    this.http.get('https://pbbackendanalysis.herokuapp.com/api/bySentiment').subscribe(data => {
      /*console.log(data)*/
      this.createGraph(data);
    });
    /*Charts*/
  }
  createGraph(data) {
    const chart = am4core.create('emotionschart', am4charts.XYChart);
    // Use this, if you want to define your own color set
    // chart.colors.list = [
    //   am4core.color('#845EC2'),
    //   am4core.color('#D65DB1'),
    //   am4core.color('#FF6F91'),
    //   am4core.color('#FF9671'),
    //   am4core.color('#FFC75F'),
    //   am4core.color('#F9F871')
    // ];

    for(const i in data) {
      data[i].color = chart.colors.next();
    }
    data[0].bullet = '../assets/Image/sad.png';
    data[1].bullet = '../assets/Image/neutral.png';
    data[2].bullet = '../assets/Image/happy.png';

// Add data
    chart.data =  data;
    console.log(chart.data);
// Create axes
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'Sentiment';
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.minGridDistance = 10;
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
    series.dataFields.valueY = 'Count';
    series.dataFields.categoryX = 'Sentiment';
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

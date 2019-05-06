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
  selector: 'app-endgamecountries',
  templateUrl: './endgamecountries.component.html',
  styleUrls: ['./endgamecountries.component.css']
})
export class EndgamecountriesComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    /*Get data from API*/
    this.http.get('https://pbbackendanalysis.herokuapp.com/api/byCountry').subscribe(data => {
      /*console.log(data)*/
      this.createGraph(data);
    });
  }
  /*Charts*/
  createGraph(data) {
    const chart = am4core.create('endgamecontchart', am4charts.XYChart3D);
    /*   for (const i in data) {
         data[i].color = chart.colors.next();
       }*/
    chart.data = data;
    chart.paddingBottom = 30;
    chart.angle = 35;

// Create axes
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'location';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.renderer.inside = true;
    categoryAxis.renderer.grid.template.disabled = true;

    const labelTemplate = categoryAxis.renderer.labels.template;
    labelTemplate.rotation = -90;
    labelTemplate.horizontalCenter = 'left';
    labelTemplate.verticalCenter = 'middle';
    labelTemplate.dy = 10; // moves it a bit down;
    labelTemplate.inside = false; // this is done to avoid settings which are not suitable when label is rotated

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.disabled = true;

// Create series
    const series = chart.series.push(new am4charts.ConeSeries());
    series.dataFields.valueY = 'count';
    series.dataFields.categoryX = 'location';

    const columnTemplate = series.columns.template;
    columnTemplate.adapter.add('fill', (fill, target) => {
      return chart.colors.getIndex(target.dataItem.index);
    });

    columnTemplate.adapter.add('stroke', (stroke, target) => {
      return chart.colors.getIndex(target.dataItem.index);
    });
  }
}

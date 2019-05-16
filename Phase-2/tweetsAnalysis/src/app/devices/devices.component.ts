import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
/* Imports */
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';


/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  constructor(private http: HttpClient) {
  }
  private iconPath = 'M10,15.654c-0.417,0-0.754,0.338-0.754,0.754S9.583,17.162,10,17.162s0.754-0.338,0.754-0.754S10.417,15.654,10,15.654z M14.523,1.33H5.477c-0.833,0-1.508,0.675-1.508,1.508v14.324c0,0.833,0.675,1.508,1.508,1.508h9.047c0.833,0,1.508-0.675,1.508-1.508V2.838C16.031,2.005,15.356,1.33,14.523,1.33z M15.277,17.162c0,0.416-0.338,0.754-0.754,0.754H5.477c-0.417,0-0.754-0.338-0.754-0.754V2.838c0-0.417,0.337-0.754,0.754-0.754h9.047c0.416,0,0.754,0.337,0.754,0.754V17.162zM13.77,2.838H6.23c-0.417,0-0.754,0.337-0.754,0.754v10.555c0,0.416,0.337,0.754,0.754,0.754h7.539c0.416,0,0.754-0.338,0.754-0.754V3.592C14.523,3.175,14.186,2.838,13.77,2.838z M13.77,13.77c0,0.208-0.169,0.377-0.377,0.377H6.607c-0.208,0-0.377-0.169-0.377-0.377V3.969c0-0.208,0.169-0.377,0.377-0.377h6.785c0.208,0,0.377,0.169,0.377,0.377V13.77z';
  ngOnInit() {
    /*Get data from API*/
    this.http.get('https://pbbackendanalysis.herokuapp.com/api/byDevice').subscribe(data => {
      /*console.log(data)*/
      this.createGraph(data);
    });
    /*Charts*/
  }

  createGraph(data) {
    function am4themes_myTheme(target) {

      if (target instanceof am4core.ColorSet) {
        target.list = [
          am4core.color("#1BA68D"),
          am4core.color("#E7DA4F"),
          am4core.color("#E77624"),
          am4core.color("#DF3520"),
          am4core.color("#64297B"),
          am4core.color("#232555")
        ];
      }
    }
    am4core.useTheme(am4themes_myTheme);
    const chart = am4core.create('devicechart', am4charts.SlicedChart);
    for (const i in data) {
      data[i].color = chart.colors.next();
    }
    chart.paddingTop = am4core.percent(10);

// Add data
    chart.data = data;
    console.log(chart.data);
    const series = chart.series.push(new am4charts.PictorialStackedSeries());
    series.dataFields.value = 'Count';
    series.dataFields.category = 'Device';
    series.alignLabels = true;
// this makes only A label to be visible
    series.labels.template.propertyFields.disabled = 'disabled';
    series.ticks.template.propertyFields.disabled = 'disabled';


    series.maskSprite.path = this.iconPath;
    series.ticks.template.locationX = 1;
    series.ticks.template.locationY = 0;

    series.labelsContainer.width = 100;

    chart.legend = new am4charts.Legend();
    chart.legend.position = 'top';
    chart.legend.paddingRight = 160;
    chart.legend.paddingBottom = 40;
    const marker = chart.legend.markers.template.children.getIndex(0);
    chart.legend.markers.template.width = 40;
    chart.legend.markers.template.height = 40;
   // marker.cornerRadius(20,20,20,20);
  }
}

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
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  constructor(private http: HttpClient) { }
  /* Start of Code for Languages*/
   ngOnInit() {
     this.http.get('https://pbbackendanalysis.herokuapp.com/api/byLang').subscribe(data => {
       console.log(data);
       this.createGraph(data);
     });
   }
   createGraph(data) {
     am4core.useTheme(am4themes_animated);
     const chart = am4core.create('chartdiv', am4charts.PieChart3D);
     chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
     chart.data = data;
     chart.innerRadius = am4core.percent(40);
     chart.depth = 120;
     chart.legend = new am4charts.Legend();
     chart.legend.position = 'right';
     const series = chart.series.push(new am4charts.PieSeries3D());
     series.dataFields.value = 'Lang_Count';
     series.dataFields.depthValue = 'Lang_Count';
     series.dataFields.category = 'lang';
     series.slices.template.cornerRadius = 5;
     series.colors.step = 3;

   }
  /*End of Code for Languages*/
}

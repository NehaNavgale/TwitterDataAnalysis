import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

/* Charts Imports */
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as am4plugins_wordCloud from '@amcharts/amcharts4/plugins/wordCloud';



/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

@Component({
  selector: 'app-hashtags',
  templateUrl: './hashtags.component.html',
  styleUrls: ['./hashtags.component.css']
})
export class HashtagsComponent implements OnInit {

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http.get('https://pbbackendanalysis.herokuapp.com/api/byHashtag').subscribe(data => {
      console.log(data);
      this.createGraph(data);
    });
  }
  createGraph(data) {
    const chart = am4core.create('hashtagchart', am4plugins_wordCloud.WordCloud);
    const series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());

    series.accuracy = 4;
    series.step = 15;
    series.rotationThreshold = 0.7;
    series.maxCount = 50;
    series.minWordLength = 2;
    series.labels.template.margin(4, 4, 4, 4);
    series.maxFontSize = am4core.percent(30);
    series.data =  data;
    series.colors = new am4core.ColorSet();
    series.colors.passOptions = {}; // makes it loop
    series.dataFields.word = 'hashtag';
    series.dataFields.value = 'count';

// series.labelsContainer.rotation = 45;
    series.angles = [0, -90];
    series.fontWeight = '700';

    setInterval(function () {
      series.dataItems.getIndex(Math.round(Math.random() * (series.dataItems.length - 1)))
        .setValue('value', Math.round(Math.random() * 10));
    }, 10000);
  }



}

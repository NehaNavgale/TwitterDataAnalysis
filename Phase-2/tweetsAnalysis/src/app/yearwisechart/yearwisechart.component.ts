import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartsModule } from 'ng2-charts';


@Component({
  selector: 'app-yearwisechart',
  templateUrl: './yearwisechart.component.html',
  styleUrls: ['./yearwisechart.component.css']
})
export class YearwisechartComponent {

  public SystemName = 'MF1';
  firstCopy = false;

  // data
  public lineChartData: Array<number> = [ 1, 8, 49, 50, 51];

  public labelMFL: Array<any> = [
    { data: this.lineChartData,
      label: this.SystemName
    }
  ];
  // labels
  public lineChartLabels: Array<any> =
    ['2018-01-29 10:00:00', '2018-01-29 10:27:00', '2018-01-29 10:28:00', '2018-01-29 10:29:00', '2018-01-29 10:30:00' ];

  constructor(  ) { }

  public lineChartOptions: any = {
    responsive: true,
    scales : {
      yAxes: [{
        ticks: {
          max : 60,
          min : 0,
        }
      }],
      xAxes: [{
        min: '2018-01-29 10:08:00', // how to?
        //  max: '2018-01-29 10:48:00', // how to?
        type: 'time',
        time: {
          unit: 'minute',
          unitStepSize: 10,
          displayFormats: {
            'second': 'HH:mm:ss',
            'minute': 'HH:mm:ss',
            'hour': 'HH:mm',
          },
        },
      }],
    },
  };

  _lineChartColors: Array<any> = [{
    backgroundColor: 'red',
    borderColor: 'red',
    pointBackgroundColor: 'red',
    pointBorderColor: 'red',
    pointHoverBackgroundColor: 'red',
    pointHoverBorderColor: 'red'
  }];



  public lineChartType = 'line';

  public chartClicked(e: any): void {
    console.log(e);
  }
  public chartHovered(e: any): void {
    console.log(e);
  }




}

import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {


    public barChartOptions:any = {
     scaleShowVerticalLines: false,
     responsive: true
    };
    public barChartLabels:string[] = ['오늘', '어제', '17.09.11', '17.09.10', '17.09.09', '17.09.08', '17.09.07'];
    public barChartType:string = 'bar';
    public barChartLegend:boolean  = true;

    public barChartData:any[] = [{data:[0,0,0,0,0,0,0] , label:'s'}];

    // events
    public chartClicked(e:any):void {
      console.log(e);
    }

    public chartHovered(e:any):void {
      console.log(e);
    }

    public randomize():void {
      // Only Change 3 values
      let data = [
        Math.round(Math.random() * 100),
        59,
        80,
        (Math.random() * 100),
        56,
        (Math.random() * 100),
        40];
      let clone = JSON.parse(JSON.stringify(this.barChartData));
      clone[0].data = data;
      this.barChartData = clone;

    }

    dates : any[];
    dateTotal : any[] = [];
    datet : any[];
    constructor(private dataservice : DataService) { }

    ngOnInit() {
      for( let i = 0 ; i<7; i++){
        this.dataservice.getDateTotal(i)
        .then(result => {
          this.dates = result;
          this.dateTotal[i] = this.dates;
          if(i==6){
            this.barChartData = [
              {data: [this.dateTotal[0], this.dateTotal[1], this.dateTotal[2], this.dateTotal[3], this.dateTotal[4], this.dateTotal[5] ,this.dateTotal[6]], label: '유기동물 통계'},
            ];
            console.log("날짜별 유기동물 수 " , this.dateTotal);
          }
        });
      }
    }
}

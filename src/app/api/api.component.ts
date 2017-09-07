import { Component,OnInit } from '@angular/core';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})

export class ApiComponent implements OnInit{
      options: NgDateRangePickerOptions;

    ngOnInit() {
      this.options = {
  	  theme: 'default',
  	  range: 'tm',
  	  dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  	  presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
  	  dateFormat: 'yMd',
  	  outputFormat: 'DD/MM/YYYY',
  	  startOfWeek: 1
  	};
    }
}

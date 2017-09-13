import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ConditionComponent } from './condition/condition.component';
import { AnimalListComponent } from './animal-list/animal-list.component';
import { MainComponent } from './main/main.component';
import { AnimalService } from './animal.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiComponent } from './api/api.component';
import { NgDateRangePickerModule } from 'ng-daterangepicker';
import { DatePickerModule } from 'ng2-datepicker';
import { AnimalDetailComponent } from './animal-detail/animal-detail.component';
import { DataService } from './data.service';
import { AgmCoreModule } from '@agm/core';
//import { Ng2PaginationModule } from 'ng2-pagination'; //importing ng2-pagination
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartComponent } from './chart/chart.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConditionComponent,
    AnimalListComponent,
    MainComponent,
    ApiComponent,
    AnimalDetailComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgDateRangePickerModule,
    DatePickerModule,
    ChartsModule,
    //Ng2PaginationModule,
    NgxPaginationModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCcZDjL6GvXhJ7SjdxnwvKw-m6BYqDjWj4'
    }),
    RouterModule.forRoot(
      [
      {
        path: '',
        component: MainComponent
      },{
        path: 'app',
        component: AppComponent
      },
      {
        path: 'animallist',
        component: AnimalListComponent
      },
      {
        path: 'animallist/:upKind',
        component: AnimalListComponent
      },
      {
        path: 'detail/:desertionNo',
        component: AnimalDetailComponent
      },
      {
        path: 'chart',
        component: ChartComponent
      }
    ])
  ],
  providers: [
    AnimalService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

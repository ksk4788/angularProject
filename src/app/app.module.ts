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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConditionComponent,
    AnimalListComponent,
    MainComponent,
    ApiComponent,
    AnimalDetailComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgDateRangePickerModule,
    DatePickerModule,
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

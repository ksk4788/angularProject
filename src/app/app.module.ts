import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ConditionComponent } from './condition/condition.component';
import { AnimalListComponent } from './animal-list/animal-list.component';
import { MainComponent } from './main/main.component';
import { AnimalService } from './animal.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConditionComponent,
    AnimalListComponent,
    MainComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: MainComponent
      },
      {
        path: 'animallist',
        component: AnimalListComponent
      }
    ])
  ],
  providers: [
    AnimalService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

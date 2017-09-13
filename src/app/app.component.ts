import { Component } from '@angular/core';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { Injectable } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  //animals : any[];
  // Inject HttpClient into your component or service.
  constructor() {
  }
  /*
  getHero(desertionNo: number): Promise<any[]> { //1
    return this.getHeroes()
               .then(heroes => heroes.find(hero => hero.id === id));
  }
  */

  ngOnInit() {
/*
      this.dataservice
      .getAnimals()
      .then(animals => this.animals = animals);
/*
      this.route.params.subscribe((params: Params) => {
      this.dataservice.getAnimal(+params['desertionNo']) //3
      .then(animal => this.animal = animal);
    });*/
}
}

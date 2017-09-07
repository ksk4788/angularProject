import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { DataService } from '../data.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.css']
})
export class AnimalDetailComponent implements OnInit {
  animal : any[];
  desertionNo : number;
  constructor(private route: ActivatedRoute,
              private dataservice: DataService

  ) { }

  ngOnInit() : void{
    /*
    this.desertionNo = this.route.snapshot.params['desertionNo'];
    console.log(this.desertionNo);
*/

/*
    this.route.params.subscribe(params => {
    this.dataservice.getAnimal(+params['desertionNo']) //3
    .then(animal => this.animal = animal);
  });*/
/*
    this.route.params
          .switchMap((params: Params) => this.heroService.getHero(+params['id']))
          .subscribe(hero => this.hero = hero);
  });*/
  this.route.params
.switchMap(params => this.dataservice.getAnimal(+params['dersertionNo'])) //3
.subscribe(animal => this.animal = animal);

}
}
/*
this.route.params
      .switchMap((params: Params) => this.heroService.getHero(+params['id']))
      .subscribe(hero => this.hero = hero);
*/

import { Component, OnInit } from '@angular/core';

import { Animal } from '../animal';
import { AnimalService } from '../animal.service';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.css']
})
export class AnimalListComponent implements OnInit {

  constructor(private animalservice : AnimalService){}
  animals : Animal[];
  ngOnInit() : void{
    this.animalservice.getAnimals()
    .then(result => this.animals = result);
  }

}

import { Injectable } from '@angular/core';
import { Animal } from './animal';
import { ANIMALS } from './mock-animals';
import { AppComponent } from './app.component';

@Injectable()
export class AnimalService {

  constructor() { }
  getAnimals() : Promise<Animal[]> {
    return Promise.resolve(ANIMALS);
  }
}

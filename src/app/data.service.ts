import { Injectable,OnInit } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClient } from '@angular/common/http'
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise'; //1-2

@Injectable()
export class DataService {

  animals : any;

  constructor(private http : HttpClient) { }

  getAnimals() : Promise<any[]> {
    return this.http.get("http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?bgnde=20170801&endde=20170802&pageNo=1&numOfRows=4&ServiceKey=aWCH538NtqEGDSAcSKwFrokoB2CYu6X863cSAFevilxrZU8Fk%2FyPucTQR7ZIByJlVZviO4eMirz3sakW9kAZqg%3D%3D")
    .toPromise()
    .then(data => this.animals = data['response']['body']['items']['item']);
  }

  getAnimal(desertionNo: number): Promise<any[]> { //1
   return this.getAnimals()
              .then(animals => animals.find(animal => animal.desertionNo === desertionNo));
  }
/*
  getAnimal(desertionNo: number): Promise<any[]> { //5
   const url = `${detailUrl}/${id}`;
   return this.http.get(url)
     .toPromise()
     .then(response => response.json().data as Hero)
     .catch(this.handleError);
 }
*/
}

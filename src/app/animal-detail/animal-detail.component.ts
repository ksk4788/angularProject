import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router, Params } from '@angular/router';
import { DataService } from '../data.service';
import 'rxjs/add/operator/switchMap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.css']
})
export class AnimalDetailComponent implements OnInit {
  animal : any[];
  desertionNo : number;
  lat: number;
  lng: number;
  happenP : string = "";
  happenP2 : string;
  happenArray : any[];
  constructor(private route: ActivatedRoute,
              private dataservice: DataService,
              private http: HttpClient

  ) { }

  ngOnInit() : void{
/*
    this.desertionNo = this.route.snapshot.params['desertionNo'];
    console.log("파람" , this.desertionNo);

    this.route.params.subscribe(params => {
    this.dataservice.getAnimal(+params['desertionNo']) //3
    .then(animal => this.animal = animal);
  });
}
}*/
console.log("KSK" , this.dataservice.getAnimal(+this.route.snapshot.params['desertionNo']));
console.log(this.route.snapshot.params['desertionNo']);
  this.route.params
.switchMap((params : Params) => this.dataservice.getAnimal(+this.route.snapshot.params['desertionNo'])) //3
.subscribe(animal => {
  this.animal = animal;
  console.log("발견장소", this.animal['happenPlace']);
  this.happenP = this.animal['happenPlace'];
  this.http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+ this.happenP+"&key=AIzaSyCcZDjL6GvXhJ7SjdxnwvKw-m6BYqDjWj4").subscribe(data => {
    // Read the result field from the JSON response.
    console.log("지오코딩 ", data);
    if(data['results'].length == 0){
        this.happenArray = this.animal['happenPlace'].split(" ");
        for(let i=0; i<this.happenArray.length-1;i++){
          this.happenP2 += this.happenArray[i];
        }
        this.happenP = this.happenP2;
        console.log("해프프픈피", this.happenP);
    }
    this.lat = data['results']['0']['geometry']['location']['lat'];
    this.lng = data['results']['0']['geometry']['location']['lng'];
    console.log("lat ", data['results']['0']['geometry']['location']['lat']);
    console.log("lng ", data['results']['0']['geometry']['location']['lng']);
  });
});







}




}

/*
this.route.params
      .switchMap((params: Params) => this.heroService.getHero(+params['id']))
      .subscribe(hero => this.hero = hero);
*/

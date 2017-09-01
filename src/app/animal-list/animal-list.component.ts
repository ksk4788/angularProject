import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Animal } from '../animal';
import { AnimalService } from '../animal.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.css']
})
export class AnimalListComponent implements OnInit {

  constructor(private animalservice : AnimalService,
              private appcomponent : AppComponent,
              private http: HttpClient
  ){}
  animals : Animal[];
  
  /*
  ngOnInit() : void{
    this.animalservice.getAnimals()
    .then(result => this.animals = result);
  }
  */
  ngOnInit(): void {
    // Make the HTTP request:
    this.http.get('http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?bgnde=20140301&endde=20140430&pageNo=1&numOfRows=10&ServiceKey=aWCH538NtqEGDSAcSKwFrokoB2CYu6X863cSAFevilxrZU8Fk%2FyPucTQR7ZIByJlVZviO4eMirz3sakW9kAZqg%3D%3D')
    .subscribe(data => {
        if(data) {
            console.log('fetching your xml');
            console.log(data); // this shows me everything
            console.log(data['response']['body']['items']['item'][0]); // this shows me everything
            const apitex = data['response']['body']['items']['item'];
        }
    });
}
}

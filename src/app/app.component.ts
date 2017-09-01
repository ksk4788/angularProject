import { Component } from '@angular/core';
import { Animal } from './animal';
import { AnimalService } from './animal.service';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  results: string[];

  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Make the HTTP request:
    this.http.get('http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?bgnde=20140301&endde=20140430&pageNo=1&numOfRows=10&ServiceKey=aWCH538NtqEGDSAcSKwFrokoB2CYu6X863cSAFevilxrZU8Fk%2FyPucTQR7ZIByJlVZviO4eMirz3sakW9kAZqg%3D%3D')
    .subscribe(data => {
        if(data) {
            console.log('fetching your xml');
            console.log(data); // this shows me everything
            console.log(data['response']['body']['items']['item'][0]); // this shows me everything
            var ttest = data['response']['body']['items']['item'];
            console.log(ttest);

        }
    });
}
}

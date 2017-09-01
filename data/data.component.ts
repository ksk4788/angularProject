import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  constructor(dataservice : DataService) {}


/*
  getData(){
  const apiURI = 'http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?bgnde=20140301&endde=20140430&pageNo=1&numOfRows=10&ServiceKey=aWCH538NtqEGDSAcSKwFrokoB2CYu6X863cSAFevilxrZU8Fk%2FyPucTQR7ZIByJlVZviO4eMirz3sakW9kAZqg%3D%3D';

  this.http.get(apiURI).subscribe(data => {
        this.posts = JSON.stringify(data);
        console.log(typeof(this.posts));

        xml2js.parseString(this.posts, function (err, result) {
            console.log(result);
        });
    }, error => {
        console.log(JSON.stringify(error.json()));
  });
}*/
ngOnInit() : void{
  this.dataservice.getList()
  .then(result => this.list = result);
}

}

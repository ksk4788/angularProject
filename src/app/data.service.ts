import { Injectable,OnInit } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClient } from '@angular/common/http'
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise'; //1-2

@Injectable()
export class DataService {

  animals : any[];
  date : any[] = ["","","","","","",""];
  i : number;
  dateVal : any;
  bgnde : string;
  endde : string;
  serviceKey : string = "m0IaUEhDAmP5V7bv4rScBSUaClWci3DaRF%2BbRpr%2Fqk4koGWJx3HlFCJf1%2F%2FYMcCr%2BHYZWn2PwAKw%2BsKdGaiU0g%3D%3D";
  constructor(private http : HttpClient) { }

  getAnimals(bgnde : string ,endde : string) : Promise<any[]> {
    console.log("확인" , bgnde, endde)
    return this.http.get("http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?bgnde=" + bgnde + "&endde=" + endde + "&pageNo=1&numOfRows=10&ServiceKey="+ this.serviceKey)
    .toPromise()
    .then(data => this.animals = data['response']['body']['items']['item']);
  }

  getAnimal(desertionNo: number): Promise<any[]> { //1
   return this.getAnimals(this.bgnde,this.endde)
              .then(animals => animals.find(animal => animal.desertionNo === desertionNo));
  }



  getDateTotal(i : number) : Promise<any[]> {

    this.dateVal = new Date();

    let year  = "" + this.dateVal.getFullYear();
    let day   = "" + (this.dateVal.getDate() - i);
    let month = "" + (this.dateVal.getMonth() + 1); // 0부터 시작하므로 1더함 더함

    if (("" + month).length == 1) { month = "0" + month; }
    if (("" + day).length   == 1) { day   = "0" + day;   }

    let today = year + month+ day;
    console.log("today : " , today);
    this.bgnde = today;
    this.endde = today;

    return this.http.get("http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?bgnde=" + today + "&endde=" + today +"&pageNo=1&numOfRows=1000&ServiceKey=aWCH538NtqEGDSAcSKwFrokoB2CYu6X863cSAFevilxrZU8Fk%2FyPucTQR7ZIByJlVZviO4eMirz3sakW9kAZqg%3D%3D")
    .toPromise()
    .then(data => this.date = data['response']['body']['totalCount']);

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

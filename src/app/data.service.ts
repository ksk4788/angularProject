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
  upkind : string;
  upr_cd : string;

  serviceKey : string = "m0IaUEhDAmP5V7bv4rScBSUaClWci3DaRF%2BbRpr%2Fqk4koGWJx3HlFCJf1%2F%2FYMcCr%2BHYZWn2PwAKw%2BsKdGaiU0g%3D%3D";
  constructor(private http : HttpClient) { }

  getAnimals(bgnde : string ,endde : string, upkind : string, upr_cd : string) : Promise<any[]> {
    console.log("request 확인==>" ,"시작날짜: ", bgnde,"종료날짜: ", endde,"품종코드: ", upkind, "지역코드: ", upr_cd);
    this.bgnde = bgnde;
    this.endde = endde;
    this.upkind = upkind;
    this.upr_cd = upr_cd;
    return this.http.get("http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?bgnde="
                          + bgnde + "&endde=" + endde + "&upkind=" + upkind +"&upr_cd="+ upr_cd +"&pageNo=1&numOfRows=5000&ServiceKey="+ this.serviceKey)
    .toPromise()
    .then(data => this.animals = data['response']['body']['items']['item']);
  }

  getAnimal(desertionNo: number): Promise<any[]> { //1
    console.log("확인2" , this.bgnde, this.endde);
    return this.getAnimals(this.bgnde,this.endde,this.upkind,this.upr_cd)
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

    return this.http.get("http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?bgnde=" + today + "&endde=" + today +"&pageNo=1&numOfRows=10000000&ServiceKey=m0IaUEhDAmP5V7bv4rScBSUaClWci3DaRF%2BbRpr%2Fqk4koGWJx3HlFCJf1%2F%2FYMcCr%2BHYZWn2PwAKw%2BsKdGaiU0g%3D%3D")
    .toPromise()
    .then(data => this.date = data['response']['body']['totalCount']);

  }
}

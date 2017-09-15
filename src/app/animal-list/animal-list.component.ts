import { Component, OnInit, ElementRef } from '@angular/core';
import { AppComponent } from '../app.component';
import { ApiComponent} from '../api/api.component';
import { HeaderComponent } from '../header/header.component';
import { Animal } from '../animal';
import { AnimalService } from '../animal.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute,  Router } from '@angular/router';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { MdPaginatorModule } from '@angular/material';
import { DataService } from '../data.service';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.css']
})
export class AnimalListComponent implements OnInit {

    //변수 타입 선언
    upkind: string;
    animals = [];
    places = [];
    date: DateModel;
    date2: DateModel;
    options: DatePickerOptions;
    place1: string;
    bgnde: string;
    endde: string;
    upr_cd: string;
    dateVal: any;
    private sub: any;
    private noAnimal: any;

    //생성자
    constructor(
      private http: HttpClient,
      private route: ActivatedRoute,
      private elm : ElementRef,
      private dataservice : DataService
    ) {
      this.options = new DatePickerOptions();
      console.log(elm.nativeElement.getAttribute('.datepicker-input'));
    }

    //날짜 별 유기동물 조회
    dateValueFn(): void {
      console.log(this.date['year']+this.date['month']+this.date['day']);
      console.log(this.date2['year']+this.date2['month']+this.date2['day']);
      this.bgnde = this.date['year']+this.date['month']+this.date['day'];
      this.endde = this.date2['year']+this.date2['month']+this.date2['day'];
      this.dataservice.getAnimals(this.bgnde,this.endde,this.upkind,this.upr_cd).then(animals => this.animals = animals);
    }

    //지역 별 유기동물 조회
    changeFormaction2(place)  {
       console.log("지역코드 : ", place);
       this.upr_cd = place;
       this.dataservice.getAnimals(this.bgnde,this.endde,this.upkind,this.upr_cd).then(animals => this.animals = animals);
    }

    //오늘날짜 받아와서 bgnde, endde에 넣기
    todayDate() {
      this.dateVal = new Date();

      let year  = "" + this.dateVal.getFullYear();
      let day   = "" + this.dateVal.getDate();
      let month = "" + (this.dateVal.getMonth() + 1); // 0부터 시작하므로 1더함 더함

      if (("" + month).length == 1) { month = "0" + month; }
      if (("" + day).length   == 1) { day   = "0" + day;   }

      let today = year + month+ day;

      this.bgnde = today;
      this.endde = today;
    }

    ngOnInit(): void {

      //파라미터 값 가져와서 품종 값 설정
      this.sub = this.route.params
     .subscribe(params => {

        //시작날짜, 종료날짜 undefined , null 처리
        if(this.bgnde == undefined || this.bgnde == null || this.endde == undefined || this.bgnde == null){
          this.todayDate();
        }
        //지역코드가 없을 경우 "" 처리
        if(this.upr_cd == undefined || this.upr_cd == null){
          this.upr_cd = "";
        }

        //url 파라미터 가져오기
        let upKind = params['upKind'];
        this.upkind = upKind;

        console.log("품종 : " , this.upkind);
        if(this.upkind == "cat"){
          this.upkind = "422400";
        }else if(this.upkind == "etc"){
          this.upkind = "429900";
        }else if(this.upkind == "dog"){
          this.upkind = "417000";
        }else{
          this.upkind = "417000";
        }

        this.todayDate();
        console.log("1",this.bgnde);
        console.log("2",this.endde);

        //컴포넌트 진입/로드된 후 API 호출
        this.dataservice.getAnimals(this.bgnde,this.endde,this.upkind,this.upr_cd).then(animals => {
          this.animals = animals;
          console.log("동물API :   ss", this.animals);
        });
      });


      this.http.get("http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/sido?ServiceKey=m0IaUEhDAmP5V7bv4rScBSUaClWci3DaRF%2BbRpr%2Fqk4koGWJx3HlFCJf1%2F%2FYMcCr%2BHYZWn2PwAKw%2BsKdGaiU0g%3D%3D").subscribe(data => {
        // Read the result field from the JSON response.
        this.places = data['response']['body']['items']['item'];
        console.log("==========시군구 API============" ,data);
      });

    }
  }


/*
1.개요
- 동물보호관리시스템 유기동물 조회 서비스를 이용한 유기동물 검색
- 유기동물 찾기 또는 입양에 도움이 될 수 있는 서비스 제공
2.서비스 대상
- 유기동물에 관심이 많은 사용자
- 애완동물에 관심이 많은 사용자
- 일반 사용자
3.목적
- 본 어플을 통해 잃어버린 애완동물에 대한 찾기 서비스를 이용하여 유기동물의 수를 줄임
- 지역별 유기동물 검색 서비스를 제공하여 해당 지역의 유기동물 입양을 원활히 할 수 있도록 함
- 동물관리 정보를 통해 동물을 유기하는 행동을 예방
*/

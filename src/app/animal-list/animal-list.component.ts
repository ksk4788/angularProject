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


    upkind: string;
    animals = [];
    places = [];

    //  servicekey = 'aWCH538NtqEGDSAcSKwFrokoB2CYu6X863cSAFevilxrZU8Fk%2FyPucTQR7ZIByJlVZviO4eMirz3sakW9kAZqg%3D%3D';
    //  upkind = 417000;
    //  apiURI = "http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?bgnde=20170901&endde=20170903&upkind=" + upkind + "&pageNo=1&numOfRows=100&ServiceKey="+servicekey;
    // Inject HttpClient into your component or service.
    date: DateModel;
    date2: DateModel;
    options: DatePickerOptions;
    test: string;
    bgnde: string;
    endde: string;
    dateVal: any;
    private sub: any;

    constructor(
      private http: HttpClient,
      private route: ActivatedRoute,
      private elm : ElementRef,
      private dataservice : DataService
    ) {
      this.options = new DatePickerOptions();
      console.log(elm.nativeElement.getAttribute('.datepicker-input'));

    }

    dateValueFn() {
      console.log(this.date['year']+this.date['month']+this.date['day']);
      console.log(this.date2['year']+this.date2['month']+this.date2['day']);
      this.bgnde = this.date['year']+this.date['month']+this.date['day'];
      this.endde = this.date2['year']+this.date2['month']+this.date2['day'];
      this.ngOnInit();
    }

    changeFormaction2(place)  {
       console.log("지역코드 : ", place);
       this.test = place;
       this.ngOnInit();
    }

    todayDate() {
      //오늘날짜 받아와서 API에 넣기//////////////
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
/*
    getAnimals(): void {
    this.dataservice.getAnimals().then(animals => this.animals = animals);*/



    // Make the HTTP request:
    ngOnInit(): void {

        /////////////////////////////////////////

        if(this.bgnde == undefined || this.bgnde == null || this.endde == undefined || this.bgnde == null){
          this.todayDate();
        }
        if(this.test == undefined || this.test == null){
          this.test = "";
        }

        this.sub = this.route.params
       .subscribe(params => {
        // get id from params
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
        // do whatever you want with id here "&upr_cd=" + test +
        this.http.get("http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?bgnde=" + this.bgnde + "&endde=" + this.endde +"&upkind=" + this.upkind + "&upr_cd=" + this.test + "&pageNo=1&numOfRows=100&ServiceKey=aWCH538NtqEGDSAcSKwFrokoB2CYu6X863cSAFevilxrZU8Fk%2FyPucTQR7ZIByJlVZviO4eMirz3sakW9kAZqg%3D%3D").subscribe(data => {
          // Read the result field from the JSON response.
          this.animals = data['response']['body']['items']['item'];
          console.log("==========동물 API============" ,this.animals);
        });

        this.http.get("http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/sido?ServiceKey=aWCH538NtqEGDSAcSKwFrokoB2CYu6X863cSAFevilxrZU8Fk%2FyPucTQR7ZIByJlVZviO4eMirz3sakW9kAZqg%3D%3D").subscribe(data => {
          // Read the result field from the JSON response.
          this.places = data['response']['body']['items']['item'];
          console.log("==========시군구 API============" ,this.places);
          });

        });
      }

      ngOnDestroy() {
        this.sub.unsubscribe();
      }

  }



/*
  constructor(private animalservice : AnimalService,
              private appcomponent : AppComponent,
              private http: HttpClient
  ){}
  animals : Animal[];


  ngOnInit() : void{
    this.animalservice.getAnimals()
    .then(result => this.animals = result);
  }
*/
  /*
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
}*/

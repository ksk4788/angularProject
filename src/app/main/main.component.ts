import { Component, OnInit } from '@angular/core';

import { Animal } from '../animal';
import { AnimalService } from '../animal.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

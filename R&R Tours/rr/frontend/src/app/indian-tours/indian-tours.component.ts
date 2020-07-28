import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-indian-tours',
  templateUrl: './indian-tours.component.html',
  styleUrls: ['./indian-tours.component.css']
})
export class IndianToursComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0)
  }

}

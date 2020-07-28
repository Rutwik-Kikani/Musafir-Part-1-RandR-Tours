import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-america',
  templateUrl: './america.component.html',
  styleUrls: ['./america.component.css']
})
export class AmericaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0)
  }

}

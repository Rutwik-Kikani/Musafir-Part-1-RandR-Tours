import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-international-tours',
  templateUrl: './international-tours.component.html',
  styleUrls: ['./international-tours.component.css']
})
export class InternationalToursComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0)
  }

}

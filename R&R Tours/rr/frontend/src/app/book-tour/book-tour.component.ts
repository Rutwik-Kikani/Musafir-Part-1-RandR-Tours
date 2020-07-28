import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-tour',
  templateUrl: './book-tour.component.html',
  styleUrls: ['./book-tour.component.css']
})
export class BookTourComponent implements OnInit {
  //name:string
  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0)
  }
  // onSubmit(){
  //   console.log(name)
  // }
}

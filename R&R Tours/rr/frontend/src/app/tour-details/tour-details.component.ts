import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRequest } from '../request'

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.css']
})
export class TourDetailsComponent implements OnInit {

  requestForm:FormGroup = new FormGroup({
    firstname:new FormControl(null,Validators.required),
    lastname:new FormControl(null,Validators.required),
    email:new FormControl(null,Validators.required),
    phone:new FormControl(null,[Validators.required,Validators.pattern('^([0-9]{10})$')])
  });
  private req:IRequest[];
  constructor(private router:Router,private apiservice: ApiService) { }

  ngOnInit() {
    window.scrollTo(0, 0)
  }
  // onBook(myName:HTMLInputElement){
  //   alert("Welcome: "+myName.value);
  // }

  request(){
    if(!this.requestForm.valid){
      window.alert("enter data properly");
      return;
    }
    // else{
    //   window.alert("request received successfully!!")
    // }
    this.apiservice.requestCallBack(this.requestForm.value)
    .subscribe(
      data => {
        this.req = data;
        console.log(data);
        window.alert(this.req[0].messg);  
        // this.router.navigate(['/login']);
      }
      // error => console.error(error)
      );
  }

}

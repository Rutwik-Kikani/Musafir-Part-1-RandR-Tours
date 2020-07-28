import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ApiService } from '../api.service';
import { IUser } from '../user'
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public alluser: IUser[];
  public userf: IUser;
  public usermessg: IUser;
  public show=true;
  public find=false;
  public del=false;

  constructor(private _router: Router, private _apiservice: ApiService,private cookieservice:CookieService) { }

  findUserForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
  });

  deleteUserForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
  });

  ngOnInit() {
    if(this.cookieservice.check('email')){
      if(!(this.cookieservice.get('email')=="kikanirutwik001@gmail.com" || this.cookieservice.get('email')=="rutvik5101@gmail.com")){
        this._router.navigate([''])
      }
    }
    else{
      this._router.navigate(['/login'])
    }
    this.showallusers();
    window.scrollTo(0, 0)
  }

  //--------------------------adduser------------------------------------//
  adduser() {
    this._router.navigate(['/signup']);
  }
  //-----------------------------show all user-----------------------------//
  showallusers() {
    this._apiservice.getallUsers()
      .subscribe(
        data => {
          this.alluser = data;
          console.log(this.alluser);
          this.show = !this.show;
          return;
        });
  }
  //--------------------------------find user---------------------------------//
  findUser() {
    //for testing purpose
    //console.log(this.findUserForm.controls.email.value);
    if (this.deleteUserForm.value == null) {
      window.alert("enter a email please");
    }
    else {
      this._apiservice.getUserwithEmail(this.findUserForm.controls.email.value)
        .subscribe(
          data => {
            this.userf = data;
            console.log(this.userf);
            this.find = !this.find;
            return;
          });
    }
  }

  //--------------------------------delete user-------------------------------------//
  deleteUser(){
    //for testing purpose
    //console.log(this.deleteUserForm.controls.email.value);
    if (this.findUserForm.value == null) {
      window.alert("enter a email please");
    }
    else {
      this._apiservice.deleteUserwithEmail(this.deleteUserForm.controls.email.value)
        .subscribe(
          data => {
            this.usermessg = data;
            console.log(this.usermessg);
            this.del = !this.del;
            return;
          });
    }
  }
}

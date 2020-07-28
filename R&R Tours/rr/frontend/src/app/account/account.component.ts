import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { IUser } from '../user'
import { CookieService } from 'ngx-cookie-service'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public loggedinUser: IUser;
  public updatedUser: IUser;
  public updatedUsermessg: IUser;

  updateForm: FormGroup = new FormGroup({
    firstname: new FormControl(null, Validators.required),
    lastname: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required),
    phone: new FormControl(null, [Validators.required, Validators.pattern('^([0-9]{10})$')])
  });

  constructor(private _apiservice: ApiService,private cookieservice:CookieService,private _router: Router) { }

  ngOnInit() {
    if(!this.cookieservice.check('email')){
      window.alert('please login to view your profile!')
      this._router.navigate([''])
    }

      this.loggedinUser = JSON.parse(localStorage.getItem('loggedinUser'));
      //console.log(this.loggedinUser);
  
    window.scrollTo(0, 0)
  }

  updateUser(){
    if(!this.updateForm.valid){
      console.log('Invalid form');
      window.alert('you should enter data properly')
    }
    else{
      this.loggedinUser.firstname = this.updateForm.controls.firstname.value;
      this.loggedinUser.lastname = this.updateForm.controls.lastname.value;
      this.loggedinUser.email = this.updateForm.controls.email.value;
      this.loggedinUser.phone = this.updateForm.controls.phone.value;
      this.loggedinUser.password = this.updateForm.controls.password.value;

      this._apiservice.updateUserwithId(this.loggedinUser)
      .subscribe(
        data => {
          console.log(data);
          this.updatedUser = data[1];
          console.log(this.updatedUser);
          this.updatedUsermessg = data[0];
          window.alert(this.updatedUsermessg.messg);
        }
      );
    }
  }
}

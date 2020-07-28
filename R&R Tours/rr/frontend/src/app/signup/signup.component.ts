import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IUser } from '../user'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    firstname: new FormControl(null, Validators.required),
    lastname: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required),
    cpassword: new FormControl(null, Validators.required),
    phone: new FormControl(null, [Validators.required, Validators.pattern('^([0-9]{10})$')])
  });

  public user: IUser;
  public userrmessg: IUser;

  constructor(private router: Router, private apiservice: ApiService) { }

  ngOnInit() {
  }
  // this methide is invoke by clicking button signup
  register() {
    if (!this.registerForm.valid || (this.registerForm.controls.password.value != this.registerForm.controls.cpassword.value)) {
      console.log("Invalid Form");
      window.alert("you should enter a data properly")
      return;
    }
    this.apiservice.registerUser(this.registerForm.value)
      .subscribe(
        data => {
          this.user = data;
          console.log(this.user);
          if (this.user[1] == undefined) {
            this.userrmessg = this.user[0];
            console.log(this.userrmessg);
            window.alert(this.userrmessg.messg);
           location.reload();
          }
          if(this.user[1] != null)
          {
            this.userrmessg = this.user[0];
            console.log(this.userrmessg);
            window.alert(this.userrmessg.messg);
            this.router.navigate(['/login']);
          }
           
        }
        // error => console.error(error)
      );
  }
}

/*registerUser(user){
  console.log(user)
  this.apiservice.registerUser(user);
}*/


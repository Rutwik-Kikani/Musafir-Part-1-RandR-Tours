import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '../user';
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: IUser;
  public loggedinUser: IUser

  constructor(private router: Router, private apiservice: ApiService,private cookieservice:CookieService) { }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required)
  });

  ngOnInit() {
    if(this.cookieservice.check('email')){
      this.router.navigate([''])
    }
  }

  login() {
    if (!this.loginForm.valid) {
      window.alert("Enter data properly");
      console.log("Invalid entry");
      return;
    }

    // testing for the login form accepting the value proerly or not
    // console.log(this.loginForm.value);

    this.apiservice.loginUser(this.loginForm.value)
      .subscribe(data => {
        this.user = data;

        //console.log(this.user)

        if (this.user == null) {
          window.alert("user not found");
          this.router.navigate(['/login']);
        }
        if (this.user != null) {
          localStorage.setItem('loggedinUser',JSON.stringify(this.user));
          if (this.user.email == "kikanirutwik001@gmail.com") {
            console.log(this.user);
            window.alert("welcome " + this.user.firstname);
            this.cookieservice.set('email',this.loginForm.get('email').value);
            this.router.navigate(['/admin']);
            // location.reload();
          }
          else if(this.user.email == "rutvik5101@gmail.com"){
            console.log(this.user);
            window.alert("welcome " + this.user.firstname);
            this.cookieservice.set('email',this.loginForm.get('email').value);
            this.router.navigate(['/admin']);
            // location.reload();
          }
          else{
            console.log(this.user);
            this.cookieservice.set('email',this.loginForm.get('email').value);
            window.alert("welcome " + this.user.firstname);
            location.reload();
            this.router.navigate(['/']);
          }
        }
      },
        error => console.error(error));

     /*this.apiservice.loginUser(this.loginForm.value)
     .subscribe(
       data => {
         if(data == null)
         {
           window.alert("user not found");
           this.router.navigate(['/login']);  
         } 
        if(data !=null){
         this.router.navigate(['/']);
         console.log(data);
        } 
       },
       error => console.error(error)
       )*/

  }

  /*loginUser(user){
     console.log(user)
     this.apiservice.loginUser(user);
  }*/

}

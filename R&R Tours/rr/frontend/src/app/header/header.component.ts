import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AppComponent } from '../app.component';
import { CookieService } from 'ngx-cookie-service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  public user:string = "Login";
  public ck=this.cookieservice.check('email');
  public email=this.cookieservice.get('email');
  constructor(private apiservice:ApiService,private fname:AppComponent,private cookieservice:CookieService,private router:Router) {
    // this.user=apiservice.firstname;
    this.user = fname.name;
    console.log(this.user);
  }

  ngOnInit() {
    //this.ck=this.cookieservice.check('email');
    //this.email=this.cookieservice.get('email');
  }

  logout(){
    this.cookieservice.set('email',null,-1);
    location.reload();
    this.router.navigate(['']);
  }

}

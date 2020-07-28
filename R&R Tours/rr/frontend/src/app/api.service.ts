import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { IUser } from './user';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public firstname:string;
  constructor(private http: HttpClient) { }

  registerUser(body: any):Observable<any> {
    return this.http.post("http://localhost:3000/signup", body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  loginUser(body: any):Observable<any>{
    return this.http.post("http://localhost:3000/login", body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  getallUsers():Observable<IUser[]> {
    return this.http.get<IUser[]>("http://localhost:3000/showusers")
  }

  getUserwithEmail(userEmail:string):Observable<IUser> 
  {
    // for testing purpouse 
    // console.log("http://localhost:3000/showuserbyemail/" + userEmail)
    return this.http.get<IUser>("http://localhost:3000/showuserbyemail/" + userEmail)    
  }

  deleteUserwithEmail(userEmail:string):Observable<any> 
  {
    // for testing purpouse 
    // console.log("http://localhost:3000/deletebyemail/" + userEmail)
    return this.http.delete<any>("http://localhost:3000/deletebyemail/" + userEmail)    
  }
  
  requestCallBack(body: any):Observable<any>{
    return this.http.post("http://localhost:3000/request", body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  showUsers(body: any):Observable<any> {
    return this.http.post("http://localhost:3000/showusers", body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  findUser(body: any):Observable<any> {
    return this.http.post("http://localhost:3000/showuser/:id", body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  deleteUser(body: any):Observable<any> {
    return this.http.post("http://localhost:3000/delete/:id", body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  // updateUser(body: any):Observable<any> {
  //   return this.http.put("http://localhost:3000/update", body, {
  //     observe: 'body',
  //     headers: new HttpHeaders().append('Content-Type', 'application/json')
  //   });
  // }

  updateUserwithId(user: IUser):Observable<any> {
    return this.http.put <any>("http://localhost:3000/update", user, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  // packageInfo(body: any):Observable<any>{
  //   return this.http.post("http://localhost:3000/package", body, {
  //     observe: 'body',
  //     headers: new HttpHeaders().append('Content-Type', 'application/json')
  //   });
  // }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {


  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get('http://127.0.0.1:8000/authenticate/');
  }

  postData() {
    console.log("post")
    return this.http.post<any>('http://127.0.0.1:8000/authenticate/', null);
  }
  
}

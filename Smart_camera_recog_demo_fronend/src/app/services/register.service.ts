import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TableData } from '../register-face/register-face.component';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient) { }

  register(formData: FormData): Observable<any> {
    console.log(formData.get('face_id'))
    return this.http.post<any>('http://127.0.0.1:8000/register/', formData);
  }
  get_data(): Observable<any> {

    return this.http.get<TableData[]>('http://127.0.0.1:8000/register/');
  }
}
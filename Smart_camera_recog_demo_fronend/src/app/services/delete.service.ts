import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TableData } from '../delete-face/delete-face.component';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {
  constructor(private http: HttpClient) { }
  get_data(): Observable<any> {
 
    return this.http.get<TableData[]>('http://127.0.0.1:8000/register/');
  }
  
  post_data(formData: FormData): Observable<any> {
    console.log(formData,typeof(formData))
    return this.http.post<any>('http://127.0.0.1:8000/delete/', formData);
    
  }
}

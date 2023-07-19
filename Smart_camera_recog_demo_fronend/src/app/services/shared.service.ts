import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private responseDataSubject = new Subject<string>();

  responseData= this.responseDataSubject.asObservable();

  updateResponseData(responseData: string) {
    this.responseDataSubject.next(responseData);
  }
  constructor() { }
}

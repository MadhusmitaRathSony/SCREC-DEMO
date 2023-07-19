import { Component } from '@angular/core';
import { AuthenticateService } from '../services/authenticate.service';
import { interval, switchMap, Subscription, pipe } from 'rxjs';

interface Face {
  faceName: any;
  image: any;
  face_id: number;
}

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  intervalSubscription: Subscription | undefined;

  faceImageDetails: any = [];

  constructor(private authenticateServices: AuthenticateService) { }
  authenticate() {
    this.intervalSubscription = interval(5000)
      .pipe(switchMap(() => this.authenticateServices.getData()))
      .subscribe(response => {
        const dataList = (response as any).message;
        for (let i = 0; i < dataList.length; i++) {
          let dictionary = new Map<string, any>();
          dictionary.set('faceName', dataList[i][0]);
          dictionary.set('image', dataList[i][1]);
          dictionary.set('face_id', dataList[i][2]);
          const faceIdToCheck =  dataList[i][2];

          const isFaceIdExists = this.faceImageDetails.some((dict: { face_id: number; }) => dict.face_id === faceIdToCheck);
          console.log(isFaceIdExists)
          if (!isFaceIdExists) {
           
            this.faceImageDetails.push(dictionary);
          
            
          } 
        this.faceImageDetails=this.faceImageDetails.reverse();
          
          
        }
      }, error => {

      });
  }

  stopAuthenticate() {
    if (this.intervalSubscription && !this.intervalSubscription.closed) {
      console.log('Interval Unsubscribed');
      this.intervalSubscription?.unsubscribe();
      this.authenticateServices.postData();
    }
  }

  compareDictionaries(dict1: Map<string, any>, dict2: Map<string, any>): boolean {
    if (dict1.size !== dict2.size) {
      return false;
    }

    for (const [key, value] of dict1) {
      if (!dict2.has(key) || dict2.get(key) !== value) {
        return false;
      }
    }

    return true;
  }

}

import { Component } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../services/shared.service';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registration-popup',
  templateUrl: './registration-popup.component.html',
  styleUrls: ['./registration-popup.component.css']
})
export class RegistrationPopupComponent {
  selectedFiles: File[] = [];
  inputValue1: string = '';
  inputValue2: string = '';
  inputValue3: string = '';
  formData: FormData = new FormData();


  constructor(private registrationService: RegisterService, private sharedService: SharedService, private http: HttpClient, private ngxService: NgxUiLoaderService, private registerPopupDialogRef: MatDialogRef<RegistrationPopupComponent>) { }

  handleInputChange(event: any, inputField: string) {
    if (inputField === 'inputValue1') {
      this.inputValue1 = event.target.value;
    } else if (inputField === 'inputValue2') {
      this.inputValue2 = event.target.value;
    } else if (inputField === 'inputValue3') {
      this.inputValue3 = event.target.value;
    }
  }

  onFileSelected(event: any, index: number) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFiles[index] = file;
    }
    console.log(this.selectedFiles)
  }

  register() {
    this.ngxService.start();
    this.formData = new FormData();
    console.log(this.inputValue1, this.inputValue2, this.inputValue3)
    this.formData.append('face_id', this.inputValue1);
    this.formData.append('status', this.inputValue2);
    this.formData.append('name', this.inputValue3);
    console.log(this.selectedFiles)
    console.log(this.formData.get('face_id'))
    for (let file of this.selectedFiles) {

      if (file) {
        this.formData.append('images', file, file.name);

      }
    }
    console.log(this.formData.get('face_id'))
    console.log(this.formData.get('images'))

    this.registrationService.register(this.formData).subscribe(
      (response) => {
        // Handle the response from the Django backend
        console.log('Registration success!', response);

        this.sharedService.updateResponseData(response);
        this.ngxService.stop();
      },
      (error) => {
        // Handle any errors that occur during the request
        console.error('Registration failed:', error);
        this.ngxService.stop();
      }
    );
  }
  
  cancelRegister(){
    this.registerPopupDialogRef.close();
  }

}



import { Component, SimpleChanges, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationPopupComponent } from '../registration-popup/registration-popup.component';
import { SharedService } from '../services/shared.service'
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RegisterService } from '../services/register.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ResponseDialogComponent } from '../response-dialog/response-dialog.component';
import { map } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';


export interface TableData {
  faceId: number;
  name: string;
  face_direction: number;
  noMask: boolean;
  numFaceImages: number;
  availableNumFaceImages: number;
}


@Component({
  selector: 'app-register-face',
  templateUrl: './register-face.component.html',
  styleUrls: ['./register-face.component.css']
})
export class RegisterFaceComponent {
  displayedColumns: string[] = ['faceId', 'name', 'face_direction', 'noMask', 'numFaceImages', 'availableNumFaceImages'];
  dataSource: MatTableDataSource<TableData> = new MatTableDataSource<TableData>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  tableData: any;
  lines: any;
  responseData: string | undefined;
  constructor(private http: HttpClient, private sharedService: SharedService, private registrationService: RegisterService, public dialog: MatDialog, private responseMatDialog: MatDialog) { }
  jsonDataString: string | undefined;

  ngOnInit() {
    const data_list: TableData[] = [];
    // Access the response data from the shared service
    this.registrationService.get_data().subscribe(

      (response) => {
        console.log(response)
        const data_list = response
        console.log(data_list)
        this.dataSource = new MatTableDataSource<TableData>(data_list)
        this.dataSource.paginator=this.paginator
        console.log(this.dataSource)

      },
      (error) => {
        // Handle any errors that occur during the request
        console.error('Data failed:', error);
      }
    );

    this.sharedService.responseData.subscribe(responseData => {
      this.responseData = responseData;
      console.log(responseData, "register")
      this.jsonDataString = JSON.stringify(responseData)
      let responseDetails = JSON.parse(JSON.stringify(responseData)) as MyClass
      console.log(typeof (this.jsonDataString))
      this.responseMatDialog.open(ResponseDialogComponent, {
        width: "450px",
        data: { response: responseDetails, isRegister: true },
        disableClose: true,
      })
      // Perform any necessary actions with the updated response data
    });
  }

  openRegistrationDialog() {
    const registerPopupDialogRef = this.dialog.open(RegistrationPopupComponent, {
      width: '90%',// Adjust the width as per your requirements
      height: '90%',
      disableClose: true,
    });

    registerPopupDialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed', result);
    });
  }

}

export class MyClass {
  face_id: string | undefined;
  message: string | undefined;
  delete: string | undefined;
}
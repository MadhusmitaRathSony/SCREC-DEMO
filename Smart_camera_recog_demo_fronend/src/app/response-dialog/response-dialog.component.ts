import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-response-dialog',
  templateUrl: './response-dialog.component.html',
  styleUrls: ['./response-dialog.component.css']
})
export class ResponseDialogComponent {
  isRegister: boolean;
  isError: boolean;
  constructor(private responseMatDialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.isRegister = data.isRegister;
    this.isError = data.response.face_id == undefined;
  }

  closeDialog() {
    this.responseMatDialog.closeAll();
    window.location.reload()
  }
}

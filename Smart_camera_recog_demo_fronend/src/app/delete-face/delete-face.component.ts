import { Component, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DeleteService } from '../services/delete.service';
import { MatDialog } from '@angular/material/dialog';
import { ResponseDialogComponent } from '../response-dialog/response-dialog.component';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { MyClass } from '../register-face/register-face.component';
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
  selector: 'app-delete-face',
  templateUrl: './delete-face.component.html',
  styleUrls: ['./delete-face.component.css'],

})
export class DeleteFaceComponent {
  displayedColumns: string[] = ['select', 'faceId', 'name', 'face_direction', 'noMask', 'numFaceImages', 'availableNumFaceImages'];
  dataSource: MatTableDataSource<TableData> = new MatTableDataSource<TableData>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  formData: FormData = new FormData();
  selection = new SelectionModel<TableData>(true, []);
  selected_row: any

  constructor(private ngxService: NgxUiLoaderService, private deleteService: DeleteService, private deleteresponseMatDialog: MatDialog) { }
  ngOnInit() {
    const data_list: TableData[] = [];

    // Access the response data from the shared service
    this.deleteService.get_data().subscribe(

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
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: TableData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.faceId}`;
  }
  face_type: number | undefined
  post_data: any[] = [];
  data: any = {}
  delete() {
    this.ngxService.start();
    const selectedRows = this.selection.selected;
    console.log(selectedRows, typeof (selectedRows))
    for (let i = 0; i < selectedRows.length; i++) {
      this.formData.append('row', JSON.stringify(selectedRows[i]));
    }


    this.deleteService.post_data(this.formData).subscribe(

      (response) => {
        console.log(response)
        const data_list = response
        console.log(data_list)
        // this.dataSource = new MatTableDataSource<TableData>(data_list)
        // console.log(this.dataSource)
        let deleteResponse = JSON.parse(JSON.stringify(response)) as MyClass
        this.deleteresponseMatDialog.open(ResponseDialogComponent, {
          width: "450px",
          data: { response: deleteResponse, isRegister: false },
          disableClose: true,
        })
        this.ngxService.stop();
      },
      (error) => {
        // Handle any errors that occur during the request
        console.error('Data failed:', error);
        this.ngxService.stop();
      }
    );
  }

}

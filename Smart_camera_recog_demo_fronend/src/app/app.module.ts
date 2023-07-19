import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterFaceComponent } from './register-face/register-face.component';
import { HomeComponent } from './home/home.component';
import { DeleteFaceComponent } from './delete-face/delete-face.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { RegistrationPopupComponent } from './registration-popup/registration-popup.component';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { ResponseDialogComponent } from './response-dialog/response-dialog.component';
import { AuthenticationComponent } from './authentication/authentication.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterFaceComponent,
    HomeComponent,
    DeleteFaceComponent,
    RegistrationPopupComponent,
    ResponseDialogComponent,
    AuthenticationComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    NgxUiLoaderModule,
    MatCheckboxModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterFaceComponent } from './register-face/register-face.component';
import { DeleteFaceComponent } from './delete-face/delete-face.component';
import { AuthenticationComponent } from './authentication/authentication.component';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register', component: RegisterFaceComponent },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'delete', component: DeleteFaceComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

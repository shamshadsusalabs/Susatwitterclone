import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoogleSigInComponent } from './google-sig-in/google-sig-in.component';

const routes: Routes = [



      { path: 'login', component: GoogleSigInComponent},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoogleSingInRoutingModule { }

import { Routes, RouterModule } from '@angular/router';
import { CinemaComponent } from './cinema/cinema.component';
import { NgModule } from '@angular/core';


export const routes: Routes = [
  { path: "cinema",
    component: CinemaComponent },
  // autres routes
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}

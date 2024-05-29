import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // Assurez-vous que ce chemin est correct
import { AppComponent } from './app.component';
import { CinemaComponent } from './cinema/cinema.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    //CinemaComponent,
    // autres composants
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule, // Assurez-vous qu'AppRoutingModule est correctement exporté dans app.routes.ts
    HttpClientModule,
    CinemaComponent,


  ],
  providers: [HttpClient],
  bootstrap: [AppComponent] // Assurez-vous que AppComponent est correctement importé et déclaré
})
export class AppModule { }

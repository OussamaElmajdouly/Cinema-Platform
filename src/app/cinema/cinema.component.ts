import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {DecimalPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {CinemaService} from "../services/cinema.service";
import {VilleService} from "../services/ville.service";

@Component({
  selector: 'app-cinema',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgClass,
    DecimalPipe,
    FormsModule
  ],
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit{
  public villes: any;
  public cinemas: any;
  public currentVille: any;
  public currentCinema: any;
  public salles: any;
  public currentProjection: any;
  public selectedTickets: any;
  constructor(public villeService: VilleService,
              public cinemaService: CinemaService) {
  }
  ngOnInit() {
    this.getVilles();
  }
  getVilles(){
    this.villeService.findAll().subscribe(res => {
      this.villes = res;
    });
  }
  onGetCinemas(ville:any){
    this.currentVille = ville;
    this.salles = undefined;
    this.cinemaService.getCinemas(ville).subscribe(res => {
      this.cinemas = res;
    });
  }
  onGetSalles(cinema:any){
    this.currentCinema = cinema;
    this.cinemaService.getSallesByCinema(cinema).subscribe(data => {
      this.salles = data;
      // @ts-ignore
      this.salles.forEach(s => {
        this.cinemaService.getProjectionsBySalle(s)
          .subscribe((res: any) => {
            s.projections = res;
          });
      });
    });
  }
  getImage(salle:any){
    return this.cinemaService.imageUrl + salle.projections[0].film.id;
  }
  onGetTicketsPlaces(p:any){
    this.currentProjection = p;
    this.cinemaService.getTicketsPlacesForAprojection(p).subscribe(res => {
      this.currentProjection.tickets = res;
      this.selectedTickets = [];
    });
  }
  onSelectTicket(t:any){
    if(!t.selected){
      t.selected = true;
      this.selectedTickets.push(t);
    }
    else{
      t.selected = false;
      this.selectedTickets.splice(this.selectedTickets.indexOf(t), 1);
    }
  }
  getTicketClass(t:any){
    let str="btn tickets ";
    if(t.reservee){
      str += "btn-danger";
    }
    else if(t.selected){
      str += "btn-warning";
    }else{
      str += "btn-success";
    }
    return str;
  }
  onPayTicket(dataForm:any){
    // @ts-ignore
    let tickets = [];
    // @ts-ignore
    this.selectedTickets.forEach(t => {
      tickets.push(t.id);
    });
    // @ts-ignore
    dataForm.tickets = tickets;
    this.cinemaService.payerTickets(dataForm)
      .subscribe(re => {
        alert('Tickets réservés avec succès!');
        this.onGetTicketsPlaces(this.currentProjection);
      });
  }
}

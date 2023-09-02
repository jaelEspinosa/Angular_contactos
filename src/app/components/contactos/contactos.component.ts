import { Component, OnInit } from '@angular/core';
import { Contactos } from 'src/app/interfaces';
import { ContactosService } from 'src/app/services/contactos.service';
import { ModalService } from '../../services/modal.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {

  public contactosList : Contactos[] = [];
  public noImage = '../../../assets/img/no_image.jpg'


  constructor(private contactos:ContactosService,
              public modal:ModalService,
              private sharedService: SharedService
             ){ }

  obtenerContactos (){
    this.contactos.getContactos()
      .subscribe((data:Contactos[]) =>{
        this.contactosList = data;
      })

     }

  ngOnInit(): void {
    this.obtenerContactos();

    // suscripcion a la notificacion de actualizacion
  this.sharedService.actualizarListaContactos$.subscribe(()=>{
    this.obtenerContactos(); // Actualizamos la lista
  })

  }

  showForm(){
    this.modal.tooggleModal();

  }

}



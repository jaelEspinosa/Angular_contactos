import { Component, Input, OnInit } from '@angular/core';
import { Contactos } from 'src/app/interfaces';
import { ContactosService } from 'src/app/services/contactos.service';
import { ModalService } from 'src/app/services/modal.service';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent implements OnInit {
   @Input() contacto?: Contactos;
   public noImage = '../../../assets/img/no_image.jpg'

  constructor(public modal:ModalService,
              private contacSvd: ContactosService,
              private sharedSvc: SharedService
              ) { }

  ngOnInit(): void {
  }

 cancelar() {
  this.modal.tooggleModalDelete()
 }

 eliminar(){
  console.log('vamos a eliminar a ',this.contacto?.nombre)
  this.contacSvd.deleteContacto(this.contacto?.id!)
    .subscribe(data=>{
      console.log(data)
      this.sharedSvc.actualizarLista()
      this.contacSvd.deleteFile(this.contacto?.imagen)
       .subscribe({
        next:(fileDeleted) => {
          console.log(fileDeleted)
        },
        error: (error) =>{
          console.log(error)
        }
        })
        Swal.fire('Registro eliminado')
        this.modal.tooggleModalDelete()
    })
 }
}

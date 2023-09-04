import { Component, Input, OnInit } from '@angular/core';
import { Contactos } from 'src/app/interfaces';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent implements OnInit {
   @Input() contacto?: Contactos;
   public noImage = '../../../assets/img/no_image.jpg'

  constructor(public modal:ModalService) { }

  ngOnInit(): void {
  }

 cancelar() {
  this.modal.tooggleModalDelete()
 }

 eliminar(){
  console.log('vamos a eliminar a ',this.contacto?.nombre)
 }
}

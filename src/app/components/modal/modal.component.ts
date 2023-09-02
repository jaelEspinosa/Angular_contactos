import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactosService } from 'src/app/services/contactos.service';
import Swal from 'sweetalert2'


import { ModalService } from 'src/app/services/modal.service';
import { SharedService } from 'src/app/services/shared.service';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  public isSubmitedForm: boolean = false;
  public errorEmail: boolean = false;
  public dbdata: any;


  constructor( public modal:ModalService,
               private fb:FormBuilder,
               private contactService: ContactosService,
               private sharedService: SharedService
               ) { }

  ngOnInit(): void {}

public miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(4)]],
    telefono: ['', [Validators.required, Validators.minLength(9)]],
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
    imagen: [''],

})

cancelar() {
  this.isSubmitedForm = false;
  this.modal.tooggleModal();
  this.miFormulario.reset();
}



guardar(){
  this.isSubmitedForm = true;

  if (this.miFormulario.get('email') && this.miFormulario.get('email')?.errors && this.miFormulario.get('email')?.errors!['pattern']) {
    this.errorEmail = true;
    return
  }
   this.errorEmail = false;

   if (this.miFormulario.valid) {
    this.contactService.saveContacto(this.miFormulario.value)
      .subscribe({
        next: (data) => {
          // guardamos registro
          this.dbdata = data;
          Swal.fire(this.dbdata.msg);
          setTimeout(() => {
            this.modal.tooggleModal();
            this.miFormulario.reset()
          }, 1000);
          //Notificamos al componente principal para que actualize la lista
          this.sharedService.actualizarLista()
        },
        error: (error) => {
          console.log(error)
          let texto = error.error.mensaje;
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: texto,
          });
          this.miFormulario.reset();
        },
      });
  }
}

validarEmail(){
  if (this.miFormulario.get('email') && this.miFormulario.get('email')?.errors && this.miFormulario.get('email')?.errors!['pattern']) {
    this.errorEmail = true;
    console.log('mail valido: ', this.errorEmail)
  }
}
}

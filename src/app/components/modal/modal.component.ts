import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactosService } from 'src/app/services/contactos.service';
import Swal from 'sweetalert2'


import { ModalService } from 'src/app/services/modal.service';
import { SharedService } from 'src/app/services/shared.service';
import { Contactos, UpLoadImg } from 'src/app/interfaces';
import { v4 as uuidv4 } from 'uuid';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements AfterViewInit, OnDestroy  {

  @Input() contacto?:Contactos;


  public fileForDelete:string = '';
  public isSubmitedForm: boolean = false;
  public errorEmail: boolean = false;
  public isImgSelected: boolean= false;
  public dbdata: any;
  public archivo: UpLoadImg;
  public uuid = uuidv4();
  public formulario!: Contactos;
  public imageTemp: File | null = null;
  public imageTempUrl: string | null = null;

  _handleReaderLoaded(readerEvent: any){
    const binaryString = readerEvent.target.result;
    this.archivo.base64textString = btoa(binaryString);
 }



  constructor( public modal:ModalService,
               private fb:FormBuilder,
               private contactService: ContactosService,
               private sharedService: SharedService,
               private cdRef: ChangeDetectorRef
               ) {
                this.archivo = {
                nombreArchivo: '',
                base64textString: null
                }

                }
  ngOnDestroy() {
    // Liberar recursos asociados con la URL de la vista previa
    if (this.imageTempUrl) {
      URL.revokeObjectURL(this.imageTempUrl);
    }
  }

  ngAfterViewInit() {
     console.log('el contacto a editar es: ', this.contacto)
     setTimeout(() => {
      this.actualizarFormularioConDatosDeContacto();
      this.cdRef.detectChanges(); // Detectar cambios después de actualizar el formulario
    });
  }

public miFormulario: FormGroup = this.fb.group({
    nombre:   ['', [Validators.required, Validators.minLength(4)]],
    telefono: ['' , [Validators.required, Validators.minLength(9)]],
    email:    ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
    imagen:   [''],

})

actualizarFormularioConDatosDeContacto(){
  this.miFormulario.patchValue({
    nombre: this.contacto?.nombre,
    telefono: this.contacto?.telefono,
    email: this.contacto?.email,
    imagen: this.contacto?.imagen
  })
}

cancelar() {
  this.isSubmitedForm = false;
  this.isImgSelected = false;
  this.modal.tooggleModal();
  this.miFormulario.reset();
  this.fileForDelete = '';
  this.imageTemp = null;
  this.imageTempUrl = null

}

seleccionarArchivo(e:any){

   if(this.contacto?.imagen){
    this.fileForDelete = this.contacto.imagen;
   }

  const file = e.target.files[0];
  this.archivo.nombreArchivo = `${this.uuid}_${file.name}`


  if (file){
    const reader= new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
    this.isImgSelected = true;

    // creamos url para la vista previa
    this.imageTemp = file;
    this.imageTempUrl = URL.createObjectURL(file)
  }else{
    this.imageTemp = null;
    this.imageTempUrl = null;
  }

}

guardar(){
  this.isSubmitedForm = true;

  if (this.miFormulario.get('email') && this.miFormulario.get('email')?.errors && this.miFormulario.get('email')?.errors!['pattern']) {
    this.errorEmail = true;
    return
  }
   this.errorEmail = false;


   if (this.miFormulario.valid) {
    this.formulario = {
      nombre: this.miFormulario.value.nombre,
      email: this.miFormulario.value.email,
      telefono: this.miFormulario.value.telefono,
      imagen: this.archivo.nombreArchivo
    }
    if(this.contacto?.id){
      console.log('estamos editando el contacto: ', this.contacto.nombre);
      this.formulario.imagen = this.archivo.nombreArchivo || this.contacto.imagen
      this.contactService.updateContacto(this.formulario, this.contacto.id)
        .subscribe({
          next: (data) => {
            //subimos archivo
            this.upload();
            //borramos el archivo anterior
            this.deleteFile();
            //guardamos registo
            this.dbdata = data;
            Swal.fire('Contacto actualizado con éxito');
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
          }

        })

      return;
    }
    this.contactService.saveContacto(this.formulario)
      .subscribe({
        next: (data) => {
          //subimos archivo
          this.upload();
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

upload(){
   this.contactService.uploadfile(this.archivo)?.subscribe((datos:any)=>{
    console.log(datos)
   })
}
deleteFile() {
  if (this.fileForDelete !== ''){

    this.contactService.deleteFile(this.fileForDelete).subscribe((datos:any)=>{
      console.log(datos)
    })
  }else{
    return;
  }
}

validarEmail(){
  if (this.miFormulario.get('email') && this.miFormulario.get('email')?.errors && this.miFormulario.get('email')?.errors!['pattern']) {
    this.errorEmail = true;
    console.log('mail valido: ', this.errorEmail)
  }
}
}

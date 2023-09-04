import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactosComponent } from './components/contactos/contactos.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './components/modal/modal.component';
import { DomSeguroPipe } from './pipes/dom-seguro.pipe';
import { ModalDeleteComponent } from './components/modal-delete/modal-delete.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactosComponent,
    ModalComponent,
    DomSeguroPipe,
    ModalDeleteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

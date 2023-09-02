import { Injectable } from '@angular/core';
import {  BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private actualizarListaContactos = new BehaviorSubject<null>(null)

  actualizarListaContactos$ = this.actualizarListaContactos.asObservable();


  actualizarLista() {
    this.actualizarListaContactos.next(null)
  }
}

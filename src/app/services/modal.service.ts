import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
   public isVisibleModal: boolean = false;


   public tooggleModal(){
    this.isVisibleModal = !this.isVisibleModal
   }
  constructor() { }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contactos, UpLoadImg } from '../interfaces';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContactosService {


  private URLbase:string = 'http://apiphp.com';

  constructor(private http: HttpClient) { }

  getContactos (): Observable<Contactos[]>{
    const url = `${this.URLbase}/index.php`
    return this.http.get<Contactos[]>(url)
  }

  saveContacto(formData:Contactos ) {

    const url = `${this.URLbase}/index.php`;
    const headers = new HttpHeaders({
      'content-type': 'application/json',
  });
    return this.http.post(url, formData, { headers})
  }

  updateContacto( formData:Contactos, id:string) {
    const url = `${this.URLbase}/index.php?id=${id}`;
    const headers = new HttpHeaders({
      'content-type': 'application/json',
  });
    return this.http.put(url, formData, { headers})
  }

  deleteContacto ( id:string ){
    const url = `${this.URLbase}/index.php?id=${id}`;
    const headers = new HttpHeaders({
      'content-type': 'application/json',
  });

    return this.http.delete(url, { headers})

  }

  uploadfile(archivo:UpLoadImg){
    if(archivo.nombreArchivo === '' && archivo.base64textString === null){
      return
    }
    return this.http.post(`${this.URLbase}/views/index.php`, JSON.stringify(archivo))
  }

  deleteFile(archivo:string = '') {

      return this.http.delete(`${this.URLbase}/views/index.php?nombreArchivoEliminar=${archivo}`)

  }
}

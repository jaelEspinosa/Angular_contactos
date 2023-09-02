import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contactos } from '../interfaces';
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

  saveContacto(formData:Contactos ){

    const url = `${this.URLbase}/index.php`;
    const headers = new HttpHeaders({
      'content-type': 'application/json',
  });
    return this.http.post(url, formData, { headers})
  }
}

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Clientes } from './clientes';
import { HttpClient } from '@angular/common/http';

export interface IDataItem {
  name: string;
  description: string;
  price: number;
}

@Injectable()
export class DataService {

  constructor(private http: Http) {
  }

  private headers = new Headers({'Content-Type': 'application/json'});
  url = 'http://localhost:8000/';

  getClientes(): Promise<Clientes[]> {
    return this.http.get(this.url + 'cliente', {headers: this.headers})
      .toPromise()
      .then(response => response.json() as Clientes[]);
  }

  getClientesid(id: number): Promise<Clientes[]> {
    const url = `${'http://localhost:8000/cliente'}/${id}`;
    return this.http.get(url, {headers: this.headers})
      .toPromise()
      .then(() => null);
  }


  agregaClientes(user: Clientes) {
    return this.http.post('http://localhost:8000/cliente', user, {headers: this.headers})
      .toPromise();
  }

  deleteCliente(id: number): Promise<void> {
    const url = `${'http://localhost:8000/cliente'}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null);
  }



  deleteDeposito(id: number): Promise<void> {
    const url = `${'http://localhost:8000/deposito'}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null);
  }
}

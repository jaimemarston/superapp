import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientesEndpoint } from '../endpoints/clientes.endpoint';
import { Observable } from 'rxjs';
import { Clientes } from '../../dataservice/clientes';
import { IClientes } from '../interfaces/clientes.interface';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  constructor(private http: HttpClient) {
  }

  getClientes(): Observable<Array<IClientes>> {
    return this.http.get<Array<IClientes>>(ClientesEndpoint.rest)
  }

  getCliente(id: number): Observable<Clientes> {
    const url = `${ClientesEndpoint.rest}/${id}`;
    return this.http.get<Clientes>(url);
  }


  addClient(data: IClientes): Observable<IClientes> {
    return this.http.post<IClientes>(ClientesEndpoint.rest, data);
  }

  updateCliente(id: number, data: IClientes): Observable<IClientes> {
    const url = `${ClientesEndpoint.rest}/${id}`;
    return this.http.put<IClientes>(url, data);
  }

  deleteCliente(id: number): Observable<any | null> {
    const url = `${ClientesEndpoint.rest}/${id}`;
    return this.http.delete(url);
  }


}

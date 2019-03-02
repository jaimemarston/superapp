import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProveedoresEndpoint } from '../endpoints/proveedores.endpoint';
import { Observable } from 'rxjs';
import { Proveedores } from '../../dataservice/proveedores';
import { IProveedores } from '../interfaces/proveedores.interface';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  constructor(private http: HttpClient) {
  }

  getProveedores(): Observable<Array<IProveedores>> {
    return this.http.get<Array<IProveedores>>(ProveedoresEndpoint.rest)
  }

  getProveedor(id: number): Observable<Proveedores> {
    const url = `${ProveedoresEndpoint.rest}/${id}`;
    return this.http.get<Proveedores>(url);
  }


  addProveedor(data: IProveedores): Observable<IProveedores> {
    return this.http.post<IProveedores>(ProveedoresEndpoint.rest, data);
  }

  updateProveedor(id: number, data: IProveedores): Observable<IProveedores> {
    const url = `${ProveedoresEndpoint.rest}/${id}`;
    return this.http.put<IProveedores>(url, data);
  }

  deleteProveedor(id: number): Observable<any | null> {
    const url = `${ProveedoresEndpoint.rest}/${id}`;
    return this.http.delete(url);
  }


}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticuloEndpoint } from '../endpoints/articulo.endpoint';
import { Observable } from 'rxjs';
import { Articulos } from '../../dataservice/articulos';
import { IArticulo } from '../interfaces/articulo.interface';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  constructor(private http: HttpClient) {
  }

  getArticulos(): Observable<Array<IArticulo>> {
    return this.http.get<Array<IArticulo>>(ArticuloEndpoint.rest)
  }

  getArticulo(id: number): Observable<Articulos> {
    const url = `${ArticuloEndpoint.rest}/${id}`;
    return this.http.get<Articulos>(url);
  }


  addArticulo(data: IArticulo): Observable<IArticulo> {
    return this.http.post<IArticulo>(ArticuloEndpoint.rest, data);
  }

  updateArticulo(id: number, data: IArticulo): Observable<IArticulo> {
    const url = `${ArticuloEndpoint.rest}/${id}`;
    return this.http.put<IArticulo>(url, data);
  }

  deleteArticulo(id: number): Observable<any | null> {
    const url = `${ArticuloEndpoint.rest}/${id}`;
    return this.http.delete(url);
  }


}

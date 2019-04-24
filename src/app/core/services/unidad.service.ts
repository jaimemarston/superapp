import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UnidadEndpoint } from '../endpoints/unidad.endpoint';
import { Observable } from 'rxjs';
import { Unidades } from '../../dataservice/unidades';
import { IUnidad } from '../interfaces/unidad.interface';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UnidadService {
  constructor(private http: HttpClient) {
  }

  getUnidades(): Observable<Array<IUnidad>> {
    return this.http.get<Array<IUnidad>>(UnidadEndpoint.rest).pipe(
      map(unidades => {
        unidades = unidades.map(u => {
              if (!u.foto1) {
                  u.foto1 = 'assets/images/avatars/profile.jpg';
              }
              return u;
          });
          return unidades;
      })
  );
  }

  getUnidad(id: number): Observable<IUnidad> {
    const url = `${UnidadEndpoint.rest}/${id}`;
    return this.http.get<IUnidad>(url);

  }


  addUnidad(data: IUnidad): Observable<IUnidad> {
    return this.http.post<IUnidad>(UnidadEndpoint.rest, data);
  }

  updateUnidad(id: number, data: IUnidad): Observable<IUnidad> {
    const url = `${UnidadEndpoint.rest}/${id}`;
    return this.http.put<IUnidad>(url, data);
  }

  deleteUnidad(id: number): Observable<any | null> {
    const url = `${UnidadEndpoint.rest}/${id}`;
    return this.http.delete(url);
  }


}

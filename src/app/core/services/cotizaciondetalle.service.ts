import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CotizaciondetalleEndpoint } from '../endpoints/cotizacion.endpoint';
import { Observable } from 'rxjs';
import { Cotizaciondetalle } from '../../dataservice/cotizacion';
import { ICotizaciondetalle } from '../interfaces/cotizacion.interface';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CotizaciondetalleService {
  constructor(private http: HttpClient) {
  }

  getCotizaciones(): Observable<Array<ICotizaciondetalle>> {
    return this.http.get<Array<ICotizaciondetalle>>(CotizaciondetalleEndpoint.rest);
  }


  getCotizacion(id: number): Observable<ICotizaciondetalle> {
    const url = `${CotizaciondetalleEndpoint.rest}/${id}`;
    return this.http.get<ICotizaciondetalle>(url);
  }

  addCotizacion(data: ICotizaciondetalle): Observable<ICotizaciondetalle> {
    return this.http.post<ICotizaciondetalle>(CotizaciondetalleEndpoint.rest, data);
  }

  updateCotizacion(id: number, data: ICotizaciondetalle): Observable<ICotizaciondetalle> {
    const url = `${CotizaciondetalleEndpoint.rest}/${id}`;
    return this.http.put<ICotizaciondetalle>(url, data);
  }

  deleteCotizacion(id: number): Observable<any | null> {
    const url = `${CotizaciondetalleEndpoint.rest}/${id}`;
    return this.http.delete(url);
  }
}

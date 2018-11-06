import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CotizacionEndpoint, ClientesdirecciondetailEndpoint } from '../endpoints/cotizacion.endpoint';
import { Observable } from 'rxjs';
import { Cotizacion } from '../../dataservice/cotizacion';
import { ICotizacion } from '../interfaces/cotizacion.interface';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {
  constructor(private http: HttpClient) {
  }

  getCotizaciones(): Observable<Array<ICotizacion>> {
    return this.http.get<Array<ICotizacion>>(CotizacionEndpoint.rest);
  }

  getClientesdetail(): Observable<Array<any>> {
    return this.http.get<Array<any>>(ClientesdirecciondetailEndpoint.rest);
  }

  getCotizacion(id: number): Observable<Cotizacion> {
    const url = `${CotizacionEndpoint.rest}/${id}/`;
    return this.http.get<Cotizacion>(url);
  }

  addCotizacion(data: ICotizacion): Observable<ICotizacion> {
    const url = `${CotizacionEndpoint.rest}/`;
    return this.http.post<ICotizacion>(url, data);
  }

  updateCotizacion(id: number, data: ICotizacion): Observable<ICotizacion> {
    const url = `${CotizacionEndpoint.rest}/${id}/`;
    console.log('envio update put url');
    console.log(url);
    return this.http.put<ICotizacion>(url, data);
  }

  deleteCotizacion(id: number): Observable<any | null> {
    const url = `${CotizacionEndpoint.rest}/${id}/`;
    return this.http.delete(url);
  }
}

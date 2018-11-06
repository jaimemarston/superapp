import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BancosEndpoint } from '../endpoints/varios.endpoint';
import { Observable } from 'rxjs';
import { Bancos } from '../../dataservice/bancos';
import { Ibancos } from '../interfaces/varios.interface';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BancoService {
  constructor(private http: HttpClient) {
  }

  getBancos(): Observable<Array<Ibancos>> {
    return this.http.get<Array<Ibancos>>(BancosEndpoint.rest);
  }

  getBanco(id: number): Observable<Bancos> {
    const url = `${BancosEndpoint.rest}/${id}`;
    return this.http.get<Bancos>(url);
  }

  addbanco(data: Ibancos): Observable<Ibancos> {
    return this.http.post<Ibancos>(BancosEndpoint.rest, data);
  }

  updateBanco(id: number, data: Ibancos): Observable<Ibancos> {
    const url = `${BancosEndpoint.rest}/${id}`;
    return this.http.put<Ibancos>(url, data);
  }

  deleteBanco(id: number): Observable<any | null> {
    const url = `${BancosEndpoint.rest}/${id}`;
    return this.http.delete(url);
  }


}

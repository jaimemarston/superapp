import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChoferesEndpoint } from '../endpoints/choferes.endpoint';
import { Observable } from 'rxjs';
import { Choferes } from '../../dataservice/choferes';
import { IChoferes } from '../interfaces/choferes.interface';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChoferService {
  constructor(private http: HttpClient) {
  }

  getChoferes(): Observable<Array<IChoferes>> {
    return this.http.get<Array<IChoferes>>(ChoferesEndpoint.rest)
  }

  getChofer(id: number): Observable<Choferes> {
    const url = `${ChoferesEndpoint.rest}/${id}`;
    return this.http.get<Choferes>(url);
  }


  addChofer(data: IChoferes): Observable<IChoferes> {
    return this.http.post<IChoferes>(ChoferesEndpoint.rest, data);
  }

  updateChofer(id: number, data: IChoferes): Observable<IChoferes> {
    const url = `${ChoferesEndpoint.rest}/${id}`;
    return this.http.put<IChoferes>(url, data);
  }

  deleteChofer(id: number): Observable<any | null> {
    const url = `${ChoferesEndpoint.rest}/${id}`;
    return this.http.delete(url);
  }


}

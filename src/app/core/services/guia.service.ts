import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GuiasEndpoint } from '../endpoints/guias.endpoint';
import { Observable } from 'rxjs';
import { Guias } from '../../dataservice/guias';
import { IGuias } from '../interfaces/guias.interface';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuiaService {
  constructor(private http: HttpClient) {
  }

  getGuias(): Observable<Array<IGuias>> {
    return this.http.get<Array<IGuias>>(GuiasEndpoint.rest)
  }

  getGuia(id: number): Observable<Guias> {
    const url = `${GuiasEndpoint.rest}/${id}`;
    return this.http.get<Guias>(url);
  }


  addGuia(data: IGuias): Observable<IGuias> {
    return this.http.post<IGuias>(GuiasEndpoint.rest, data);
  }

  updateGuia(id: number, data: IGuias): Observable<IGuias> {
    const url = `${GuiasEndpoint.rest}/${id}`;
    return this.http.put<IGuias>(url, data);
  }

  deleteGuia(id: number): Observable<any | null> {
    const url = `${GuiasEndpoint.rest}/${id}`;
    return this.http.delete(url);
  }


}

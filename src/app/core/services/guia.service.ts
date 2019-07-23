import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GuiaEndpoint } from '../endpoints/guia.endpoint';
import { Observable } from 'rxjs';
import { Guias } from '../../dataservice/guias';
import { IGuia } from '../interfaces/guia.interface';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuiaService {
  constructor(private http: HttpClient) {
  }

  getGuias(): Observable<Array<IGuia>> {
    return this.http.get<Array<IGuia>>(GuiaEndpoint.rest).pipe(
      map(guias => {
        guias = guias.map(u => {
              if (!u.foto1) {
                  u.foto1 = 'assets/images/avatars/profile.jpg';
              }
              return u;
          });
          return guias;
      })
  );
  }

  getGuia(id: number): Observable<IGuia> {
    const url = `${GuiaEndpoint.rest}/${id}`;
    return this.http.get<IGuia>(url);

  }


  addGuia(data: IGuia): Observable<IGuia> {
    return this.http.post<IGuia>(GuiaEndpoint.rest, data);
  }

  updateGuia(id: number, data: IGuia): Observable<IGuia> {
    const url = `${GuiaEndpoint.rest}/${id}`;
    return this.http.put<IGuia>(url, data);
  }

  deleteGuia(id: number): Observable<any | null> {
    const url = `${GuiaEndpoint.rest}/${id}`;
    return this.http.delete(url);
  }


}

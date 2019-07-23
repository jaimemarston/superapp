import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChoferEndpoint } from '../endpoints/chofer.endpoint';
import { Observable } from 'rxjs';
import { Choferes } from '../../dataservice/choferes';
import { IChofer } from '../interfaces/chofer.interface';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChoferService {
  constructor(private http: HttpClient) {
  }

  getChoferes(): Observable<Array<IChofer>> {
    return this.http.get<Array<IChofer>>(ChoferEndpoint.rest).pipe(
      map(choferes => {
        choferes = choferes.map(u => {
              if (!u.foto1) {
                  u.foto1 = 'assets/images/avatars/profile.jpg';
              }
              return u;
          });
          return choferes;
      })
  );
  }

  getChofer(id: number): Observable<IChofer> {
    const url = `${ChoferEndpoint.rest}/${id}`;
    return this.http.get<IChofer>(url);

  }


  addChofer(data: IChofer): Observable<IChofer> {
    return this.http.post<IChofer>(ChoferEndpoint.rest, data);
  }

  updateChofer(id: number, data: IChofer): Observable<IChofer> {
    const url = `${ChoferEndpoint.rest}/${id}`;
    return this.http.put<IChofer>(url, data);
  }

  deleteChofer(id: number): Observable<any | null> {
    const url = `${ChoferEndpoint.rest}/${id}`;
    return this.http.delete(url);
  }


}

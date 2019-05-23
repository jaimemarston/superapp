import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LiquidacionEndpoint, ClientesdirecciondetailEndpoint} from '../endpoints/liquidacion.endpoint';
import {Observable} from 'rxjs';
import {Liquidacion} from '../../dataservice/liquidacion';
import {ILiquidacion, ICotizacionEstados} from '../interfaces/liquidacion.interface';
import {filter, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LiquidacionService {
    constructor(private http: HttpClient) {
    }

    getLiquidaciones(): Observable<Array<ILiquidacion>> {
        return this.http.get<Array<ILiquidacion>>(LiquidacionEndpoint.rest);
    }

    getClientesdetail(): Observable<Array<any>> {
        return this.http.get<Array<any>>(ClientesdirecciondetailEndpoint.rest);
    }

    getLiquidacion(id: number): Observable<Liquidacion> {
        const url = `${LiquidacionEndpoint.rest}/${id}/`;
        return this.http.get<Liquidacion>(url);
    }

    addLiquidacion(data: ILiquidacion): Observable<ILiquidacion> {
        const url = `${LiquidacionEndpoint.rest}/`;
        return this.http.post<ILiquidacion>(url, data);
    }

    updateLiquidacion(id: number, data: ILiquidacion): Observable<ILiquidacion> {
        const url = `${LiquidacionEndpoint.rest}/${id}/`;
        console.log('envio update put url');
        console.log(url);
        return this.http.put<ILiquidacion>(url, data);
    }

    deleteLiquidacion(id: number): Observable<any | null> {
        const url = `${LiquidacionEndpoint.rest}/${id}/`;
        return this.http.delete(url);
    }

    estadosLiquidacion(): Observable<Array<ICotizacionEstados>> {
        return this.http.get<Array<ICotizacionEstados>>(LiquidacionEndpoint.estados);
    }


}

import {BASEURL} from '../../../environments/environment';

export class CotizacionEndpoint {
    // public static getUser = BASEURL + 'cliente' + 1 + 'id';
    public static rest = `${BASEURL}mcotizacion`;
    public static estados = `${BASEURL}cotizacion_estado`;
}

export class CotizaciondetalleEndpoint {
    // public static getUser = BASEURL + 'cliente' + 1 + 'id';
    public static rest = `${BASEURL}dcotizacion`;
}

export class ClientesdirecciondetailEndpoint {
    // public static getUser = BASEURL + 'cliente' + 1 + 'id';
    public static rest = `${BASEURL}clientesdirecciondetail`;
}
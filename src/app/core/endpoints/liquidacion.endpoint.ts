import {BASEURL} from '../../../environments/environment';

export class LiquidacionEndpoint {
    // public static getUser = BASEURL + 'cliente' + 1 + 'id';
    public static rest = `${BASEURL}mliquidacion`;
    public static estados = `${BASEURL}cotizacion_estado`;
}

export class LiquidaciondetalleEndpoint {
    // public static getUser = BASEURL + 'cliente' + 1 + 'id';
    public static rest = `${BASEURL}dliquidacion`;
}

export class ClientesdirecciondetailEndpoint {
    // public static getUser = BASEURL + 'cliente' + 1 + 'id';
    public static rest = `${BASEURL}clientesdirecciondetail`;
}
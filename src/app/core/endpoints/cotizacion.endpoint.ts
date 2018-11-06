import { BASEURL } from '../../../environments/environment';

export class CotizacionEndpoint {
  // public static getClient = BASEURL + 'cliente' + 1 + 'id';
  public static rest = `${BASEURL}mcotizacion`;
}

export class CotizaciondetalleEndpoint {
  // public static getClient = BASEURL + 'cliente' + 1 + 'id';
  public static rest = `${BASEURL}dcotizacion`;
}

export class ClientesdirecciondetailEndpoint {
  // public static getClient = BASEURL + 'cliente' + 1 + 'id';
  public static rest = `${BASEURL}clientesdirecciondetail`;
}

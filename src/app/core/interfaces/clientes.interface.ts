export interface IClientes {
  id?: number;
  codigo: number;
  ruc: string;
  nombre: string;
  correo: string;
  telefono1: string;
  telefono2: string;
  telefono3: string;
  contacto: string;
  telcontacto: string;
  direccion: string;
  paginaweb: string;
  tipocc: number;
  destipocc: string;
  condcompvent:  string;
  banco_nombre1: string;
  banco_cuenta1: string;
  banco_moneda1: string;
  banco_nombre2: string;
  banco_cuenta2: string;
  banco_moneda2: string;
  fechanac: Date;
  fechaini: Date;
  fechafin: Date;
  grupo: string;
}

//https://www.desarrolloweb.com/articulos/clases-interfaces-servicios-angular.html
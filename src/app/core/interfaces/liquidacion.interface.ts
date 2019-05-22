export interface ILiquidacion {
    id?: number;
    codigo: number;
    codpro: string;
    descripcion: string;
    unimed: string;
    desunimed: string;
    cantidad: number;
    precio: number;
    impsubtotal: number;
    impanticipos: number;
    impdescuentos: number;
    impvalorventa: number;
    impisc: number;
    impigv: number;
    nvaligv: number;
    impotroscargos: number;
    impotrostributos: number;
    imptotal: number;
    desgrupo1: string;
    desgrupo2: string;
    cc1: string;
    cc2: string;
    cc3: string;
    fechaini: Date;
    fechafin: Date;
    horaini: string;
    horafin: string;
    lugorigen: string;
    lugdestino: string;
    opcviaje: string;
    conductor: string;
    nvuelo: string;
    proveedor: string;
    obs: string;
    tipodoc: string;
    master: number | null;
    estado: number;
    estadodoc?: number;
    liquidaciones?: Array<ILiquidaciondetalle> | null;
}

export interface ILiquidaciondetalle {
    id?: number;
    codigo: number;
    codpro: string;
    descripcion: string;
    unimed: string;
    desunimed: string;
    cantidad: number;
    precio: number;
    impsubtotal: number;
    impanticipos: number;
    impdescuentos: number;
    impvalorventa: number;
    impisc: number;
    impigv: number;
    nvaligv: number;
    impotroscargos: number;
    impotrostributos: number;
    imptotal: number;
    desgrupo1: string;
    desgrupo2: string;
    cc1: string;
    cc2: string;
    cc3: string;
    fechaini: Date;
    fechafin: Date;
    horaini: string;
    horafin: string;
    lugorigen: string;
    lugdestino: string;
    opcviaje: string;
    conductor: string;
    nvuelo: string;
    proveedor: string;
    obs: string;
    tipodoc: string;
    master: number | null;
    estado: number;
    estadodoc?: number;
}

export interface ICotizacionEstados {
    id: number;
    color: string;
    name: string;
}


//https://www.desarrolloweb.com/articulos/clases-interfaces-servicios-angular.html

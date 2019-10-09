export interface ICotizacion {
    id?: number;
    codigo: number;
    descripcion: string;
    tipdoc: string;
    destipdoc: string;
    seriedoc: string;
    numerodoc: string;
    fechadoc: string;
    fecentrega: string;
    ruc: string;
    desruc: string;
    telruc: string;
    paisruc: string;
    dptoruc: string;
    provruc: string;
    distruc: string;
    codpostalruc: string;
    dirruc: string;
    conpag: string;
    desconpag: string;
    monedapago: string;
    desmonepago: string;
    tc_dolares: number;
    tc_euros: number;
    tc_yen: number;
    numeroguia: string;
    numordserv: string;
    vendidopor: string;
    fechapago: Date;
    autorizadosunat: string;
    impsubtotal: number;
    impdescuentos: number;
    impvalorventa: number;
    impisc: number;
    impigv: number;
    nvaligv: number;
    impotroscargos: number;
    impotrostributos: number;
    imptotal: number;
    cc1: string;
    cc2: string;
    cc3: string;
    fechaini: Date;
    fechafin: Date;
    correoruc: string;
    estado: number;
    horaini: string;
    horafin: string;
    unidadtransporte: string;
    obs: string;
    cotizaciones?: Array<ICotizaciondetalle> | null;
}

export interface ICotizaciondetalle {
    id?: number;
    codigo: number;
    codpro: string;
    descripcion: string;
    pax: number;
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

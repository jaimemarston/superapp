import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CotizaciondetalleService } from '../../../../core/services/cotizaciondetalle.service';
import { CotizacionService } from '../../../../core/services/cotizacion.service';
import { ICotizaciondetalle, ICotizacion } from '../../../../core/interfaces/cotizacion.interface';
import { IArticulo } from '../../../../core/interfaces/articulo.interface';
import { IUser } from '../../../../core/interfaces/user.interface';
import { IChoferes } from '../../../../core/interfaces/choferes.interface';
import { IUnidad } from '../../../../core/interfaces/unidad.interface';
import { ArticuloService } from '../../../../core/services/articulo.service';
import { UnidadService } from '../../../../core/services/unidad.service';
import { UserService } from '../../../../core/services/user.service';
import { ChoferService } from '../../../../core/services/chofer.service';
import { GuiaService } from '../../../../core/services/guia.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '../../../../../@fuse/animations';
import { IGuias } from 'app/core/interfaces/guias.interface';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


export interface Estados {
    codigo: number;
    descripcion: string;
}

export interface Opcviaje {
    codigo: string;
    descripcion: string;
}

export interface Listtipdoc {
    codigo: string;
    descripcion: string;
}


@Component({
    selector: 'app-editcotizaciondetalle',
    templateUrl: './editcotizaciondetalle.component.html',
    animations: fuseAnimations
})

export class EditcotizaciondetalleComponent implements OnInit, OnDestroy, OnChanges {
    $unsubscribe = new Subject();
    private _id: number;
    get id(): number {
        return this._id;
    }

    @Input() set id(id: number) {
        this._id = id;

        if (id) {
            this.getCotizacion();
        } else {
            if (this.registerForm) {
                this.registerForm.reset();
            }
        }
    }

    @Input() idMaster: number;
    @Input() totales: any; 

    selectedestado = 'Agendado';
    selectedopc = '0';
    selectedconductor = '';
    selectednombreguia = '';
    selecteddoc = 'Pendiente';
    

    filteredArticulos: Observable<Array<IArticulo>>;
    filteredUnidades: Observable<Array<IUnidad>>;
    // filteredUsuarios: Observable<Array<IUser>>;
    filteredChoferes: Observable<Array<IChoferes>>;
    

    listtipdoc: Listtipdoc[] = [
        { codigo: 'Factura', descripcion: 'Factura' },
        { codigo: 'Boleta', descripcion: 'Boleta' },
        { codigo: 'Recibo', descripcion: 'Recibo' },
        { codigo: 'Pendiente', descripcion: 'Pendiente' },
    ];

    opcviaje: Opcviaje[] = [
        { codigo: 'A disposición', descripcion: 'A disposición' },
        { codigo: 'Alquiler', descripcion: 'Alquiler' },
        { codigo: 'Solo ida', descripcion: 'Solo ida' },
        { codigo: 'Ida y vuelta', descripcion: 'Ida y retorno' },
        { codigo: 'Full Day', descripcion: 'Full Day' },
    ];

    estados: Estados[] = [
        { codigo: 0, descripcion: 'Cotizado'},
        { codigo: 1, descripcion: 'Confirmado'},
        { codigo: 2, descripcion: 'Programado'},
        { codigo: 3, descripcion: 'Atendido'},
        { codigo: 4, descripcion: 'Anulado'},
    ];

    cotizacion: ICotizaciondetalle;
    articulos: Array<IArticulo>;
    unidades: Array<IUnidad>;
    usuarios: Array<IUser>;
    cotizacionmaster: ICotizacion;
    choferes: Array<IChoferes>;
    guias: Array<IGuias>;

    registerForm: FormGroup;


    // _cotizacionesDetalle: Array<ICotizaciondetalle>;
    _cotizacionesDetalle: any;

    @Output() back: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() update: EventEmitter<ICotizaciondetalle> = new EventEmitter<ICotizaciondetalle>();
    
 

    @ViewChild('inputCodigo') inputCodigo: ElementRef<HTMLInputElement>;

    constructor(private cotizacionService: CotizaciondetalleService,
        private formBuilder: FormBuilder,
        private cotizacionmasterService: CotizacionService,
        private articuloService: ArticuloService,
        private unidadService: UnidadService,
        private choferService: ChoferService,
        private guiaService: GuiaService,
        public snackBar: MatSnackBar) {
    }

    getArticulo(): void {
        this.articuloService.getArticulos()
            .subscribe(response => {
                this.articulos = response;
            });
    }

    getUnidad(): void {
        this.unidadService.getUnidades()
            .subscribe(response => {
                this.unidades = response;
            });
    }

    // getUsuario(): void {
    //     this.userService.getUsers()
    //         .subscribe(response => {
    //             this.usuarios = response;
                
    //         });
    // }

    getChofer(): void {
        this.choferService.getChoferes()
            .subscribe(response => {
                this.choferes = response;
                // console.log('this.choferes', this.choferes);
               
            });
    }


    getGuia(): void {
        this.guiaService.getGuias()
            .subscribe(response => {
                this.guias = response;
                // console.log('this.choferes', this.choferes);
               
            });
    }


    ngOnInit(): void {
        this.createForm();
        this.getArticulo();
        this.getUnidad();
        this.getChofer();
        this.getGuia();
        
        
    }



    ngOnChanges(changes: SimpleChanges): void {
        if (changes.idMaster) {
            if (this.registerForm) {
                this.registerForm.get('codigo').setValue(this.idMaster);
            }
        }
    }

    private _filter(value: string): IArticulo[] {
        if (value && this.articulos) {
            const filterValue = value.toLowerCase();
            return this.articulos.filter(option => option.descripcion.toLowerCase().indexOf(filterValue) === 0);
        }
        return [];
    }

    private _filter2(value: string): IUnidad[] {
        if (value && this.unidades) {
        const filterValue2 = value.toLowerCase();
        return this.unidades.filter(option => option.descripcion.toLowerCase().includes(filterValue2));
        }
        return [];
    }

    private _filter3(value: number): IChoferes[] {
        if (value && this.choferes) {
        const filterValue3 = value;
        const result = this.choferes.filter(option => option.id = filterValue3);
        console.log(result);
        return result ;
        }
        return [];
    }

    createForm(): void {
        this.registerForm = this.formBuilder.group({
            fechaini: [''],
            horaini: [''],
            fechafin: [''],
            horafin: [''],
            pax: [''],
            descripcion: ['', Validators.required],
            desunimed: [''],
            lugorigen: [''],
            lugdestino: [''],
            cantidad: [''],
            precio: [''],
            imptotal: [''],
            opcviaje: [''],
            conductor: [''],
            nombreguia: [''],
            nvuelo: [''],
            proveedor: [''],
            obs: [''],
            estado: [0],
            tipodoc: [''],
            codigo: [this.idMaster],
        });

        const descripcionForm = this.registerForm.get('descripcion');
        const desunimedForm = this.registerForm.get('desunimed');
        // const desconductor = this.registerForm.get('conductor');

        this.filteredArticulos = descripcionForm.valueChanges.pipe(
            map(value => this._filter(value))
        );

        this.filteredUnidades = desunimedForm.valueChanges.pipe(
            map(value => this._filter2(value))
        );
        
        // this.filteredChoferes = desconductor.valueChanges.pipe(
        //     map(value => this._filter3(value))
        // );
        
        

        this.valueChanges();
        
    }

    valueChanges(): void {
        const precioControl = this.registerForm.get('precio');
        const cantidadControl = this.registerForm.get('cantidad');
        precioControl.valueChanges
            .pipe(takeUntil(this.$unsubscribe))
            .subscribe(value => {
                this.setImporteTotal(precioControl.value, cantidadControl.value);
            });

        cantidadControl.valueChanges
            .pipe(takeUntil(this.$unsubscribe))
            .subscribe(value => {
                this.setImporteTotal(precioControl.value, cantidadControl.value);
            });
    }

    setImporteTotal(a, b): void {
        this.registerForm.get('imptotal').setValue(a * b);
        // this.registerForm.get('imptotal').setValue(a);
    }

    getCotizacion(): void {
        this.cotizacionService.getCotizacion(this.id)
            .subscribe(response => {
                this.cotizacion = response;
                this.setForm();
            });
        

        
        this.getMaster();
    }

    setForm(): void {
        this.registerForm.get('codigo').setValue(this.cotizacion.codigo);
        this.registerForm.get('fechaini').setValue(this.cotizacion.fechaini);
        this.registerForm.get('horaini').setValue(this.cotizacion.horaini);
        this.registerForm.get('fechafin').setValue(this.cotizacion.fechafin);
        this.registerForm.get('horafin').setValue(this.cotizacion.horafin);
        this.registerForm.get('descripcion').setValue(this.cotizacion.descripcion);
        this.registerForm.get('desunimed').setValue(this.cotizacion.desunimed);
        this.registerForm.get('lugorigen').setValue(this.cotizacion.lugorigen);
        this.registerForm.get('lugdestino').setValue(this.cotizacion.lugdestino);
        this.registerForm.get('opcviaje').setValue(this.cotizacion.opcviaje);
        this.registerForm.get('nvuelo').setValue(this.cotizacion.nvuelo);
        this.registerForm.get('proveedor').setValue(this.cotizacion.proveedor);
        this.registerForm.get('obs').setValue(this.cotizacion.obs);
        this.registerForm.get('tipodoc').setValue(this.cotizacion.tipodoc);
        this.registerForm.get('pax').setValue(this.cotizacion.pax);
        this.registerForm.get('cantidad').setValue(this.cotizacion.cantidad);
        this.registerForm.get('precio').setValue(this.cotizacion.precio);
        this.registerForm.get('imptotal').setValue(this.cotizacion.imptotal);
        this.registerForm.get('estado').setValue(this.cotizacion.estado);
        this.registerForm.get('conductor').setValue(this.cotizacion.conductor);
        this.registerForm.get('nombreguia').setValue(this.cotizacion.nombreguia);
        

    }

    onBack(): void {
        this.back.emit(true);
    }

    saveForm(clear?: boolean): void {
        if (this.registerForm.valid) {
            this.saveCotizacion();
            if (clear) {
                this.registerForm.reset();
                this.inputCodigo.nativeElement.focus();
            }
        } else {
            alert('FORMUARLIO INVALIDO');
        }
    }

    prepareData(): any {
        /** rest spread, paso de parametros REST, este método sirve para clonar objetos. destructuración de datos
         * http://www.etnassoft.com/2016/07/04/desestructuracion-en-javascript-parte-1/ */
        this.registerForm.get('codigo').setValue(this.idMaster);
        
        const data: ICotizaciondetalle = { ...this.registerForm.getRawValue() };
        data.master = this.idMaster;
        
        return data;
    }

    updateCotizacion(): void {
        const data = this.prepareData();
        this.cotizacionService.updateCotizacion(this.id, data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
                
            });

        
        this.updateMaster();
    }


    getMaster(): void {
        
        this.cotizacionmasterService.getCotizacion(this.idMaster)
            .subscribe(responsmaster => {
            this.cotizacionmaster = responsmaster;
            // this._cotizacionesDetalle = responsmaster;
        }); 
    }
   
    addCotizacion(): void {
        const data = this.prepareData();
        this.cotizacionService.addCotizacion(data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
                
            });
        
       
        this.updateMaster();
    }

    updateMaster(): void {

            
            this.getMaster();
            // this.getCotizacion();
            // console.log('cotizacionmaster', this.idMaster, this.cotizacionmaster);
            // console.log('cotizacionmaster', this.idMaster, this.cotizacionmaster);  
            
            // console.log('_cotizacionesDetalle', this._cotizacionesDetalle); 
            // const subtotal = this._cotizacionesDetalle.reduce((a, b) => +(b.imptotal) + a, 0);
            // console.log('subtotal', subtotal); 
             
            
                      
            this.cotizacionmasterService.updateCotizacion(this.idMaster, this.cotizacionmaster)
            .subscribe(response => {
                        console.log('graba Maestro');
                        console.log('graba Maestrofinal', response.cotizaciones);
                        console.log('this.totales', this.totales);
                        
                        this.cotizacionmaster.impsubtotal =  response.cotizaciones.reduce((a, b) => +(b.imptotal) + a, 0);
                       // this.cotizacionmaster.impdescuentos = +this.totales.descuento;
                       // this.cotizacionmaster.impigv = +(this.totales.igv).toFixed(2);
                       // this.cotizacionmaster.imptotal = +this.totales.total_general.toFixed(2);
                        console.log('this.cotizacionmaster.impsubtotal', this.cotizacionmaster.impsubtotal);
                    });
            

            this.cotizacionmasterService.updateCotizacion(this.idMaster, this.cotizacionmaster)
            .subscribe(response => {
                       // this.cotizacionmaster.impdescuentos = +this.totales.descuento;
                       // this.cotizacionmaster.impigv = +(this.totales.igv).toFixed(2);
                       // this.cotizacionmaster.imptotal = +this.totales.total_general.toFixed(2);
                        console.log('this.cotizacionmaster.impsubtotal2', this.cotizacionmaster.impsubtotal);
                    });
            // console.log(' this._cotizacionesDetalle', this._cotizacionesDetalle);
            // console.log('updatethis.totales', parseFloat(this.totales.subtotal), this.totales);
            
           
            
    }

   

    saveCotizacion(): void {
        this.id ? this.updateCotizacion() : this.addCotizacion();
    }

    ngOnDestroy(): void {
        this.$unsubscribe.next();
        this.$unsubscribe.complete();
    }

   
}

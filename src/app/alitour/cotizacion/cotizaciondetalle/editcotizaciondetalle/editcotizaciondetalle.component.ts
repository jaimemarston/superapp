import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CotizaciondetalleService } from '../../../../core/services/cotizaciondetalle.service';
import { ICotizaciondetalle } from '../../../../core/interfaces/cotizacion.interface';
import { IArticulo } from '../../../../core/interfaces/articulo.interface';
import { IUnidad } from '../../../../core/interfaces/unidad.interface';
import { ArticuloService } from '../../../../core/services/articulo.service';
import { UnidadService } from '../../../../core/services/unidad.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '../../../../../@fuse/animations';


export interface Opcviaje {
    codigo: string;
    descripcion: string;
}
export interface IUnidadopc {
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
    myControl = new FormControl();
    options: string[] = ['One', 'Two', 'Three'];

    optionsUnidades: IUnidadopc[] = [
        { descripcion: 'Mini Van' },
        { descripcion: 'Shelley' },
        { descripcion: 'Igor' }
    ];

    selectedopc = '0';
    filteredArticulos: Observable<Array<IArticulo>>;
    filteredUnidades: Observable<IUnidadopc[]>;

    opcviaje: Opcviaje[] = [
        { codigo: 'Solo ida', descripcion: 'Solo ida' },
        { codigo: 'Ida y vuelta', descripcion: 'Ida y vuelta' },
        { codigo: 'Full Day', descripcion: 'Full Day' },
    ];

    cotizacion: ICotizaciondetalle;
    articulos: Array<IArticulo>;
    unidades: Array<IUnidad>;


    registerForm: FormGroup;

    @Output() back: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() update: EventEmitter<ICotizaciondetalle> = new EventEmitter<ICotizaciondetalle>();

    @ViewChild('inputCodigo') inputCodigo: ElementRef<HTMLInputElement>;

    constructor(private cotizacionService: CotizaciondetalleService,
        private formBuilder: FormBuilder,
        private articuloService: ArticuloService,
        private unidadService: UnidadService,
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




    ngOnInit(): void {
        this.createForm();
        this.getArticulo();
        this.filteredUnidades = this.myControl.valueChanges
        .pipe(
            startWith(''),
            map(name => this._filter3(name))
          );
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


    createForm(): void {
        this.registerForm = this.formBuilder.group({
            fechaini: [''],
            horaini: [''],
            fechafin: [''],
            horafin: [''],
            descripcion: ['', Validators.required],
            desunimed: [''],
            lugorigen: [''],
            lugdestino: [''],
            cantidad: [''],
            precio: [''],
            imptotal: [''],
            opcviaje: [''],
            conductor: [''],
            nvuelo: [''],
            proveedor: [''],
            obs: [''],
            tipodoc: [''],
            codigo: [this.idMaster],
        });

        const descripcionForm = this.registerForm.get('descripcion');
        this.filteredArticulos = descripcionForm.valueChanges.pipe(
            map(value => this._filter(value))
        );


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
    }

    getCotizacion(): void {
        this.cotizacionService.getCotizacion(this.id)
            .subscribe(response => {
                this.cotizacion = response;
                this.setForm();
            });
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
        this.registerForm.get('conductor').setValue(this.cotizacion.conductor);
        this.registerForm.get('nvuelo').setValue(this.cotizacion.nvuelo);
        this.registerForm.get('proveedor').setValue(this.cotizacion.proveedor);
        this.registerForm.get('obs').setValue(this.cotizacion.obs);
        this.registerForm.get('tipodoc').setValue(this.cotizacion.tipodoc);
        this.registerForm.get('cantidad').setValue(this.cotizacion.cantidad);
        this.registerForm.get('precio').setValue(this.cotizacion.precio);
        this.registerForm.get('imptotal').setValue(this.cotizacion.imptotal);
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
    }

    addCotizacion(): void {
        const data = this.prepareData();

        this.cotizacionService.addCotizacion(data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
            });
    }

    saveCotizacion(): void {
        this.id ? this.updateCotizacion() : this.addCotizacion();
    }

    ngOnDestroy(): void {
        this.$unsubscribe.next();
        this.$unsubscribe.complete();
    }

    displayFn(user?: IUnidadopc): string | undefined {
        return user ? user.descripcion : undefined;
    }

    private _filter3(descripcion: string): IUnidadopc[] {
        const filterValue = descripcion.toLowerCase();
        
        return this.optionsUnidades.filter(option => option.descripcion.toLowerCase().includes(filterValue));
    }
}

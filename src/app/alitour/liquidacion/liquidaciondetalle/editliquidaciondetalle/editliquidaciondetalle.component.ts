import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { LiquidaciondetalleService } from '../../../../core/services/liquidaciondetalle.service';
import { ILiquidaciondetalle } from '../../../../core/interfaces/liquidacion.interface';
import { IUnidad } from '../../../../core/interfaces/unidad.interface';
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

@Component({
    selector: 'app-editliquidaciondetalle',
    templateUrl: './editliquidaciondetalle.component.html',
    animations: fuseAnimations
})

export class EditliquidaciondetalleComponent implements OnInit, OnDestroy, OnChanges {
    $unsubscribe = new Subject();
    private _id: number;
    get id(): number {
        return this._id;
    }

    

    @Input() set id(id: number) {
        this._id = id;

        if (id) {
            this.getLiquidacion();
        } else {
            if (this.registerForm) {
                this.registerForm.reset();
            }
        }
    }

    @Input() idMaster: number;
    
    
    selectedopc = '0';
    filteredMateriales: any;
    filteredUnidades: Observable<Array<IUnidad>>;

    opcviaje: Opcviaje[] = [
        { codigo: 'Solo ida', descripcion: 'Solo ida' },
        { codigo: 'Ida y vuelta', descripcion: 'Ida y vuelta' },
        { codigo: 'Full Day', descripcion: 'Full Day' },
    ];

    liquidacion: ILiquidaciondetalle;
    materiales: Array<any>;
    unidades: Array<IUnidad>;


    registerForm: FormGroup;

    @Output() back: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() update: EventEmitter<ILiquidaciondetalle> = new EventEmitter<ILiquidaciondetalle>();

    @ViewChild('inputCodigo' , {static: false}) inputCodigo: ElementRef<HTMLInputElement>;

    constructor(private liquidacionService: LiquidaciondetalleService,
        private formBuilder: FormBuilder,
        private unidadService: UnidadService,
        public snackBar: MatSnackBar) {
    }
    


    getUnidad(): void {
        this.unidadService.getUnidades()
            .subscribe(response => {
                this.unidades = response;
            });
    }




    ngOnInit(): void {
        this.createForm();
        this.getUnidad();
        
    }



    ngOnChanges(changes: SimpleChanges): void {
        if (changes.idMaster) {
            if (this.registerForm) {
                this.registerForm.get('codigo').setValue(this.idMaster);
            }
        }
    }



    private _filter2(value: string): IUnidad[] {
        if (value && this.unidades) {
        const filterValue2 = value.toLowerCase();
        return this.unidades.filter(option => option.descripcion.toLowerCase().includes(filterValue2));
        }
        return [];
    }

    createForm(): void {
        this.registerForm = this.formBuilder.group({
            descripcion: ['', Validators.required],
            desunimed: [''],
            cantidad: [''],
            precio: [''],
            imptotal: [''],
            codpro: [''],
            codigo: [this.idMaster],
        });

        const descripcionForm = this.registerForm.get('descripcion');
        const desunimedForm = this.registerForm.get('desunimed');


        this.filteredUnidades = desunimedForm.valueChanges.pipe(
            map(value => this._filter2(value))
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
        this.registerForm.get('imptotal').setValue((a * b).toFixed(2));
    }

    getcodigo(a): void {
        console.log(a);
        this.registerForm.get('codpro').setValue(a.codigo);
        this.registerForm.get('desunimed').setValue(a.unimed);
        //  if (a.talla != null) {
        //      this.registerForm.get('talla').setValue(a.talla);
        //   }
        this.registerForm.get('precio').setValue(a.precioventa);
    }
    getLiquidacion(): void {
        this.liquidacionService.getLiquidacion(this.id)
            .subscribe(response => {
                this.liquidacion = response;
                this.setForm();
            });
    }

    setForm(): void {
        this.registerForm.get('codigo').setValue(this.liquidacion.codigo);
        this.registerForm.get('descripcion').setValue(this.liquidacion.descripcion);
        this.registerForm.get('desunimed').setValue(this.liquidacion.desunimed);
        this.registerForm.get('cantidad').setValue(this.liquidacion.cantidad);
        this.registerForm.get('precio').setValue(this.liquidacion.precio);
        this.registerForm.get('imptotal').setValue(this.liquidacion.imptotal);
        this.registerForm.get('codpro').setValue(this.liquidacion.codpro);
    }

    onBack(): void {
        this.back.emit(true);
    }

    saveForm(clear?: boolean): void {
        if (this.registerForm.valid) {
            this.saveliquidacion();
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
        
        const data: ILiquidaciondetalle = { ...this.registerForm.getRawValue() };
        data.master = this.idMaster;

        return data;
    }

    updateLiquidacion(): void {
        const data = this.prepareData();
        this.liquidacionService.updateLiquidacion(this.id, data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
            });
    }

    addliquidacion(): void {
        const data = this.prepareData();

        this.liquidacionService.addLiquidacion(data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
            });
    }

    saveliquidacion(): void {
        this.id ? this.updateLiquidacion() : this.addliquidacion();
    }

    ngOnDestroy(): void {
        this.$unsubscribe.next();
        this.$unsubscribe.complete();
    }

   
}

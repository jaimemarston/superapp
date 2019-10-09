import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CotizacionService } from '../../../../core/services/cotizacion.service';
import { ICotizacion } from '../../../../core/interfaces/cotizacion.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSelectModule, MatFormFieldModule, MatListModule } from '@angular/material';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { ClienteService } from '../../../../core/services/cliente.service';
import { IClientes } from '../../../../core/interfaces/clientes.interface';

export interface Estados {
    codigo: number;
    descripcion: string;
}

export interface Opcmoneda {
    codigo: string;
    descripcion: string;
}

export interface Listtipdoc {
    codigo: string;
    descripcion: string;
}

@Component({
    selector: 'app-editcotizacion',
    templateUrl: './editcotizacion.component.html',
    styleUrls: ['./../../../../app.component.scss']
})

export class EditCotizacionComponent implements OnInit {
    private _id: number;
    get id(): number {
        return this._id;
    }

    selectedest: 0;
    selecteddoc = 'Pendiente';
    selectedmoneda = 'SOLES';
    selectedestado = 'Agendado';
    filteredClientes: Observable<Array<IClientes>>;


    opcmoneda: Opcmoneda[] = [
        { codigo: 'SOLES', descripcion: 'SOLES' },
        { codigo: 'DOLARES', descripcion: 'DOLARES' },
    ];

    listtipdoc: Listtipdoc[] = [
        { codigo: 'Factura', descripcion: 'Factura' },
        { codigo: 'Boleta', descripcion: 'Boleta' },
        { codigo: 'Recibo', descripcion: 'Recibo' },
        { codigo: 'Pendiente', descripcion: 'Pendiente' },
    ];

    estados: Estados[] = [
        {codigo: 0, descripcion: 'Cotizado'},
        {codigo: 1, descripcion: 'Agendado'},
        {codigo: 2, descripcion: 'Atendido'},
        {codigo: 3, descripcion: 'Pagado'},
        {codigo: 4, descripcion: 'Anulado'},
        {codigo: 5, descripcion: 'Rechazado'},
        
        
    ];


    @Input() set id(id: number) {
        this._id = id;
        /* console.log(this.id); */
        if (id) {
            this.getCotizacion();
        } else {
            if (this.registerForm) {
                this.registerForm.reset();
            }
        }
    }

    cotizacion: ICotizacion;
    registerForm: FormGroup;

    clientes: Array<IClientes>;

    @Output() back: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() update: EventEmitter<ICotizacion> = new EventEmitter<ICotizacion>();

    constructor(private cotizacionService: CotizacionService,
                private clienteService: ClienteService,
                private formBuilder: FormBuilder,
                public snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.createForm();
        this.getCliente();
    }

    private _filter(value: string): IClientes[] {
        if (value && this.clientes) {
            const filterValue = value.toLowerCase();
            return this.clientes.filter(option => option.nombre.toLowerCase().indexOf(filterValue) === 0);
        }

        return [];
    }

    createForm(): void {
        this.registerForm = this.formBuilder.group({
            codigo: ['', Validators.compose([
                Validators.required
            ])],
            fechadoc: [''],
            desruc: [''],
            ruc: [''],
            telruc: [''],
            correoruc: [''],
            dirruc: [''],
            destipdoc: [''],
            desconpag: [''],
            desmonepago: [''],
            obs: [''],
            estado: [0],
        });

        const descripcionForm = this.registerForm.get('desruc');

        this.filteredClientes = descripcionForm.valueChanges.pipe(
            map(value => this._filter(value))
        );

    }

  
    getcodigo(a): void {
        console.log(a);
        this.registerForm.get('ruc').setValue(a.ruc);
        this.registerForm.get('desruc').setValue(a.nombre);
        this.registerForm.get('telruc').setValue(a.telefono1);
        this.registerForm.get('correoruc').setValue(a.correo);
        this.registerForm.get('dirruc').setValue(a.direccion);
        this.registerForm.get('obs').setValue(a.obs);
        
    }

    getCliente(): void {
        this.clienteService.getClientes()
            .subscribe(response => {
                this.clientes = response;
            });
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
        this.registerForm.get('fechadoc').setValue(this.cotizacion.fechadoc);
        this.registerForm.get('ruc').setValue(this.cotizacion.ruc);
        this.registerForm.get('dirruc').setValue(this.cotizacion.dirruc);
        this.registerForm.get('desruc').setValue(this.cotizacion.desruc);
        this.registerForm.get('telruc').setValue(this.cotizacion.telruc);
        this.registerForm.get('correoruc').setValue(this.cotizacion.correoruc);
        this.registerForm.get('desmonepago').setValue(this.cotizacion.desmonepago);
        this.registerForm.get('desconpag').setValue(this.cotizacion.desconpag);
        this.registerForm.get('destipdoc').setValue(this.cotizacion.destipdoc);
        this.registerForm.get('estado').setValue(this.cotizacion.estado);
        this.registerForm.get('obs').setValue(this.cotizacion.obs);
    }


    onBack(): void {
        this.back.emit(true);
    }

    saveForm(clear?: boolean): void {
        if (this.registerForm.valid) {
            this.saveCotizacion();
            if (clear) {
                this.registerForm.reset();
            }
        } else {
            alert('FORMUARLIO INVALIDO');
        }
    }

    updateCotizacion(): void {
        const data: ICotizacion = this.registerForm.getRawValue();
        this.cotizacionService.updateCotizacion(this.id, data)
            .subscribe(response => {
                this.update.emit(response);
                console.log('graba Maestro');
                console.log(data);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
            });
    }

    addCotizacion(): void {
        const data: ICotizacion = this.registerForm.getRawValue();
        this.cotizacionService.addCotizacion(data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
            });
    }

    saveCotizacion(): void {
        this.id ? this.updateCotizacion() : this.addCotizacion();
    }
}

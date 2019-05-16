import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedorService } from '../../../core/services/proveedor.service';
import { BancoService } from '../../../core/services/banco.service';
import { MatSnackBar } from '@angular/material';
import { IProveedores } from '../../../core/interfaces/proveedores.interface';
import { Ibancos } from '../../../core/interfaces/varios.interface';


export interface Monedas {
    codigo: string;
    descripcion: string;
}

@Component({
    selector: 'proveedores-form',
    templateUrl: './proveedores-form.component.html',
    styleUrls: ['./proveedores-form.component.scss']
})
export class ProveedoresFormComponent implements OnInit {
    selectedmon = '0';
    /* moneda por defecto */
    selectedmon2 = '0';
    /* moneda por defecto */
    selectedban = '';
    selectedban2 = '';

    private _id: number;
    get id(): number {
        return this._id;
    }

    @Input() set id(id: number) {
        this._id = id;
        if (id) {
            this.getProveedor();
        } else {
            if (this.registerForm) {
                this.registerForm.reset();
            }
        }
    }

    monedas: Monedas[] = [
        {codigo: 'Soles', descripcion: 'Soles'},
        {codigo: 'Dolares', descripcion: 'Dolares'},
    ];


    proveedor: IProveedores;
    registerForm: FormGroup;
    bancos: Array<Ibancos>;
    bancos2: Array<Ibancos>;

    @Output() update: EventEmitter<IProveedores> = new EventEmitter<IProveedores>();

    @ViewChild('inputNombre') inputNombre: ElementRef<HTMLInputElement>;

    form: FormGroup;

    constructor(private proveedorService: ProveedorService,
                private bancoService: BancoService,
                private formBuilder: FormBuilder,
                public snackBar: MatSnackBar,
                private router: Router,
                private route: ActivatedRoute) {
        this.id = this.route.snapshot.params['id'];
    }

    ngOnInit(): void {
        this.createForm();
        this.getBanco();
    }

    createForm(): void {
        this.registerForm = this.formBuilder.group({
            nombre: [null, Validators.compose([
                Validators.required,
                Validators.minLength(1),
            ])],
            ruc: [null],
            telefono1: [null],
            telefono2: [null],
            telefono3: [null],
            contacto: [null],
            telcontacto: [null],
            direccion: [null],
            correo: [null],
            paginaweb: [null],
            tipocc: [null],
            destipocc: [null],
            condcompvent: [null],
            banco_nombre1: [null],
            banco_cuenta1: [null],
            banco_moneda1: [null],
            banco_nombre2: [null],
            banco_cuenta2: [null],
            banco_moneda2: [null],
            fechanac: [null],
            fechaini: [null],
            fechafin: [null],
            grupo: [null],
            
        });
    }

    back(): void {
        this.router.navigate(['proveedores']);
    }

    getBanco(): void {
        this.bancoService.getBancos()
            .subscribe(response => {
                this.bancos = response;
            });
    }

    getProveedor(): void {
        this.proveedorService.getProveedor(this.id)
            .subscribe(response => {
                this.proveedor = response;
                this.setForm();
            });
    }

    setForm(): void {
        this.registerForm.get('nombre').setValue(this.proveedor.nombre);
        this.registerForm.get('ruc').setValue(this.proveedor.ruc);
        this.registerForm.get('telefono1').setValue(this.proveedor.telefono1);
        this.registerForm.get('telefono2').setValue(this.proveedor.telefono2);
        this.registerForm.get('telefono3').setValue(this.proveedor.telefono3);
        this.registerForm.get('contacto').setValue(this.proveedor.contacto);
        this.registerForm.get('telcontacto').setValue(this.proveedor.telcontacto);
        this.registerForm.get('direccion').setValue(this.proveedor.direccion);
        this.registerForm.get('correo').setValue(this.proveedor.correo);
        this.registerForm.get('paginaweb').setValue(this.proveedor.paginaweb);
        this.registerForm.get('tipocc').setValue(this.proveedor.tipocc);
        this.registerForm.get('destipocc').setValue(this.proveedor.tipocc);
        this.registerForm.get('condcompvent').setValue(this.proveedor.tipocc);
        this.registerForm.get('banco_nombre1').setValue(this.proveedor.banco_nombre1);
        this.registerForm.get('banco_cuenta1').setValue(this.proveedor.banco_cuenta1);
        this.registerForm.get('banco_moneda1').setValue(this.proveedor.banco_moneda1);
        this.registerForm.get('banco_nombre2').setValue(this.proveedor.banco_nombre2);
        this.registerForm.get('banco_cuenta2').setValue(this.proveedor.banco_cuenta2);
        this.registerForm.get('banco_moneda2').setValue(this.proveedor.banco_moneda2);
        this.registerForm.get('fechanac').setValue(this.proveedor.fechanac);
        this.registerForm.get('fechaini').setValue(this.proveedor.fechaini);
        this.registerForm.get('fechafin').setValue(this.proveedor.fechafin);
        this.registerForm.get('grupo').setValue(this.proveedor.grupo);
    }

    onBack(): void {
        // this.back.emit(true);
    }

    saveForm(clear?: boolean): void {
        if (this.registerForm.valid) {
            this.saveProveedor();
            if (clear) {
                this.registerForm.reset();
                this.inputNombre.nativeElement.focus();
            }
        } else {
            alert('FORMUARLIO INVALIDO');
        }
    }

    updateProveedor(): void {
        const data: IProveedores = this.registerForm.getRawValue();
        this.proveedorService.updateProveedor(this.id, data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
                this.goListProveedores();
            });
    }

    addProveedor(): void {
        const data: IProveedores = this.registerForm.getRawValue();
        this.proveedorService.addProveedor(data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
                this.registerForm.reset();
                this.inputNombre.nativeElement.focus();
            });
    }

    goListProveedores(): void {
        this.router.navigate(['proveedores']);
    }

    saveProveedor(): void {
        this.id ? this.updateProveedor() : this.addProveedor();
    }

}

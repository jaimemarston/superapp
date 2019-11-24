import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../../core/services/cliente.service';
import { BancoService } from '../../../core/services/banco.service';
import { MatSnackBar } from '@angular/material';
import { IClientes } from '../../../core/interfaces/clientes.interface';
import { IRelcli } from '../../../core/interfaces/clientes.interface';
import { Ibancos } from '../../../core/interfaces/varios.interface';
import {CommonService} from '../../../core/services/common.service';
import to from 'await-to-js';
import {Subject} from 'rxjs';

export interface Tipoprov {
    codigo: string;
    descripcion: string;
}

export interface Monedas {
    codigo: string;
    descripcion: string;
}

@Component({
    selector: 'clientes-form',
    templateUrl: './clientes-form.component.html',
    styleUrls: ['./clientes-form.component.scss']
})
export class ClientesFormComponent implements OnInit, OnDestroy {
    selectedmon = '0';
    /* moneda por defecto */
    selectedmon2 = '0';
    /* moneda por defecto */
    selectedban = '';
    selectedban2 = '';
    selectedtip = '';
    selectedcli = '';

    private _id: number;
    get id(): number {
        return this._id;
    }

    @Input() set id(id: number) {
        this._id = id;
        if (id) {
            this.getClient();
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

    tipoprov: Tipoprov[] = [
        {codigo: 'EMBAJADA', descripcion: 'EMBAJADA'},
        {codigo: 'HOTEL', descripcion: 'HOTEL'},
        {codigo: 'AGENCIA', descripcion: 'AGENCIA'},
        {codigo: 'EJECUTIVO', descripcion: 'EJECUTIVO'},
        {codigo: 'OTROS', descripcion: 'OTROS'},
    ];

    relcli: any;
    cliente: IClientes;
    registerForm: FormGroup;
    bancos: Array<Ibancos>;
    bancos2: Array<Ibancos>;
    
    unsubscribe = new Subject();

    @Output() update: EventEmitter<IClientes> = new EventEmitter<IClientes>();

    @ViewChild('inputNombre' , {static: false}) inputNombre: ElementRef<HTMLInputElement>;

    form: FormGroup;

    constructor(private clienteService: ClienteService,
                private bancoService: BancoService,
                private formBuilder: FormBuilder,
                public snackBar: MatSnackBar,
                private router: Router,
                private route: ActivatedRoute,
                private commonService: CommonService) {
        this.id = this.route.snapshot.params['id'];
    }

    ngOnInit(): void {
        this.createForm();
        this.getBanco();
        this.getRelclie();
    }

    createForm(): void {
        this.registerForm = this.formBuilder.group({
            nombre: [null, Validators.compose([
                Validators.required,
                Validators.minLength(1),
            ])],
            ruc: [null, Validators.compose([
                Validators.required
            ])],
            telefono1: [null, Validators.compose([
                Validators.required
            ])],
            telefono2: [null],
            telefono3: [null],
            contacto: [null, Validators.compose([
                Validators.required
            ])],
            telcontacto: [null],
            direccion: [null],
            correo: [null, Validators.compose([
                Validators.required
            ])],
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
            contacto2: [null],
            telcontacto2: [null],
            correo2: [null],
            contacto3: [null],
            telcontacto3: [null],
            correo3: [null],
            categprov: [null],
            comonoscontacto: [null],
        });
    }

    back(): void {
        this.router.navigate(['clientes']);
    }

    getBanco(): void {
        this.bancoService.getBancos()
            .subscribe(response => {
                this.bancos = response;
            });
    }
    
    getRelclie(): void {
        let relcli1 = [];
        
        this.clienteService.getClientes()
        .subscribe(response => {
            relcli1 = response;
            // const result = relcli1.map(v => v.nombre);
            const result = relcli1.map(v => <Object>{'nombre' : v.nombre});
            // console.log('relclimap', result) ;     
            this.relcli = result;     
         });

    }
    getClient(): void {
        this.clienteService.getCliente(this.id)
            .subscribe(response => {
                this.cliente = response;
                this.setForm();
            });
    }

    setForm(): void {
        this.registerForm.get('nombre').setValue(this.cliente.nombre);
        this.registerForm.get('ruc').setValue(this.cliente.ruc);
        this.registerForm.get('telefono1').setValue(this.cliente.telefono1);
        this.registerForm.get('telefono2').setValue(this.cliente.telefono2);
        this.registerForm.get('telefono3').setValue(this.cliente.telefono3);
        this.registerForm.get('contacto').setValue(this.cliente.contacto);
        this.registerForm.get('telcontacto').setValue(this.cliente.telcontacto);
        this.registerForm.get('direccion').setValue(this.cliente.direccion);
        this.registerForm.get('correo').setValue(this.cliente.correo);
        this.registerForm.get('paginaweb').setValue(this.cliente.paginaweb);
        this.registerForm.get('tipocc').setValue(this.cliente.tipocc);
        this.registerForm.get('destipocc').setValue(this.cliente.tipocc);
        this.registerForm.get('condcompvent').setValue(this.cliente.tipocc);
        this.registerForm.get('banco_nombre1').setValue(this.cliente.banco_nombre1);
        this.registerForm.get('banco_cuenta1').setValue(this.cliente.banco_cuenta1);
        this.registerForm.get('banco_moneda1').setValue(this.cliente.banco_moneda1);
        this.registerForm.get('banco_nombre2').setValue(this.cliente.banco_nombre2);
        this.registerForm.get('banco_cuenta2').setValue(this.cliente.banco_cuenta2);
        this.registerForm.get('banco_moneda2').setValue(this.cliente.banco_moneda2);
        this.registerForm.get('fechanac').setValue(this.cliente.fechanac);
        this.registerForm.get('fechaini').setValue(this.cliente.fechaini);
        this.registerForm.get('fechafin').setValue(this.cliente.fechafin);
        this.registerForm.get('grupo').setValue(this.cliente.grupo);
        this.registerForm.get('categprov').setValue(this.cliente.categprov);
        this.registerForm.get('contacto2').setValue(this.cliente.contacto2);
        this.registerForm.get('telcontacto2').setValue(this.cliente.telcontacto2);
        this.registerForm.get('correo2').setValue(this.cliente.correo2);
        this.registerForm.get('contacto3').setValue(this.cliente.contacto3);
        this.registerForm.get('telcontacto3').setValue(this.cliente.telcontacto3);
        this.registerForm.get('correo3').setValue(this.cliente.correo3);
        this.registerForm.get('comonoscontacto').setValue(this.cliente.comonoscontacto);
        
    }

    onBack(): void {
        // this.back.emit(true);
    }

    saveForm(clear?: boolean): void {
        if (this.registerForm.valid) {
            this.saveClient();
            if (clear) {
                this.registerForm.reset();
                this.inputNombre.nativeElement.focus();
            }
        } else {
            alert('FORMUARLIO INVALIDO');
        }
    }

    updateClient(): void {
        const data: IClientes = this.registerForm.getRawValue();
        this.clienteService.updateCliente(this.id, data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
                this.goListClientes();
            });
    }

    async addClient(): Promise<void> {
        const data: IClientes = this.registerForm.getRawValue();
        const [error, response] = await to(this.clienteService.addClient(data).toPromise());
        // this.clienteService.addClient(data)
        // .subscribe(response => {
        if (response) {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
                this.registerForm.reset();
                this.createForm();
                this.inputNombre.nativeElement.focus();
        } else {
            this.commonService.showFormError(error);
        }
    }


    goListClientes(): void {
        this.router.navigate(['clientes']);
    }

    saveClient(): void {
        this.id ? this.updateClient() : this.addClient();
    }

    
    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}

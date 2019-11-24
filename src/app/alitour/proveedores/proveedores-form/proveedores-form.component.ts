import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedorService } from '../../../core/services/proveedor.service';
import { BancoService } from '../../../core/services/banco.service';
import { MatSnackBar } from '@angular/material';
import { IProveedores } from '../../../core/interfaces/proveedores.interface';
import { Ibancos } from '../../../core/interfaces/varios.interface';


export interface Idiomaprov {
    codigo: string;
    descripcion: string;
}

export interface Categoprov {
    codigo: string;
    descripcion: string;
}

export interface Tipoprov {
    codigo: string;
    descripcion: string;
}

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
    selectedmon3 = '0';
    /* moneda por defecto */
    selectedban = '';
    selectedban2 = '';
    selectedban3 = '';
    selectedtip = '';
    selectedCat: string[] = [];
    selectedIdi: string[] = [];
    selectedGru: string[] = [];

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

    Idiomaprov: Idiomaprov[] = [
        {codigo: 'Ingles', descripcion: 'Ingles'},
        {codigo: 'Chino', descripcion: 'Chino'},
        {codigo: 'Portugues', descripcion: 'Portugues'},
        {codigo: 'Frances', descripcion: 'Frances'},
        {codigo: 'Mandarin', descripcion: 'Mandarin'},
        {codigo: 'Italiano', descripcion: 'Italiano'},
        {codigo: 'Ruso', descripcion: 'Ruso'},
    ];

    monedas: Monedas[] = [
        {codigo: 'Soles', descripcion: 'Soles'},
        {codigo: 'Dolares', descripcion: 'Dolares'},
    ];

    tipoprov: Tipoprov[] = [
        {codigo: 'SEDAN-AUTO', descripcion: 'SEDAN-AUTO'},
        {codigo: '4x4', descripcion: '4x4'},
        {codigo: 'SUV', descripcion: 'SUV'},
        {codigo: 'VAN', descripcion: 'VAN'},
        {codigo: 'SPRINTER', descripcion: 'SPRINTER'},
        {codigo: 'MINIBUS', descripcion: 'MINIBUS'},
        {codigo: 'BUS', descripcion: 'BUS'},
        {codigo: 'OTROS', descripcion: 'OTROS'},
    ];
    
    categoprov: Categoprov[] = [
        {codigo: 'AGENCIA', descripcion: 'AGENCIA'},
        {codigo: 'TRANSPORTE', descripcion: 'TRANSPORTE'},
        {codigo: 'SERVICIOS', descripcion: 'SERVICIOS'},
        {codigo: 'ASEGURADORAS', descripcion: 'ASEGURADORAS'},
    ];


    proveedor: IProveedores;
    registerForm: FormGroup;
    bancos: Array<Ibancos>;
    bancos2: Array<Ibancos>;

    @Output() update: EventEmitter<IProveedores> = new EventEmitter<IProveedores>();

    @ViewChild('inputNombre' , {static: false}) inputNombre: ElementRef<HTMLInputElement>;

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
            banco_nombre3: [null],
            banco_cuenta3: [null],
            banco_moneda3: [null],
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
            banco_nomdest1: [null],
            banco_nomdest2: [null],
            banco_nomdest3: [null],
            idioma: [null],
            categprov: [null],
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
        this.registerForm.get('correo').setValue(this.proveedor.correo);
        this.registerForm.get('direccion').setValue(this.proveedor.direccion);
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
        this.registerForm.get('banco_nombre3').setValue(this.proveedor.banco_nombre3);
        this.registerForm.get('banco_cuenta3').setValue(this.proveedor.banco_cuenta3);
        this.registerForm.get('banco_moneda3').setValue(this.proveedor.banco_moneda3);
        this.registerForm.get('fechanac').setValue(this.proveedor.fechanac);
        this.registerForm.get('fechaini').setValue(this.proveedor.fechaini);
        this.registerForm.get('fechafin').setValue(this.proveedor.fechafin);
        
        this.registerForm.get('contacto2').setValue(this.proveedor.contacto2);
        this.registerForm.get('telcontacto2').setValue(this.proveedor.telcontacto2);
        this.registerForm.get('correo2').setValue(this.proveedor.correo2);
        this.registerForm.get('contacto3').setValue(this.proveedor.contacto3);
        this.registerForm.get('telcontacto3').setValue(this.proveedor.telcontacto3);
        this.registerForm.get('correo3').setValue(this.proveedor.correo3);
        this.registerForm.get('banco_nomdest1').setValue(this.proveedor.banco_nomdest1);
        this.registerForm.get('banco_nomdest2').setValue(this.proveedor.banco_nomdest2);
        this.registerForm.get('banco_nomdest3').setValue(this.proveedor.banco_nomdest3);
        
        // const array = this.proveedor.idioma.split(',');
        // console.log('idioma', array);
        // this.registerForm.get('idioma').setValue(array);
        // Idioma 
        // let array: string[] = [];
        // if (this.proveedor.idioma !== null) {
        //     array = this.proveedor.idioma.split(',');
        // }
        let arrayg = this.proveedor && this.proveedor.grupo ? this.proveedor.grupo.split(',') : []; 
        this.selectedGru = arrayg;
        this.registerForm.get('grupo').setValue(arrayg);


        let array = this.proveedor && this.proveedor.idioma ? this.proveedor.idioma.split(',') : [];
        this.selectedIdi = array;
        this.registerForm.get('idioma').setValue(array);

        // Categoria 
        let array1 = this.proveedor && this.proveedor.categprov ? this.proveedor.categprov.split(',') : [];

        this.selectedCat = array1;
        this.registerForm.get('categprov').setValue(array1);
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
        // Ajuste Jaime
        const data: IProveedores = this.registerForm.getRawValue();
        
        data.idioma = this.selectedIdi.join(',');      
        data.categprov = this.selectedCat.join(',');
        data.grupo = this.selectedGru.join(',');
        

        // for ( let i = 0; i < this.selectedCat.length; i++)
        // { 
        //     console.log(this.selectedCat[i]); 
        //     data.categprov = this.selectedCat[i];
        // }
       
        this.proveedorService.updateProveedor(this.id, data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
                this.goListProveedores();
            });
    }

    addProveedor(): void {
        const data: IProveedores = this.registerForm.getRawValue();
        data.categprov = this.selectedCat.join(',');
        data.grupo  = this.selectedGru.join(',');
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

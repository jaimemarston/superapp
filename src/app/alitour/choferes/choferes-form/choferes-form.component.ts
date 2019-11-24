import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChoferService } from '../../../core/services/chofer.service';
import { BancoService } from '../../../core/services/banco.service';
import { MatSnackBar } from '@angular/material';
import { IChoferes } from '../../../core/interfaces/choferes.interface';
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
    selector: 'choferes-form',
    templateUrl: './choferes-form.component.html',
    styleUrls: ['./choferes-form.component.scss']
})
export class ChoferesFormComponent implements OnInit {

    @ViewChild('imgAvatar1', {static: false}) imgAvatar1: ElementRef<HTMLImageElement>;
    @ViewChild('imgAvatar2', {static: false}) imgAvatar2: ElementRef<HTMLImageElement>;
    @ViewChild('imgAvatar3', {static: false}) imgAvatar3: ElementRef<HTMLImageElement>;
    @ViewChild('imgAvatar4', {static: false}) imgAvatar4: ElementRef<HTMLImageElement>;
    userPhoto1: File;
    userPhoto2: File;
    userPhoto3: File;
    userPhoto4: File;
    
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
            this.getChofer();
        } else {
            if (this.registerForm) {
                this.registerForm.reset();
            }
        }
    }

    Idiomaprov: Idiomaprov[] = [ 
        {codigo: 'FREE', descripcion: 'FREE'},
        {codigo: 'ESTABLE', descripcion: 'ESTABLE'},
        {codigo: 'POR CONTRATO', descripcion: 'POR CONTRATO'},
       
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
        {codigo: 'RHE', descripcion: 'RHE'},
        {codigo: 'FACTURA', descripcion: 'FACTURA'},
    ];


    chofer: IChoferes;
    registerForm: FormGroup;
    bancos: Array<Ibancos>;
    bancos2: Array<Ibancos>;

    @Output() update: EventEmitter<IChoferes> = new EventEmitter<IChoferes>();

    @ViewChild('inputNombre', {static: false}) inputNombre: ElementRef<HTMLInputElement>;

    form: FormGroup;

    constructor(private choferService: ChoferService,
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
            foto1: [null],
            dnivence: [null],
            cursos: [null],
            docbrevete: [null],
            brevete: [null],
            brevetevence: [null],
            docdni: [null],
            docpasaporte: [null],
        });
    }

    back(): void {
        this.router.navigate(['choferes']);
    }

    getBanco(): void {
        this.bancoService.getBancos()
            .subscribe(response => {
                this.bancos = response;
            });
    }

    getChofer(): void {
        this.choferService.getChofer(this.id)
            .subscribe(response => {
                this.chofer = response;
                this.setForm();
            });
    }

    setForm(): void {
        this.registerForm.get('nombre').setValue(this.chofer.nombre);
        this.registerForm.get('ruc').setValue(this.chofer.ruc);
        this.registerForm.get('telefono1').setValue(this.chofer.telefono1);
        this.registerForm.get('telefono2').setValue(this.chofer.telefono2);
        this.registerForm.get('telefono3').setValue(this.chofer.telefono3);
        this.registerForm.get('contacto').setValue(this.chofer.contacto);
        this.registerForm.get('telcontacto').setValue(this.chofer.telcontacto);
        this.registerForm.get('correo').setValue(this.chofer.correo);
        this.registerForm.get('direccion').setValue(this.chofer.direccion);
        this.registerForm.get('paginaweb').setValue(this.chofer.paginaweb);
        this.registerForm.get('tipocc').setValue(this.chofer.tipocc);
        this.registerForm.get('destipocc').setValue(this.chofer.destipocc);
        this.registerForm.get('condcompvent').setValue(this.chofer.condcompvent);
        this.registerForm.get('banco_nombre1').setValue(this.chofer.banco_nombre1);
        this.registerForm.get('banco_cuenta1').setValue(this.chofer.banco_cuenta1);
        this.registerForm.get('banco_moneda1').setValue(this.chofer.banco_moneda1);
        this.registerForm.get('banco_nombre2').setValue(this.chofer.banco_nombre2);
        this.registerForm.get('banco_cuenta2').setValue(this.chofer.banco_cuenta2);
        this.registerForm.get('banco_moneda2').setValue(this.chofer.banco_moneda2);
        this.registerForm.get('banco_nombre3').setValue(this.chofer.banco_nombre3);
        this.registerForm.get('banco_cuenta3').setValue(this.chofer.banco_cuenta3);
        this.registerForm.get('banco_moneda3').setValue(this.chofer.banco_moneda3);
        this.registerForm.get('fechanac').setValue(this.chofer.fechanac);
        this.registerForm.get('fechaini').setValue(this.chofer.fechaini);
        this.registerForm.get('fechafin').setValue(this.chofer.fechafin);
        
        this.registerForm.get('contacto2').setValue(this.chofer.contacto2);
        this.registerForm.get('telcontacto2').setValue(this.chofer.telcontacto2);
        this.registerForm.get('correo2').setValue(this.chofer.correo2);
        this.registerForm.get('contacto3').setValue(this.chofer.contacto3);
        this.registerForm.get('telcontacto3').setValue(this.chofer.telcontacto3);
        this.registerForm.get('correo3').setValue(this.chofer.correo3);
        this.registerForm.get('banco_nomdest1').setValue(this.chofer.banco_nomdest1);
        this.registerForm.get('banco_nomdest2').setValue(this.chofer.banco_nomdest2);
        this.registerForm.get('banco_nomdest3').setValue(this.chofer.banco_nomdest3);
        
        this.registerForm.get('cursos').setValue(this.chofer.cursos);      
        this.registerForm.get('dnivence').setValue(this.chofer.dnivence);
        this.registerForm.get('brevete').setValue(this.chofer.brevete);
        this.registerForm.get('brevetevence').setValue(this.chofer.brevetevence);
        
        // const array = this.chofer.idioma.split(',');
        // console.log('idioma', array);
        // this.registerForm.get('idioma').setValue(array);
        // Idioma 
        // let array: string[] = [];
        // if (this.chofer.idioma !== null) {
        //     array = this.chofer.idioma.split(',');
        // }
        let arrayg = this.chofer && this.chofer.grupo ? this.chofer.grupo.split(',') : []; 
        this.selectedGru = arrayg;
        this.registerForm.get('grupo').setValue(arrayg);


        let array = this.chofer && this.chofer.idioma ? this.chofer.idioma.split(',') : [];
        this.selectedIdi = array;
        this.registerForm.get('idioma').setValue(array);

        // Categoria 
        let array1 = this.chofer && this.chofer.categprov ? this.chofer.categprov.split(',') : [];

        this.selectedCat = array1;
        this.registerForm.get('categprov').setValue(array1);
    }

    onBack(): void {
        // this.back.emit(true);
    }

    saveForm(clear?: boolean): void {
        
        if (this.registerForm.valid) {
            this.saveChofer();
            if (clear) {
                this.registerForm.reset();
                this.inputNombre.nativeElement.focus();
            }
        } else {
            alert('FORMUARLIO INVALIDO');
        }
    }

    prepareData(): any {
        const data: IChoferes = this.registerForm.getRawValue();
        delete data.id;
        const formData = new FormData();
        for (const k in data) {
            if (data[k]) {
                formData.append(k, data[k]);
            }
        }
        if (this.userPhoto1) {
            formData.append('docbrevete', this.userPhoto1);
        }
        if (this.userPhoto2) {
            formData.append('foto1', this.userPhoto2);
        }
        if (this.userPhoto3) {
            formData.append('docpasaporte', this.userPhoto3);
        }
        if (this.userPhoto4) {
            formData.append('docdni', this.userPhoto4);
        }
        return formData;
    }

    updateChofer(): void {     
        // Ajuste Jaime
        const data = this.prepareData();
        
        
        data.idioma = this.selectedIdi.join(',');      
        data.categprov = this.selectedCat.join(',');
        data.grupo = this.selectedGru.join(',');
        

        // for ( let i = 0; i < this.selectedCat.length; i++)
        // { 
        //     console.log(this.selectedCat[i]); 
        //     data.categprov = this.selectedCat[i];
        // }
       
        this.choferService.updateChofer(this.id, data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
                this.goListChoferes();
            });
    }

    addChofer(): void {
        const data: IChoferes = this.registerForm.getRawValue();
        data.categprov = this.selectedCat.join(',');
        // data.idioma = this.selectIdioma.join(',');
        this.choferService.addChofer(data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
                this.registerForm.reset();
                this.inputNombre.nativeElement.focus();
            });
    }

    goListChoferes(): void {
        this.router.navigate(['choferes']);
    }

    saveChofer(): void {
      
        this.id ? this.updateChofer() : this.addChofer();
    }

    uploadSuccess1(event): void {
        const files: FileList = event.target.files;
        const file = files.item(0);
        const reader = new FileReader();
        this.imgAvatar1.nativeElement.name = file.name;
        reader.onload = ((ev: Event) => {
            this.imgAvatar1.nativeElement.src = (ev.target as any).result;
            this.userPhoto1 = file;
        });
        reader.readAsDataURL(event.target.files[0]);
    }
    uploadSuccess2(event): void {
        const files: FileList = event.target.files;
        const file = files.item(0);
        const reader = new FileReader();
        this.imgAvatar1.nativeElement.name = file.name;
        reader.onload = ((ev: Event) => {
            this.imgAvatar2.nativeElement.src = (ev.target as any).result;
            this.userPhoto2 = file;
        });
        reader.readAsDataURL(event.target.files[0]);
    }

    uploadSuccess3(event): void {
        const files: FileList = event.target.files;
        const file = files.item(0);
        const reader = new FileReader();
        this.imgAvatar1.nativeElement.name = file.name;
        reader.onload = ((ev: Event) => {
            this.imgAvatar3.nativeElement.src = (ev.target as any).result;
            this.userPhoto3 = file;
        });
        reader.readAsDataURL(event.target.files[0]);
    }
    uploadSuccess4(event): void {
        const files: FileList = event.target.files;
        const file = files.item(0);
        const reader = new FileReader();
        this.imgAvatar1.nativeElement.name = file.name;
        reader.onload = ((ev: Event) => {
            this.imgAvatar4.nativeElement.src = (ev.target as any).result;
            this.userPhoto4 = file;
        });
        reader.readAsDataURL(event.target.files[0]);
    }
}

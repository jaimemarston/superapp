import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GuiaService } from '../../../core/services/guia.service';
import { BancoService } from '../../../core/services/banco.service';
import { MatSnackBar } from '@angular/material';
import { IGuias } from '../../../core/interfaces/guias.interface';
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
    selector: 'guias-form',
    templateUrl: './guias-form.component.html',
    styleUrls: ['./guias-form.component.scss']
})
export class GuiasFormComponent implements OnInit {

    @ViewChild('imgAvatar1') imgAvatar1: ElementRef<HTMLImageElement>;
    @ViewChild('imgAvatar2') imgAvatar2: ElementRef<HTMLImageElement>;
    @ViewChild('imgAvatar3') imgAvatar3: ElementRef<HTMLImageElement>;
    
    userPhoto1: File;
    userPhoto2: File;
    userPhoto3: File;
    


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
            this.getGuia();
        } else {
            if (this.registerForm) {
                this.registerForm.reset();
            }
        }
    }

    Idiomaprov: Idiomaprov[] = [
        {codigo: 'Ingles-Basico', descripcion: 'Ingles-Basico'},
        {codigo: 'Ingles-Intermedio', descripcion: 'Ingles-Intermedio'},
        {codigo: 'Ingles-Avanzado', descripcion: 'Ingles-Avanzado'},
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
        {codigo: 'CHOFER', descripcion: 'CHOFER'},
        {codigo: 'GUIA', descripcion: 'GUIA'},
        {codigo: 'TRADUCTOR', descripcion: 'TRADUCTOR'},
        {codigo: 'OTROS', descripcion: 'OTROS'},
    ];


    guia: IGuias;
    registerForm: FormGroup;
    bancos: Array<Ibancos>;
    bancos2: Array<Ibancos>;

    @Output() update: EventEmitter<IGuias> = new EventEmitter<IGuias>();

    @ViewChild('inputNombre') inputNombre: ElementRef<HTMLInputElement>;

    form: FormGroup;

    constructor(private guiaService: GuiaService,
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
            foto2: [null],
            foto3: [null],
            tipocontrato: [null],
        });
    }

    back(): void {
        this.router.navigate(['guias']);
    }

    getBanco(): void {
        this.bancoService.getBancos()
            .subscribe(response => {
                this.bancos = response;
            });
    }

    getGuia(): void {
        this.guiaService.getGuia(this.id)
            .subscribe(response => {
                this.guia = response;
                this.setForm();
            });
    }

    setForm(): void {
        this.registerForm.get('nombre').setValue(this.guia.nombre);
        this.registerForm.get('ruc').setValue(this.guia.ruc);
        this.registerForm.get('telefono1').setValue(this.guia.telefono1);
        this.registerForm.get('telefono2').setValue(this.guia.telefono2);
        this.registerForm.get('telefono3').setValue(this.guia.telefono3);
        this.registerForm.get('contacto').setValue(this.guia.contacto);
        this.registerForm.get('telcontacto').setValue(this.guia.telcontacto);
        this.registerForm.get('correo').setValue(this.guia.correo);
        this.registerForm.get('direccion').setValue(this.guia.direccion);
        this.registerForm.get('paginaweb').setValue(this.guia.paginaweb);
        this.registerForm.get('tipocc').setValue(this.guia.tipocc);
        this.registerForm.get('destipocc').setValue(this.guia.tipocc);
        this.registerForm.get('condcompvent').setValue(this.guia.tipocc);
        this.registerForm.get('banco_nombre1').setValue(this.guia.banco_nombre1);
        this.registerForm.get('banco_cuenta1').setValue(this.guia.banco_cuenta1);
        this.registerForm.get('banco_moneda1').setValue(this.guia.banco_moneda1);
        this.registerForm.get('banco_nombre2').setValue(this.guia.banco_nombre2);
        this.registerForm.get('banco_cuenta2').setValue(this.guia.banco_cuenta2);
        this.registerForm.get('banco_moneda2').setValue(this.guia.banco_moneda2);
        this.registerForm.get('banco_nombre3').setValue(this.guia.banco_nombre3);
        this.registerForm.get('banco_cuenta3').setValue(this.guia.banco_cuenta3);
        this.registerForm.get('banco_moneda3').setValue(this.guia.banco_moneda3);
        this.registerForm.get('fechanac').setValue(this.guia.fechanac);
        this.registerForm.get('fechaini').setValue(this.guia.fechaini);
        this.registerForm.get('fechafin').setValue(this.guia.fechafin);
        
        this.registerForm.get('contacto2').setValue(this.guia.contacto2);
        this.registerForm.get('telcontacto2').setValue(this.guia.telcontacto2);
        this.registerForm.get('correo2').setValue(this.guia.correo2);
        this.registerForm.get('contacto3').setValue(this.guia.contacto3);
        this.registerForm.get('telcontacto3').setValue(this.guia.telcontacto3);
        this.registerForm.get('correo3').setValue(this.guia.correo3);
        this.registerForm.get('banco_nomdest1').setValue(this.guia.banco_nomdest1);
        this.registerForm.get('banco_nomdest2').setValue(this.guia.banco_nomdest2);
        this.registerForm.get('banco_nomdest3').setValue(this.guia.banco_nomdest3);
        this.registerForm.get('tipocontrato').setValue(this.guia.tipocontrato);
        
        this.registerForm.get('grupo').setValue(this.guia.grupo); // asociacion

       
        // const array = this.guia.idioma.split(',');
        // console.log('idioma', array);
        // this.registerForm.get('idioma').setValue(array);
        // Idioma 
        // let array: string[] = [];
        // if (this.guia.idioma !== null) {
        //     array = this.guia.idioma.split(',');
        // }
        
        // let arrayg = this.guia && this.guia.grupo ? this.guia.grupo.split(',') : []; 
        // this.selectedGru = arrayg;
        // this.registerForm.get('grupo').setValue(arrayg);


        let array = this.guia && this.guia.idioma ? this.guia.idioma.split(',') : [];
        this.selectedIdi = array;
        this.registerForm.get('idioma').setValue(array);

        // Categoria 
        let array1 = this.guia && this.guia.categprov ? this.guia.categprov.split(',') : [];

        this.selectedCat = array1;
        this.registerForm.get('categprov').setValue(array1);
    }

    onBack(): void {
        // this.back.emit(true);
    }

    saveForm(clear?: boolean): void {
        
        if (this.registerForm.valid) {
            this.saveGuia();
            if (clear) {
                this.registerForm.reset();
                this.inputNombre.nativeElement.focus();
            }
        } else {
            alert('FORMUARLIO INVALIDO');
        }
    }

    prepareData(): any {
        const data: IGuias = this.registerForm.getRawValue();
        delete data.id;
        const formData = new FormData();
        for (const k in data) {
            if (data[k]) {
                formData.append(k, data[k]);
            }
        }
        if (this.userPhoto1) {
            formData.append('foto1', this.userPhoto1);
        }
        if (this.userPhoto2) {
            formData.append('foto2', this.userPhoto2);
        }
        if (this.userPhoto3) {
            formData.append('foto3', this.userPhoto3);
        }
        return formData;
    }

    updateGuia(): void {     
        
        
        const data = this.prepareData();
        
        
        data.idioma = this.selectedIdi.join(',');      
        data.categprov = this.selectedCat.join(',');
        //data.grupo = this.selectedGru.join(',');
        
        // for ( let i = 0; i < this.selectedCat.length; i++)
        // { 
        //     console.log(this.selectedCat[i]); 
        //     data.categprov = this.selectedCat[i];
        // }
       
        this.guiaService.updateGuia(this.id, data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
                this.goListGuias();
            });
    }

    addGuia(): void {
        const data: IGuias = this.registerForm.getRawValue();
        data.categprov = this.selectedCat.join(',');
        data.idioma = this.selectedIdi.join(',');
        // data.grupo = this.selectedGru.join(',');
        this.guiaService.addGuia(data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
                this.registerForm.reset();
                // this.inputNombre.nativeElement.focus();
            });
    }

    goListGuias(): void {
        this.router.navigate(['guias']);
    }

    saveGuia(): void {
      
        this.id ? this.updateGuia() : this.addGuia();
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


}

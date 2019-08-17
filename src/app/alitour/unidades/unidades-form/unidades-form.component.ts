import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { UnidadService } from '../../../core/services/unidad.service';
import { BancoService } from '../../../core/services/banco.service';
import { IUnidad } from '../../../core/interfaces/unidad.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSelectModule, MatFormFieldModule } from '@angular/material';
import { Ibancos } from '../../../core/interfaces/varios.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '../../../../@fuse/animations';

export interface Categoprov {
    codigo: string;
    descripcion: string;
}

@Component({
    selector: 'app-unidades-form',
    templateUrl: './unidades-form.component.html',
    styleUrls: ['./unidades-form.component.scss'],
    animations: fuseAnimations
})

export class UnidadesFormComponent implements OnInit {

    @ViewChild('imgAvatar') imgAvatar: ElementRef<HTMLImageElement>;
    @ViewChild('imgAvatar2') imgAvatar2: ElementRef<HTMLImageElement>;

    userPhoto: File;
    userPhoto2: File;
    selectedCat: string[] = [];
    
    private _id: number;
    get id(): number {
        return this._id;
    }

    @Input() set id(id: number) {
        this._id = id;
        if (id) {
            this.getUnidad();
        } else {
            if (this.registerForm) {
                this.registerForm.reset();
            }
        }
    }

    categoprov: Categoprov[] = [
        {codigo: 'Aliperu', descripcion: 'Aliperu'},
        {codigo: 'Alited', descripcion: 'Alited'},
        {codigo: 'Aliservicios', descripcion: 'Aliservicios'},
    ];

    unidad: IUnidad;
    registerForm: FormGroup;
    bancos: Array<Ibancos>;

    @Output() update: EventEmitter<IUnidad> = new EventEmitter<IUnidad>();

    @ViewChildren('inputs') inputs: QueryList<ElementRef<HTMLInputElement>>;

    constructor(private unidadService: UnidadService,
                private bancoService: BancoService,
                private formBuilder: FormBuilder,
                public snackBar: MatSnackBar,
                private router: Router,
                private route: ActivatedRoute) {
        this.id = this.route.snapshot.params['id'];
    }

    getBanco(): void {
        this.bancoService.getBancos()
            .subscribe(response => {
                this.bancos = response;
            });
    }

    ngOnInit(): void {
        this.createForm();
        this.getBanco();
    }

    createForm(): void {
        this.registerForm = this.formBuilder.group({
            descripcion: ['', Validators.compose([
                Validators.required,
            ])],
            placa: [''],
            npasajeros: [''],
            color: [''],
            marca: [''],
            modelo: [''],
            aniofab: [''],
            combustible: [''],
            empresa: [''],
            cadsoat: [''],
            revtec: [''],
            segveh: [''],
            mantglp: [''],
            fechaini: [''],
            fechafin: [''],
            docbrevete: [''],
            docdni: [''],
            doccursos: [''],
            docantepoli: [''],
            docantepena: [''],
        });
    }

    getUnidad(): void {
        this.unidadService.getUnidad(this.id)
            .subscribe(response => {
                this.unidad = response;
                this.setForm();
            });
    }

/*
    getUnidad(): void {
        this.unidadService.getUnidad(this.id)
            .subscribe(response => {
                this.unidad = response;
                this.setForm();
            });
    }
*/
    setForm(): void {
        this.registerForm.get('descripcion').setValue(this.unidad.descripcion);
        this.registerForm.get('placa').setValue(this.unidad.placa);
        this.registerForm.get('npasajeros').setValue(this.unidad.npasajeros);
        this.registerForm.get('modelo').setValue(this.unidad.modelo);
        this.registerForm.get('aniofab').setValue(this.unidad.aniofab);
        this.registerForm.get('combustible').setValue(this.unidad.combustible);
       // this.registerForm.get('empresa').setValue(this.unidad.empresa);
        this.registerForm.get('cadsoat').setValue(this.unidad.cadsoat);
        this.registerForm.get('revtec').setValue(this.unidad.revtec);
        this.registerForm.get('segveh').setValue(this.unidad.segveh);
        this.registerForm.get('mantglp').setValue(this.unidad.mantglp);
        
        // Categoria 
        let array1 = this.unidad && this.unidad.empresa ? this.unidad.empresa.split(',') : [];

        this.selectedCat = array1;
        this.registerForm.get('empresa').setValue(array1);
    }

    back(): void {
        this.router.navigate(['unidades']);
    }

    saveForm(clear?: boolean): void {

        if (this.registerForm.valid) {
            this.saveClient();
            if (clear) {
                this.registerForm.reset();
            }
        } else {
            alert('FORMUARLIO INVALIDO');
        }
    }

    
    prepareData(): any {
        const data: IUnidad = this.registerForm.getRawValue();
        delete data.id;
        const formData = new FormData();
        for (const k in data) {
            if (data[k]) {
                formData.append(k, data[k]);
            }
        }
        if (this.userPhoto) {
            formData.append('foto1', this.userPhoto);
        }

        if (this.userPhoto2) {
            formData.append('foto2', this.userPhoto2);
        }

        

        return formData;
    }

    updateUnidad(): void {
        /*const data: IUnidad = this.registerForm.getRawValue();*/
        const data = this.prepareData();
        this.unidadService.updateUnidad(this.id, data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
                this.back();
            });
    }

    addUnidad(): void {
        /* const data: IUnidad = this.registerForm.getRawValue();*/
        const data = this.prepareData();
        this.unidadService.addUnidad(data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
                this.inputs.first.nativeElement.focus();
                this.registerForm.reset();
                this.createForm();
            });
    }

    uploadSuccess1(event): void {
        const files: FileList = event.target.files;
        const file = files.item(0);
        console.log(file);  
        const reader = new FileReader();
        this.imgAvatar.nativeElement.name = file.name;
        reader.onload = ((ev: Event) => {
            this.imgAvatar.nativeElement.src = (ev.target as any).result;
            this.userPhoto = file;
        });
        reader.readAsDataURL(event.target.files[0]);
    }
    
    uploadSuccess2(event): void {
        const files: FileList = event.target.files;
        const file = files.item(0);
        console.log(file);  
        const reader = new FileReader();
        this.imgAvatar2.nativeElement.name = file.name;
        reader.onload = ((ev: Event) => {
            this.imgAvatar2.nativeElement.src = (ev.target as any).result;
            this.userPhoto2 = file;
        });
        reader.readAsDataURL(event.target.files[0]);
    }

    saveClient(): void {
        this.id ? this.updateUnidad() : this.addUnidad();
    }
}


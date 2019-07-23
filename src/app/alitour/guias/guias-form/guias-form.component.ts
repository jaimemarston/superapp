import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { GuiaService } from '../../../core/services/guia.service';
import { BancoService } from '../../../core/services/banco.service';
import { IGuia } from '../../../core/interfaces/guia.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSelectModule, MatFormFieldModule } from '@angular/material';
import { Ibancos } from '../../../core/interfaces/varios.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '../../../../@fuse/animations';


@Component({
    selector: 'app-guias-form',
    templateUrl: './guias-form.component.html',
    animations: fuseAnimations
})

export class GuiasFormComponent implements OnInit {

    @ViewChild('imgAvatar') imgAvatar: ElementRef<HTMLImageElement>;
    @ViewChild('imgAvatar2') imgAvatar2: ElementRef<HTMLImageElement>;

    userPhoto: File;
    userPhoto2: File;

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

    
    guia: IGuia;
    registerForm: FormGroup;
    bancos: Array<Ibancos>;

    @Output() update: EventEmitter<IGuia> = new EventEmitter<IGuia>();

    @ViewChildren('inputs') inputs: QueryList<ElementRef<HTMLInputElement>>;

    constructor(private guiaService: GuiaService,
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
        this.registerForm.get('descripcion').setValue(this.guia.descripcion);
        this.registerForm.get('placa').setValue(this.guia.placa);
        this.registerForm.get('npasajeros').setValue(this.guia.npasajeros);
        
    }

    back(): void {
        this.router.navigate(['guias']);
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
        const data: IGuia = this.registerForm.getRawValue();
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

    updateGuia(): void {
        
        const data = this.prepareData();
        this.guiaService.updateGuia(this.id, data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
                this.back();
            });
    }

    addGuia(): void {
        
        const data = this.prepareData();
        this.guiaService.addGuia(data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
                this.inputs.first.nativeElement.focus();
                this.registerForm.reset();
                this.createForm();
            });
    }

    uploadSuccess(event): void {
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
        this.id ? this.updateGuia() : this.addGuia();
    }
}


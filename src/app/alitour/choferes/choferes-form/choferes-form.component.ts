import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ChoferService } from '../../../core/services/chofer.service';
import { BancoService } from '../../../core/services/banco.service';
import { IChofer } from '../../../core/interfaces/chofer.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSelectModule, MatFormFieldModule } from '@angular/material';
import { Ibancos } from '../../../core/interfaces/varios.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '../../../../@fuse/animations';


@Component({
    selector: 'app-choferes-form',
    templateUrl: './choferes-form.component.html',
    animations: fuseAnimations
})

export class ChoferesFormComponent implements OnInit {

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
            this.getChofer();
        } else {
            if (this.registerForm) {
                this.registerForm.reset();
            }
        }
    }

    
    chofer: IChofer;
    registerForm: FormGroup;
    bancos: Array<Ibancos>;

    @Output() update: EventEmitter<IChofer> = new EventEmitter<IChofer>();

    @ViewChildren('inputs') inputs: QueryList<ElementRef<HTMLInputElement>>;

    constructor(private choferService: ChoferService,
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

    getChofer(): void {
        this.choferService.getChofer(this.id)
            .subscribe(response => {
                this.chofer = response;
                this.setForm();
            });
    }

/*
    getChofer(): void {
        this.choferService.getChofer(this.id)
            .subscribe(response => {
                this.chofer = response;
                this.setForm();
            });
    }
*/
    setForm(): void {
        this.registerForm.get('descripcion').setValue(this.chofer.descripcion);
        this.registerForm.get('placa').setValue(this.chofer.placa);
        this.registerForm.get('npasajeros').setValue(this.chofer.npasajeros);
        
    }

    back(): void {
        this.router.navigate(['choferes']);
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
        const data: IChofer = this.registerForm.getRawValue();
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

    updateChofer(): void {
        /*const data: IChofer = this.registerForm.getRawValue();*/
        const data = this.prepareData();
        this.choferService.updateChofer(this.id, data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
                this.back();
            });
    }

    addChofer(): void {
        /* const data: IChofer = this.registerForm.getRawValue();*/
        const data = this.prepareData();
        this.choferService.addChofer(data)
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
        this.id ? this.updateChofer() : this.addChofer();
    }
}


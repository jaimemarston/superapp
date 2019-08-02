import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { IUser } from '../../../core/interfaces/user.interface';

export interface Genero {
    codigo: number;
    descripcion: string;
}

@Component({
    selector: 'app-users-form',
    templateUrl: './users-form.component.html',
    styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {

    @ViewChild('imgAvatar') imgAvatar: ElementRef<HTMLImageElement>;
    selectedgen = '0';
    userPhoto: File;

    private _id: number;
    get id(): number {
        return this._id;
    }

    @Input() set id(id: number) {
        this._id = id;
        if (id) {
            this.getUser();
        } else {
            if (this.registerForm) {
                this.registerForm.reset();
            }
        }
    }

    generos: Genero[] = [
        {codigo: 1, descripcion: 'Masculino'},
        {codigo: 2, descripcion: 'Femenino'},
    ];

    user: IUser;
    registerForm: FormGroup;

    @Output() update: EventEmitter<IUser> = new EventEmitter<IUser>();

    @ViewChildren('inputs') inputs: QueryList<ElementRef<HTMLInputElement>>;

    constructor(private userService: UserService,
                private formBuilder: FormBuilder,
                public snackBar: MatSnackBar,
                private router: Router,
                private route: ActivatedRoute) {
        this.id = this.route.snapshot.params['id'];
    }


    ngOnInit(): void {
        this.createForm();
    }

    createForm(): void {
        this.registerForm = this.formBuilder.group({
            id: [''],
            nombre: ['', Validators.compose([
                Validators.required,
            ])],
            apellido_paterno: ['', Validators.compose([
                Validators.required,
            ])],
            apellido_materno: ['', Validators.compose([
                Validators.required,
            ])],
            sexo: [''],
            telefono1: [''],
            correo: [''],
            dni: [''],
            cargo: [''],

        });

    this.generos.find(c => c.codigo === this.user.sexo);
      
    }

    getUser(): void {
        this.userService.getUser(this.id)
            .subscribe(response => {
                this.user = response;
                this.setForm();
            });
    }

    setForm(): void {
        this.registerForm.get('id').setValue(this.user.id);
        this.registerForm.get('nombre').setValue(this.user.nombre);
        this.registerForm.get('apellido_paterno').setValue(this.user.apellido_paterno);
        this.registerForm.get('apellido_materno').setValue(this.user.apellido_materno);
        this.registerForm.get('sexo').setValue(this.user.sexo);
        this.registerForm.get('telefono1').setValue(this.user.telefono1);
        this.registerForm.get('correo').setValue(this.user.correo);
        this.registerForm.get('dni').setValue(this.user.dni);
        this.registerForm.get('cargo').setValue(this.user.cargo);
    }

    back(): void {
        this.router.navigate(['users']);
    }

    saveForm(clear?: boolean): void {

        if (this.registerForm.valid) {
            this.saveUser();
            if (clear) {
                this.registerForm.reset();
            }
        } else {
            alert('FORMUARLIO INVALIDO');
        }
    }

    prepareData(): any {
        const data: IUser = this.registerForm.getRawValue();
        delete data.id;
        const formData = new FormData();
        for (const k in data) {
            if (data[k]) {
                formData.append(k, data[k]);
            }
        }
        if (this.userPhoto) {
            formData.append('foto', this.userPhoto);
        }
        return formData;
    }

    updateUnidad(): void {
        const data = this.prepareData();

        this.userService.editUser(this.id, data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
                this.back();
            });
    }

    addUnidad(): void {
        const data = this.prepareData();
        this.userService.addUser(data)
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
        const reader = new FileReader();
        this.imgAvatar.nativeElement.name = file.name;
        reader.onload = ((ev: Event) => {
            this.imgAvatar.nativeElement.src = (ev.target as any).result;
            this.userPhoto = file;
        });
        reader.readAsDataURL(event.target.files[0]);
    }

    saveUser(): void {
        this.id ? this.updateUnidad() : this.addUnidad();
    }

}

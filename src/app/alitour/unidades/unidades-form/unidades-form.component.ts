import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { UnidadService } from '../../../core/services/unidad.service';
import { BancoService } from '../../../core/services/banco.service';
import { IUnidad } from '../../../core/interfaces/unidad.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSelectModule, MatFormFieldModule } from '@angular/material';
import { Ibancos } from '../../../core/interfaces/varios.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '../../../../@fuse/animations';


@Component({
    selector: 'app-unidades-form',
    templateUrl: './unidades-form.component.html',
    animations: fuseAnimations
})

export class UnidadesFormComponent implements OnInit {
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
        });
    }

    getClient(): void {
        this.unidadService.getUnidad(this.id)
            .subscribe(response => {
                this.unidad = response;
                this.setForm();
            });
    }

    setForm(): void {
        this.registerForm.get('descripcion').setValue(this.unidad.descripcion);
        this.registerForm.get('placa').setValue(this.unidad.placa);
        this.registerForm.get('npasajeros').setValue(this.unidad.npasajeros);
    }

    back(): void {
        this.router.navigate(['alitour/unidades']);
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

    updateUnidad(): void {
        const data: IUnidad = this.registerForm.getRawValue();

        this.unidadService.updateUnidad(this.id, data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
                this.back();
            });
    }

    addUnidad(): void {
        const data: IUnidad = this.registerForm.getRawValue();
        this.unidadService.addUnidad(data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
                this.inputs.first.nativeElement.focus();
                this.registerForm.reset();
                this.createForm();
            });
    }

    saveClient(): void {
        this.id ? this.updateUnidad() : this.addUnidad();
    }
}


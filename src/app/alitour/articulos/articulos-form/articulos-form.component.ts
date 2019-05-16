import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { IArticulo } from '../../../core/interfaces/articulo.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ibancos } from '../../../core/interfaces/varios.interface';
import { ArticuloService } from '../../../core/services/articulo.service';
import { BancoService } from '../../../core/services/banco.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '../../../../@fuse/animations';

export interface Monedas {
    codigo: string;
    descripcion: string;
}

@Component({
    selector: 'app-articulos-form',
    templateUrl: './articulos-form.component.html',
    styleUrls: ['./articulos-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ArticulosFormComponent implements OnInit {

    /**
     * mascara para poner formatos en inputs.
     * https://github.com/JsDaddy/ngx-mask
     * */

    selectedmon = '0';
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
            this.getClient();
        } else {
            if (this.registerForm) {
                this.registerForm.reset();
            }
        }
    }

    /*   bancos: Bancos[] = [
        { codigo: 'steak-0', descripcion: '2018' },
        { codigo: 'pizza-1', descripcion: '2019' },
        { codigo: 'tacos-2', descripcion: '2020' }
      ]; */

    monedas: Monedas[] = [
        {codigo: 'Soles', descripcion: 'Soles'},
        {codigo: 'Dolares', descripcion: 'Dolares'},
    ];


    articulo: IArticulo;
    registerForm: FormGroup;
    bancos: Array<Ibancos>;

    @Output() update: EventEmitter<IArticulo> = new EventEmitter<IArticulo>();

    @ViewChildren('inputs') inputs: QueryList<ElementRef<HTMLInputElement>>;

    constructor(private articuloService: ArticuloService,
                private bancoService: BancoService,
                private formBuilder: FormBuilder,
                public snackBar: MatSnackBar,
                private router: Router,
                private route: ActivatedRoute) {
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
        this.id = this.route.snapshot.params['id'];
    }

    createForm(): void {
        this.registerForm = this.formBuilder.group({
            codigo: [null, Validators.compose([
                Validators.required
            ])],
            descripcion: [null, Validators.compose([
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(20),
            ])],
        });
    }

    getClient(): void {
        this.articuloService.getArticulo(this.id)
            .subscribe(response => {
                this.articulo = response;
                this.setForm();
            });
    }

    setForm(): void {
        this.registerForm.get('codigo').setValue(this.articulo.codigo);
        this.registerForm.get('descripcion').setValue(this.articulo.descripcion);
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

    updateArticulo(): void {
        const data: IArticulo = this.registerForm.getRawValue();

        this.articuloService.updateArticulo(this.id, data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
                this.back();
            });
    }

    addArticulo(): void {
        const data: IArticulo = this.registerForm.getRawValue();
        this.articuloService.addArticulo(data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
                this.registerForm.reset();
                this.createForm();
                this.inputs.first.nativeElement.focus();
            });
    }

    saveClient(): void {
        this.id ? this.updateArticulo() : this.addArticulo();
    }

    back(): void {
        this.router.navigate(['articulos']);
    }
}


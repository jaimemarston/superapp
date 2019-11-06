import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatSnackBar, MatTabChangeEvent, MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { Cotizacion } from '../../../dataservice/cotizacion';
import { DataService } from '../../../dataservice/data.service';
import { CotizaciondetalleService } from '../../../core/services/cotizaciondetalle.service';
import { ICotizaciondetalle, ICotizacion } from '../../../core/interfaces/cotizacion.interface';
import { CotizacionService } from '../../../core/services/cotizacion.service';
import { SelectionModel } from '@angular/cdk/collections';
import { fuseAnimations } from '../../../../@fuse/animations';
import { EditcotizaciondetalleComponent } from '../../cotizacion/cotizaciondetalle/editcotizaciondetalle/editcotizaciondetalle.component';
import { map } from 'rxjs/operators';

/**
 * @title Basic use of `<table mat-table>`
 */

export interface Estados {
    codigo: number;
    descripcion: string;
}

@Component({
    selector: 'app-cotizaciondetalle',
    templateUrl: './cotizaciondetalle.component.html',
    animations: fuseAnimations
})

export class CotizaciondetalleComponent implements OnInit {
    _cotizacionesDetalle: Array<ICotizaciondetalle>;
    @ViewChild(EditcotizaciondetalleComponent) cotizacionDetalle: EditcotizaciondetalleComponent;
    
    cotizacionTotales = {
        subtotal: 0.00,
        descuento: 0.00,
        igv: 0.00,
        total_general: 0.00
    }
    
    estados: Estados[] = [
        {codigo: 0, descripcion: 'Cotizado'},
        {codigo: 1, descripcion: 'Confirmado'},
        {codigo: 2, descripcion: 'Programado'},
        {codigo: 3, descripcion: 'Atendido'},
        {codigo: 4, descripcion: 'Anulado'},
    ];
    get cotizacionesDetalle(): Array<ICotizaciondetalle> {
        return this._cotizacionesDetalle;
    }

    @Input() set cotizacionesDetalle(data: Array<ICotizaciondetalle>) {
        this._cotizacionesDetalle = data;
        /* console.log(this.cotizacionesDetalle); */
        this.dataSource.data = this.cotizacionesDetalle;
        if (this.cotizacionesDetalle) {
            this.calculateTotales(0);
            this.dataSource.paginator = this.paginatordet;
        }
    }

    @Input() detail: any;

    @Input() idMaster: number;

    @Input() iddestipdoc: string;

    @Output() updated: EventEmitter<any> = new EventEmitter();

    @Output() totales: any;

    displayedColumns: string[] = ['select', 'fechaini', 'horaini', 'fechafin', 'horafin', 'descripcion', 'desunimed', 'pax', 'cantidad', 'imptotal', 'estado', 'options']
    @ViewChild(MatPaginator) paginatordet: MatPaginator;
    cotizacion: Array<ICotizaciondetalle>;
    dataSource = new MatTableDataSource<ICotizaciondetalle>();
    errorMessage: String;
    selectedId: number;
    edit: boolean;
    userName: String;
    /** checkbox datatable */
    selection = new SelectionModel<ICotizaciondetalle>(true, []);
    cotizacionmaster: ICotizacion;

    constructor(
        private cotizacionService: CotizaciondetalleService,
        private router: Router,
        private cotizacionmasterService: CotizacionService,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {
    }

    ngOnInit(): void {
        this.dataSource.data = this.cotizacionesDetalle;
        const currentUser = JSON.parse(localStorage.getItem('user'));
        this.userName = currentUser.username;
        console.log(' this.userName', this.userName);
    }

    getCotizacion(): void {
        // this.getMaster();
        this.cotizacionService.getCotizaciones()
            .pipe(map(cotizaciones => {
                cotizaciones = cotizaciones.map(c => {
                    c.imptotal = c.cantidad * c.precio;
                    // c.imptotal = c.precio;
                    return c;
                });
                return cotizaciones;
            }))
            .subscribe(response => {
                this.cotizacion = response;
                this.dataSource.data = this.cotizacion;
                this.dataSource.paginator = this.paginatordet;
                this.paginatordet._intl.itemsPerPageLabel = 'Item por Pagina:';
            });
    }

    delete(id: number): void {
        this.selectedId = id;
        this.deleteCotizacion();
    }

    deleteCotizacion(): void {
        this.cotizacionService.deleteCotizacion(this.selectedId)
            .subscribe(response => {
                this.updated.emit(true);
            });
    }

    public editRecord(id: number): void {
        this.selectedId = id;
        this.edit = true;
    }

    public addRecord(): void {
        this.edit = true;
        this.selectedId = null;
    }

    showDataTable(): void {
        this.edit = false;
    }

    updateDataTable(data: ICotizaciondetalle): void {
        this.updated.emit(data);
        this.paginatordet.lastPage();
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle(): void {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }


    openPrint(): void {
        window.print();
    }

    /**
     * async await sirve para esperar que una promesa sea cumplida
     * */
    async deleteAllSelecteds(): Promise<void> {
        const selecteds = this.selection.selected;
        for (let index = 0; index < selecteds.length; index++) {
            await this.cotizacionService.deleteCotizacion(selecteds[index].id).toPromise();
            if (index === selecteds.length - 1) {
                this.snackBar.open('ELIMINADOS TODOS');
                // this.getCotizacion();
                this.updated.emit(true);
            }
        }
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    calculateTotales(descuento = 0): void {
       
        
        this.cotizacionTotales.descuento = descuento;
        // this.cotizacionTotales.subtotal = this.cotizacionesDetalle.reduce((a, b) => (b.imptotal * b.cantidad) + a, 0);
        this.cotizacionTotales.subtotal = this.cotizacionesDetalle.reduce((a, b) => +(b.imptotal) + a, 0);
        
        
        
        if (this.iddestipdoc === 'Recibo'){
             this.cotizacionTotales.igv = 0.00;
             // console.log('this.iddestipdoc recibo', this.iddestipdoc, this.cotizacionTotales.igv);
        }
        else
        {
            // console.log('this.iddestipdoc otros', this.iddestipdoc, this.cotizacionTotales.igv);
            this.cotizacionTotales.igv = +((this.cotizacionTotales.subtotal - this.cotizacionTotales.descuento) * 0.18).toFixed(2);
        }
    
        this.cotizacionTotales.total_general = +((this.cotizacionTotales.subtotal - this.cotizacionTotales.descuento) + this.cotizacionTotales.igv).toFixed(2);
        this.totales = this.cotizacionTotales;
    }
    updateMaestro(event): void {
        // aqui cambiar a otra update si no se llega a grabar
        // this.cotizacionDetalle.getMaster();
        console.log('this.totales.descuento', this.totales.descuento);
        this.cotizacionDetalle.updateMaster();
        console.log('updateMaster cotizaciondetallecomponent');
    } 
    onChangeDscto(event): void {
        console.log('event.target.value', event.target.value);
        // this.calculateTotales(+(event.target.value ? event.target.value !== '' : 0));
        this.calculateTotales(event.target.value);
        
    }
    getMaster(): void {
        this.cotizacionmasterService.getCotizacion(this.selectedId)
            .subscribe(responsmaster => {
            this.cotizacionmaster = responsmaster;
            console.log('carga master en detalle cotizacion', this.selectedId, this.cotizacionmaster);
        }); 
    }

}

import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatSnackBar, MatTabChangeEvent, MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { Cotizacion } from '../../../dataservice/cotizacion';
import { DataService } from '../../../dataservice/data.service';
import { CotizaciondetalleService } from '../../../core/services/cotizaciondetalle.service';
import { ICotizaciondetalle } from '../../../core/interfaces/cotizacion.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { fuseAnimations } from '../../../../@fuse/animations';

/**
 * @title Basic use of `<table mat-table>`
 */


@Component({
    selector: 'app-cotizaciondetalle',
    templateUrl: './cotizaciondetalle.component.html',
    animations: fuseAnimations
})

export class CotizaciondetalleComponent implements OnInit {
    _cotizacionesDetalle: Array<ICotizaciondetalle>;

    get cotizacionesDetalle(): Array<ICotizaciondetalle> {
        return this._cotizacionesDetalle;
    }

    @Input() set cotizacionesDetalle(data: Array<ICotizaciondetalle>) {
        this._cotizacionesDetalle = data;
        /* console.log(this.cotizacionesDetalle); */
        this.dataSource.data = this.cotizacionesDetalle;
    }

    @Input() detail: any;

    @Input() idMaster: number;

    @Output() updated: EventEmitter<any> = new EventEmitter();

    displayedColumns: string[] = ['select', 'codigo', 'fechaini', 'horaini', 'fechafin', 'horafin', 'descripcion', 'desunimed', 'cantidad', 'imptotal', 'options'];
    @ViewChild(MatPaginator) paginator: MatPaginator;

    cotizacion: Array<ICotizaciondetalle>;
    dataSource = new MatTableDataSource<ICotizaciondetalle>();
    errorMessage: String;
    selectedId: number;
    edit: boolean;

    /** checkbox datatable */
    selection = new SelectionModel<ICotizaciondetalle>(true, []);

    constructor(
        private cotizacionService: CotizaciondetalleService,
        private router: Router,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {
    }

    ngOnInit(): void {
        // this.getCotizacion();
        this.dataSource.data = this.cotizacionesDetalle;
    }

    getCotizacion(): void {
        this.cotizacionService.getCotizaciones()
            .subscribe(response => {
                this.cotizacion = response;
                this.dataSource.data = this.cotizacion;


                /* console.log(this.cotizacion); */
                this.dataSource.paginator = this.paginator;
                // this.paginator._intl.itemsPerPageLabel = 'Item por Pagina:';
            });
    }

    delete(id: number): void {
        this.selectedId = id;

        this.deleteCotizacion();

    }

    deleteCotizacion(): void {
        this.cotizacionService.deleteCotizacion(this.selectedId)
            .subscribe(response => {
                console.log(response);
                /*  this.getCotizacion(); */
                this.updated.emit(true);
            });
    }

    public editRecord(id: number): void {
        this.selectedId = id;
        this.edit = true;
    }

    public addRecord() {
        this.edit = true;
        this.selectedId = null;
    }

    showDataTable(): void {
        this.edit = false;
    }

    updateDataTable(data: ICotizaciondetalle): void {
        this.updated.emit(data);
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }


    openPrint() {
        window.print();
    }

    /**
     * async await sirve para esperar que una promesa sea cumplida
     * */
    async deleteAllSelecteds() {
        const selecteds = this.selection.selected;
        for (let index = 0; index < selecteds.length; index++) {
            await this.cotizacionService.deleteCotizacion(selecteds[index].id).toPromise();
            if (index === selecteds.length - 1) {
                this.snackBar.open('ELMINADOS TODOS');
                // this.getCotizacion();
                this.updated.emit(true);
            }
        }
    }
}

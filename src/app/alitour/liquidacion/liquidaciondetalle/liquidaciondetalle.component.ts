import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatSnackBar, MatTabChangeEvent, MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { DataService } from '../../../dataservice/data.service';
import { LiquidaciondetalleService } from '../../../core/services/liquidaciondetalle.service';
import { ILiquidaciondetalle } from '../../../core/interfaces/liquidacion.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { fuseAnimations } from '../../../../@fuse/animations';
import { map } from 'rxjs/operators';

/**
 * @title Basic use of `<table mat-table>`
 */


@Component({
    selector: 'app-liquidaciondetalle',
    templateUrl: './liquidaciondetalle.component.html',
    animations: fuseAnimations
})

export class LiquidaciondetalleComponent implements OnInit {
    _liquidacionDetalle: Array<ILiquidaciondetalle>;
    liquidacionTotales = {
        subtotal: 0,
        descuento: 0,
        igv: 0,
        total_general: 0
    }

    get liquidacionDetalle(): Array<ILiquidaciondetalle> {
        return this._liquidacionDetalle;
    }

    @Input() set liquidacionDetalle(data: Array<ILiquidaciondetalle>) {
        this._liquidacionDetalle = data;
        
        this.dataSource.data = this.liquidacionDetalle;
        if (this.liquidacionDetalle) {
            this.calculateTotales(0);
        }
    }

    @Input() detail: any;

    @Input() idMaster: number;

    @Output() updated: EventEmitter<any> = new EventEmitter();

    displayedColumns: string[] = ['select', 'descripcion', 'desunimed', 'cantidad', 'imptotal', 'options']
    @ViewChild(MatPaginator, {static: false}) paginatordet: MatPaginator;

    liquidacion: Array<ILiquidaciondetalle>;
    dataSource = new MatTableDataSource<ILiquidaciondetalle>();
    errorMessage: String;
    selectedId: number;
    edit: boolean;

    /** checkbox datatable */
    selection = new SelectionModel<ILiquidaciondetalle>(true, []);

    constructor(
        private liquidacionService: LiquidaciondetalleService,
        private router: Router,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {
    }

    ngOnInit(): void {
        this.dataSource.data = this.liquidacionDetalle;
    }

    getliquidacion(): void {
        this.liquidacionService.getLiquidaciones()
            .pipe(map(liquidacion => {
                liquidacion = liquidacion.map(c => {
                    /*c.imptotal = c.cantidad * c.precio;*/
                    c.imptotal = c.precio;
                    return c;
                });
                return liquidacion;
            }))
            .subscribe(response => {
                this.liquidacion = response;
                this.dataSource.data = this.liquidacion;
                this.dataSource.paginator = this.paginatordet;
                this.paginatordet._intl.itemsPerPageLabel = 'Item por Pagina:';
            });
    }

    delete(id: number): void {
        this.selectedId = id;
        this.deleteliquidacion();
    }

    deleteliquidacion(): void {
        
        if (confirm('Esta seguro que desea borrar este registro?')) {

            this.liquidacionService.deleteLiquidacion(this.selectedId)
                .subscribe(response => {
                    this.updated.emit(true);
                });
        }
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

    updateDataTable(data: ILiquidaciondetalle): void {
        this.updated.emit(data);
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
            await this.liquidacionService.deleteLiquidacion(selecteds[index].id).toPromise();
            if (index === selecteds.length - 1) {
                this.snackBar.open('ELIMINADOS TODOS');
                
                this.updated.emit(true);
            }
        }
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    calculateTotales(descuento = 0): void {
        this.liquidacionTotales.descuento = descuento;
        
        this.liquidacionTotales.subtotal = this.liquidacionDetalle.reduce((a, b) => (b.imptotal), 0);
        this.liquidacionTotales.total_general = (this.liquidacionTotales.subtotal - this.liquidacionTotales.descuento) + this.liquidacionTotales.igv;
        this.liquidacionTotales.igv = (this.liquidacionTotales.subtotal - this.liquidacionTotales.descuento) * 0.18;
    }

    onChangeDscto(event): void {
        this.calculateTotales(+(event.target.value ? event.target.value !== '' : 0));
    }
}

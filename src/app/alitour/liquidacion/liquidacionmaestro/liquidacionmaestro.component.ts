import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatSnackBar, MatTabChangeEvent, MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { LiquidacionService } from '../../../core/services/liquidacion.service';
import { ILiquidacion, ILiquidaciondetalle } from '../../../core/interfaces/liquidacion.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { LiquidaciondetalleService } from '../../../core/services/liquidaciondetalle.service';


/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
    selector: 'app-liquidacionmaestro',
    templateUrl: './liquidacionmaestro.component.html',
})

export class LiquidacionmaestroComponent implements OnInit {

    displayedColumns: string[] = ['select', 'fechaini', 'horaini', 'fechafin', 'horafin', 'descripcion', 'desunimed', 'cantidad', 'imptotal', 'estado', 'options']
    @ViewChild(MatPaginator) paginator: MatPaginator;

    cotizacion: Array<ILiquidacion>;
    liquidaciondetalle: Array<ILiquidaciondetalle>;
    cotizacionSelected: ILiquidacion;
    dataSource = new MatTableDataSource<ILiquidacion>();
    dataSourceDetalle = new MatTableDataSource<ILiquidaciondetalle>();
    errorMessage: String;
    selectedId: number;
    edit: boolean;
    @Output() shower: EventEmitter<any> = new EventEmitter();
    @Output() detalle: EventEmitter<Array<ILiquidaciondetalle>> = new EventEmitter();

    /** checkbox datatable */
    selection = new SelectionModel<ILiquidacion>(true, []);

    constructor(
        private liquidacionService: LiquidacionService,
        private router: Router,
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
        private liquidacionServicedetalle: LiquidaciondetalleService,
    ) {
    }

    ngOnInit(): void {
        this.getliquidacion();
    }

    getliquidacion(): void {

        this.liquidacionService.getCotizaciones()
            .subscribe(response => {
                this.cotizacion = response;
                this.dataSource.data = this.cotizacion;
                this.dataSource.paginator = this.paginator;
                this.paginator._intl.itemsPerPageLabel = 'Item por Pagina:';
                
                this.updateCotizacionSelected(true);
            });
    }

    updateCotizacionSelected(emit?: boolean) {
        if (this.cotizacionSelected) {
            this.cotizacionSelected = this.cotizacion.find((v, i) => v.id === this.cotizacionSelected.id);
        } else {
            this.cotizacionSelected = this.cotizacion[0];
        }
        if (emit) {
            this.detalle.emit(this.cotizacionSelected ? this.cotizacionSelected.liquidaciones : []);
        }
    }

    viewRecorddetail(liquidacion: LiquidacionService): void {
        // this.selectedId = liquidacion.id;
        // this.cotizacionSelected = liquidacion;
        this.detalle.emit(this.cotizacionSelected.liquidaciones);
    }

    delete(id: number): void {
        this.selectedId = id;
        this.deleteliquidacion();
    }

    deleteliquidacion(): void {
        if (confirm('Esta seguro que desea borrar este registro?')) {
            this.liquidacionService.deleteCotizacion(this.selectedId)
                .subscribe(response => {
                    /* console.log(response); */
                    this.getliquidacion();
                });
        }
    }
    
    public editRecord(row: any): void {
        this.selectedId = row.id;
        this.edit = true;
    }

    public addRecord(): void {
        this.edit = true;
        this.selectedId = null;
    }

    showDataTable(): void {
        this.edit = false;
    }

    updateDataTable(data: ILiquidacion): void {
        this.getliquidacion();
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
            await this.liquidacionService.deleteCotizacion(selecteds[index].id).toPromise();
            if (index === selecteds.length - 1) {
                this.snackBar.open('ELMINADOS TODOS');
                this.getliquidacion();
            }
        }
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}

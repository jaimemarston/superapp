import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatSnackBar, MatTabChangeEvent, MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { Cotizacion } from '../../../dataservice/cotizacion';
import { DataService } from '../../../dataservice/data.service';
import { CotizacionService } from '../../../core/services/cotizacion.service';
import { ICotizacion, ICotizaciondetalle } from '../../../core/interfaces/cotizacion.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { CotizaciondetalleService } from '../../../core/services/cotizaciondetalle.service';
import { CotizaciondetalleComponent } from '../cotizaciondetalle/cotizaciondetalle.component';


/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
    selector: 'app-cotizacionmaestro',
    templateUrl: './cotizacionmaestro.component.html',
})

export class CotizacionmaestroComponent implements OnInit {

    displayedColumns: string[] = ['select', 'codigo', 'fechadoc', 'ruc', 'desruc', 'telruc', 'correoruc', 'estado', 'options'];
    @ViewChild(MatPaginator) paginator: MatPaginator;

    cotizacion: Array<ICotizacion>;
    cotizaciondetalle: Array<ICotizaciondetalle>;
    cotizacionSelected: ICotizacion;
    dataSource = new MatTableDataSource<ICotizacion>();
    dataSourceDetalle = new MatTableDataSource<ICotizaciondetalle>();
    errorMessage: String;
    selectedId: number;
    edit: boolean;
    @Output() shower: EventEmitter<any> = new EventEmitter();
    @Output() detalle: EventEmitter<Array<ICotizaciondetalle>> = new EventEmitter();

    /** checkbox datatable */
    selection = new SelectionModel<ICotizacion>(true, []);

    constructor(
        private cotizacionService: CotizacionService,
        private router: Router,
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
        private cotizacionDetalleService: CotizaciondetalleService,
    ) {
    }

    ngOnInit(): void {
        this.getCotizacion();
    }

    getCotizacion(): void {

        this.cotizacionService.getCotizaciones()
            .subscribe(response => {
                this.cotizacion = response;
                this.dataSource.data = this.cotizacion;
                this.dataSource.paginator = this.paginator;
                this.paginator._intl.itemsPerPageLabel = 'Item por Pagina:';
                // this.detalle.emit(this.cotizacion[0].cotizaciones);
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
            this.detalle.emit(this.cotizacionSelected ? this.cotizacionSelected.cotizaciones : []);
        }
    }

    viewRecorddetail(cotizacion: ICotizacion): void {
        this.selectedId = cotizacion.id;
        this.cotizacionSelected = cotizacion;
        this.detalle.emit(this.cotizacionSelected.cotizaciones);
    }

    delete(id: number): void {
        this.selectedId = id;
        this.deleteCotizacion();
    }

    deleteCotizacion(): void {
        if (confirm('Esta seguro que desea borrar este registro?')) {
            this.cotizacionService.deleteCotizacion(this.selectedId)
                .subscribe(response => {
                    /* console.log(response); */
                    this.getCotizacion();
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

    updateDataTable(data: ICotizacion): void {
        this.getCotizacion();
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
                this.getCotizacion();
            }
        }
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    duplicarRecord(): void {
        this.cotizacionSelected.codigo = this.cotizacionSelected.codigo != null ? this.cotizacionSelected.codigo + 1 : 1;
        this.cotizacionSelected.id = this.cotizacionSelected.id + 1;
        this.cotizacionService.addCotizacion(this.cotizacionSelected)
            .subscribe(response => {
                if (this.cotizacionSelected.cotizaciones != null) {
                    this.cotizacionSelected.cotizaciones.forEach(cotizacion => {
                        cotizacion.master = response.id;
                        // Insertar detalle
                        this.cotizacionDetalleService.addCotizacion(cotizacion)
                            .subscribe(resp => {
                                this.snackBar.open('Registro agregado satisfactoriamente...!');
                            });
                    });
                }
                this.getCotizacion();
            });
    }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar, MatTabChangeEvent, MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { fuseAnimations } from '../../../../@fuse/animations';
import { IUnidad } from '../../../core/interfaces/unidad.interface';
import { UnidadService } from '../../../core/services/unidad.service';

/**
 * @title Basic use of `<table mat-table>`
 */

@Component({
    selector: 'unidades-list',
    templateUrl: './unidades-list.component.html',
    styleUrls: ['./unidades-list.component.scss'],
    animations: fuseAnimations
})
export class UnidadesListComponent implements OnInit {
    /* displayedColumns: string[] = ['select', 'id', 'codigo', 'ruc' ,'nombre', 'telefono1', 'correo', 'options'];*/
    displayedColumns: string[] = ['select', 'descripcion', 'placa', 'npasajeros', 'color', 'options'];
    @ViewChild(MatPaginator) paginator: MatPaginator;

    unidades: Array<IUnidad>;
    dataSource = new MatTableDataSource<IUnidad>();
    errorMessage: String;
    selectedId: number;
    edit: boolean;

    /** checkbox datatable */
    selection = new SelectionModel<IUnidad>(true, []);

    constructor(
        private unidadService: UnidadService,
        private router: Router,
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
    ) {
    }

    ngOnInit(): void {
        this.getUnidades();
    }

    getUnidades(): void {
        this.unidadService.getUnidades()
            .subscribe(response => {
                this.unidades = response;
                this.dataSource.data = this.unidades;
                this.dataSource.paginator = this.paginator;
                this.paginator._intl.itemsPerPageLabel = 'Item por Pagina:';
            });
    }

    delete(id: number): void {
        this.selectedId = id;

        this.deleteClient();

    }

    deleteClient(): void {
        this.unidadService.deleteUnidad(this.selectedId)
            .subscribe(response => {
                /* console.log(response); */
                this.getUnidades();
            });
    }

    public editRecord(id: number): void {
        this.selectedId = id;
        this.router.navigate([`alitour/unidades/edit/${id}`]);
    }

    public addRecord(): void {
        this.edit = true;
        this.selectedId = null;
    }

    showDataTable(): void {
        this.edit = false;
    }

    updateDataTable(data: IUnidad): void {
        this.getUnidades();
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

    openPrint() {
        window.print();
    }

    /**
     * async await sirve para esperar que una promesa sea cumplida
     * */
    async deleteAllSelecteds() {
        const selecteds = this.selection.selected;
        for (let index = 0; index < selecteds.length; index++) {
            await this.unidadService.deleteUnidad(selecteds[index].id).toPromise();
            if (index === selecteds.length - 1) {
                this.snackBar.open('ELMINADOS TODOS');
                this.getUnidades();
            }
        }
    }

    addUnidad(): void {
        this.router.navigate(['alitour/unidades/add']);
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar, MatTabChangeEvent, MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { fuseAnimations } from '../../../../@fuse/animations';
import { IChofer } from '../../../core/interfaces/chofer.interface';
import { ChoferService } from '../../../core/services/chofer.service';

/**
 * @title Basic use of `<table mat-table>`
 */

@Component({
    selector: 'choferes-list',
    templateUrl: './choferes-list.component.html',
    styleUrls: ['./choferes-list.component.scss'],
    animations: fuseAnimations
})
export class ChoferesListComponent implements OnInit {
    /* displayedColumns: string[] = ['select', 'id', 'codigo', 'ruc' ,'nombre', 'telefono1', 'correo', 'options'];*/
    displayedColumns: string[] = ['select', 'descripcion', 'placa', 'npasajeros', 'color', 'options'];
    @ViewChild(MatPaginator) paginator: MatPaginator;

    choferes: Array<IChofer>;
    dataSource = new MatTableDataSource<IChofer>();
    errorMessage: String;
    selectedId: number;
    edit: boolean;

    /** checkbox datatable */
    selection = new SelectionModel<IChofer>(true, []);

    constructor(
        private choferService: ChoferService,
        private router: Router,
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
    ) {
    }

    ngOnInit(): void {
        this.getChoferes();
    }

    getChoferes(): void {
        this.choferService.getChoferes()
            .subscribe(response => {
                this.choferes = response;
                this.dataSource.data = this.choferes;
                this.dataSource.paginator = this.paginator;
                this.paginator._intl.itemsPerPageLabel = 'Item por Pagina:';
            });
    }

    delete(id: number): void {
        this.selectedId = id;

        this.deleteClient();

    }

    deleteClient(): void {
        this.choferService.deleteChofer(this.selectedId)
            .subscribe(response => {
                /* console.log(response); */
                this.getChoferes();
            });
    }

    public editRecord(id: number): void {
        this.selectedId = id;
        this.router.navigate([`choferes/edit/${id}`]);
    }

    public addRecord(): void {
        this.edit = true;
        this.selectedId = null;
    }

    showDataTable(): void {
        this.edit = false;
    }

    updateDataTable(data: IChofer): void {
        this.getChoferes();
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
               // window.print();
               const prtContent = document.getElementById('div_print');
               const getTbody = () => {
                   const tbody = this.choferes.map(c => `<tr><td>${c.codigo}</td><td>${c.descripcion}</td></tr>`).join('');
                   return tbody;
               };
               prtContent.innerHTML = `
                                <h1>Relacion de Choferes</h1>
                               <table border="1">
                                 <thead><th>ruc</th><th>Nombre</th></thead>
                                 <tbody> ${getTbody()} </tbody>
                               </table>
                               <tfoot><button  onclick='window.print();'>Imprimir</button><button (click)="">Descargar PDF</button></tfoot>`;
               const WinPrint = window.open();
               WinPrint.document.write(prtContent.innerHTML);
    }

    /**
     * async await sirve para esperar que una promesa sea cumplida
     * */
    async deleteAllSelecteds() {
        const selecteds = this.selection.selected;
        for (let index = 0; index < selecteds.length; index++) {
            await this.choferService.deleteChofer(selecteds[index].id).toPromise();
            if (index === selecteds.length - 1) {
                this.snackBar.open('ELMINADOS TODOS');
                this.getChoferes();
            }
        }
    }

    addChofer(): void {
        this.router.navigate(['choferes/add']);
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}

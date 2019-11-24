import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { IGuias } from '../../../core/interfaces/guias.interface';
import { GuiaService } from '../../../core/services/guia.service';
import { fuseAnimations } from '../../../../@fuse/animations';

@Component({
    selector: 'guias-list',
    templateUrl: './guias-list.component.html',
    styleUrls: ['./guias-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class GuiasListComponent implements OnInit {

    /* displayedColumns: string[] = ['select', 'id', 'codigo', 'ruc' ,'nombre', 'telefono1', 'correo', 'options'];*/
    displayedColumns: string[] = ['select', 'ruc', 'nombre', 'telefono1', 'correo', 'options'];
    @ViewChild(MatPaginator , {static: false}) paginator: MatPaginator;

    guias: Array<IGuias>;
    dataSource = new MatTableDataSource<IGuias>();
    selectedId: number;
    edit: boolean;


    /** checkbox datatable */
    selection = new SelectionModel<IGuias>(true, []);

    constructor(
        private guiaService: GuiaService,
        private router: Router,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {
    }

    ngOnInit(): void {
        this.getGuias();
    }

    getGuias(): void {
        this.guiaService.getGuias()
            .subscribe(response => {
                this.guias = response;
                this.dataSource.data = this.guias;

                // this.users = response.filter(v => v.id < 93) filtrando el array;
                /* console.log(this.users); */
                this.dataSource.paginator = this.paginator;
                this.paginator._intl.itemsPerPageLabel = 'Item por Pagina:';
            });
    }

    delete(id: number): void {
        this.selectedId = id;

        this.deleteGuia();

    }

    deleteGuia(): void {
        this.guiaService.deleteGuia(this.selectedId)
            .subscribe(response => {
                /* console.log(response); */
                this.getGuias();
            });
    }

    public editRecord(id: number): void {
        this.selectedId = id;
        // this.edit = true;
        this.router.navigate([`guias/edit/${id}`]);
    }

    public addRecord(): void {
        // this.edit = true;
        this.selectedId = null;
    }

    showDataTable(): void {
        this.edit = false;
    }

    updateDataTable(data: IGuias): void {
        this.getGuias();
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
            const tbody = this.guias.map(c => `<tr><td>${c.codigo}</td><td>${c.ruc}</td><td>${c.nombre}</td></tr>`).join('');
            return tbody;
        };
        prtContent.innerHTML = `
                         <h1>Relacion de Guias</h1>
                        <table border="1">
                          <thead><th>ruc</th><th>Ruc</th><th>Nombre</th></thead>
                          <tbody> ${getTbody()} </tbody>
                        </table>
                        <tfoot><button  onclick='window.print();'>Imprimir</button><button (click)="">Descargar PDF</button></tfoot>`;
        const WinPrint = window.open();
        WinPrint.document.write(prtContent.innerHTML);
        /*  WinPrint.document.close();
         WinPrint.focus();
         WinPrint.print();
         WinPrint.close(); */
    }

    /**
     * async await sirve para esperar que una promesa sea cumplida
     * */
    async deleteAllSelecteds(): Promise<void> {
        const selecteds = this.selection.selected;
        for (let index = 0; index < selecteds.length; index++) {
            await this.guiaService.deleteGuia(selecteds[index].id).toPromise();
            if (index === selecteds.length - 1) {
                this.snackBar.open('ELMINADOS TODOS');
                this.getGuias();
            }
        }
    }

    addGuia(): void {
        this.router.navigate(['guias/add']);
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    
}

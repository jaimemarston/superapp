import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { IProveedores } from '../../../core/interfaces/proveedores.interface';
import { ProveedorService } from '../../../core/services/proveedor.service';
import { fuseAnimations } from '../../../../@fuse/animations';

@Component({
    selector: 'proveedores-list',
    templateUrl: './proveedores-list.component.html',
    styleUrls: ['./proveedores-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ProveedoresListComponent implements OnInit {

    /* displayedColumns: string[] = ['select', 'id', 'codigo', 'ruc' ,'nombre', 'telefono1', 'correo', 'options'];*/
    displayedColumns: string[] = ['select', 'ruc', 'nombre', 'telefono1', 'correo', 'options'];
    @ViewChild(MatPaginator , {static: false}) paginator: MatPaginator;

    proveedores: Array<IProveedores>;
    dataSource = new MatTableDataSource<IProveedores>();
    selectedId: number;
    edit: boolean;


    /** checkbox datatable */
    selection = new SelectionModel<IProveedores>(true, []);

    constructor(
        private proveedorService: ProveedorService,
        private router: Router,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {
    }

    ngOnInit(): void {
        this.getProveedores();
    }

    getProveedores(): void {
        this.proveedorService.getProveedores()
            .subscribe(response => {
                this.proveedores = response;
                this.dataSource.data = this.proveedores;

                // this.users = response.filter(v => v.id < 93) filtrando el array;
                /* console.log(this.users); */
                this.dataSource.paginator = this.paginator;
                this.paginator._intl.itemsPerPageLabel = 'Item por Pagina:';
            });
    }

    delete(id: number): void {
        this.selectedId = id;

        this.deleteProveedor();

    }

    deleteProveedor(): void {
        this.proveedorService.deleteProveedor(this.selectedId)
            .subscribe(response => {
                /* console.log(response); */
                this.getProveedores();
            });
    }

    public editRecord(id: number): void {
        this.selectedId = id;
        // this.edit = true;
        this.router.navigate([`proveedores/edit/${id}`]);
    }

    public addRecord(): void {
        // this.edit = true;
        this.selectedId = null;
    }

    showDataTable(): void {
        this.edit = false;
    }

    updateDataTable(data: IProveedores): void {
        this.getProveedores();
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
            const tbody = this.proveedores.map(c => `<tr><td>${c.codigo}</td><td>${c.ruc}</td><td>${c.nombre}</td></tr>`).join('');
            return tbody;
        };
        prtContent.innerHTML = `
                         <h1>Relacion de Proveedores</h1>
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
            await this.proveedorService.deleteProveedor(selecteds[index].id).toPromise();
            if (index === selecteds.length - 1) {
                this.snackBar.open('ELMINADOS TODOS');
                this.getProveedores();
            }
        }
    }

    addProveedor(): void {
        this.router.navigate(['proveedores/add']);
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    
}

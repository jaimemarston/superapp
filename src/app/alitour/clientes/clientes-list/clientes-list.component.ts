import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { IClientes } from '../../../core/interfaces/clientes.interface';
import { ClienteService } from '../../../core/services/cliente.service';
import { fuseAnimations } from '../../../../@fuse/animations';

@Component({
    selector: 'clientes-list',
    templateUrl: './clientes-list.component.html',
    styleUrls: ['./clientes-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ClientesListComponent implements OnInit {

    /* displayedColumns: string[] = ['select', 'id', 'codigo', 'ruc' ,'nombre', 'telefono1', 'correo', 'options'];*/
    displayedColumns: string[] = ['select', 'codigo', 'ruc', 'nombre', 'telefono1', 'correo', 'options'];
    @ViewChild(MatPaginator) paginator: MatPaginator;

    clientes: Array<IClientes>;
    dataSource = new MatTableDataSource<IClientes>();
    selectedId: number;
    edit: boolean;


    /** checkbox datatable */
    selection = new SelectionModel<IClientes>(true, []);

    constructor(
        private clienteService: ClienteService,
        private router: Router,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {
    }

    ngOnInit(): void {
        this.getClientes();
    }

    getClientes(): void {
        this.clienteService.getClientes()
            .subscribe(response => {
                this.clientes = response;
                this.dataSource.data = this.clientes;

                // this.clientes = response.filter(v => v.id < 93) filtrando el array;
                /* console.log(this.clientes); */
                this.dataSource.paginator = this.paginator;
                this.paginator._intl.itemsPerPageLabel = 'Item por Pagina:';
            });
    }

    delete(id: number): void {
        this.selectedId = id;

        this.deleteClient();

    }

    deleteClient(): void {
        this.clienteService.deleteCliente(this.selectedId)
            .subscribe(response => {
                /* console.log(response); */
                this.getClientes();
            });
    }

    public editRecord(id: number): void {
        this.selectedId = id;
        // this.edit = true;
        this.router.navigate([`alitour/clientes/edit/${id}`]);
    }

    public addRecord(): void {
        // this.edit = true;
        this.selectedId = null;
    }

    showDataTable(): void {
        this.edit = false;
    }

    updateDataTable(data: IClientes): void {
        this.getClientes();
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
            const tbody = this.clientes.map(c => `<tr><td>${c.codigo}</td><td>${c.ruc}</td><td>${c.nombre}</td></tr>`).join('');
            return tbody;
        };
        prtContent.innerHTML = `
                         <h1>Relacion de Clientes</h1>
                        <table border="1">
                          <thead><th>Codigo</th><th>Ruc</th><th>Nombre</th></thead>
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
            await this.clienteService.deleteCliente(selecteds[index].id).toPromise();
            if (index === selecteds.length - 1) {
                this.snackBar.open('ELMINADOS TODOS');
                this.getClientes();
            }
        }
    }

    addClient(): void {
        this.router.navigate(['alitour/clientes/add']);
    }
}

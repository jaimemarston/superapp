import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { IClientes } from '../../../core/interfaces/clientes.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { ClienteService } from '../../../core/services/cliente.service';
import { Router } from '@angular/router';
import { IUser } from '../../../core/interfaces/user.interface';
import { UserService } from '../../../core/services/user.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

    displayedColumns: string[] = ['select', 'foto', 'nombre', 'apellido_paterno', 'apellido_materno', 'id', 'sexo', 'telefono1', 'options'];
    @ViewChild(MatPaginator , {static: false}) paginator: MatPaginator;

    users: Array<IUser>;
    dataSource = new MatTableDataSource<IUser>();
    selectedId: number;
    edit: boolean;


    /** checkbox datatable */
    selection = new SelectionModel<IUser>(true, []);

    constructor(
        private userService: UserService,
        private router: Router,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {
    }

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers(): void {
        this.userService.getUsers()
            .subscribe(response => {
                this.users = response;
                this.dataSource.data = this.users;

                // this.users = response.filter(v => v.id < 93) filtrando el array;
                /* console.log(this.users); */
                this.dataSource.paginator = this.paginator;
                this.paginator._intl.itemsPerPageLabel = 'Item por Pagina:';
            });
    }

    delete(id: number): void {
        this.selectedId = id;

        this.deleteClient();

    }

    deleteClient(): void {
        this.userService.deleteUser(this.selectedId)
            .subscribe(response => {
                /* console.log(response); */
                this.getUsers();
            });
    }

    public editRecord(id: number): void {
        this.selectedId = id;
        // this.edit = true;
        this.router.navigate([`users/edit/${id}`]);
    }

    public addRecord(): void {
        // this.edit = true;
        this.selectedId = null;
    }

    showDataTable(): void {
        this.edit = false;
    }

    updateDataTable(data: IUser): void {
        this.getUsers();
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
            const tbody = this.users.map(c => `<tr><td>${c.id}</td><td>${c.nombre}</td><td>${c.apellido_paterno}</td></tr>`).join('');
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
    }

    /**
     * async await sirve para esperar que una promesa sea cumplida
     * */
    async deleteAllSelecteds(): Promise<void> {
        const selecteds = this.selection.selected;
        for (let index = 0; index < selecteds.length; index++) {
            await this.userService.deleteUser(selecteds[index].id).toPromise();
            if (index === selecteds.length - 1) {
                this.snackBar.open('ELMINADOS TODOS');
                this.getUsers();
            }
        }
    }

    addUser(): void {
        this.router.navigate(['users/add']);
    }

}

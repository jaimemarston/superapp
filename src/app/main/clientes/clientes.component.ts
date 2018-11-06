import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '../../../@fuse/animations';

@Component({
    selector: 'clientes',
    templateUrl: './clientes.component.html',
    styleUrls: ['./clientes.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ClientesComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}

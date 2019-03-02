import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '../../../@fuse/animations';

@Component({
    selector: 'users',
    templateUrl: './proveedores.component.html',
    styleUrls: ['./proveedores.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProveedoresComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}

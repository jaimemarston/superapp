import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CotizacionmaestroComponent } from './cotizacionmaestro/cotizacionmaestro.component';
import { fuseAnimations } from '../../../@fuse/animations';
import { ICotizaciondetalle } from '../../core/interfaces/cotizacion.interface';


/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
    selector: 'app-cotizacion',
    templateUrl: './cotizacion.component.html',
    styleUrls: ['./cotizacion.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CotizacionComponent implements OnInit {
    detail: Array<ICotizaciondetalle>;
    idMaster: number;
    @ViewChild(CotizacionmaestroComponent) cotizacionMaestro: CotizacionmaestroComponent;

    constructor() {
    }

    ngOnInit(): void {
    }

    setDetail(detail: Array<ICotizaciondetalle>): any {
        this.detail = detail;
        this.idMaster = this.cotizacionMaestro.selectedId;
    }

    getCotizaciones(): void {
        this.cotizacionMaestro.getCotizacion();

    }
}

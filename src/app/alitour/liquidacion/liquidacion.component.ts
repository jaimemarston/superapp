import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { LiquidacionmaestroComponent } from './liquidacionmaestro/liquidacionmaestro.component';
import { fuseAnimations } from '../../../@fuse/animations';
import { ILiquidaciondetalle } from '../../core/interfaces/liquidacion.interface';


/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
    selector: 'app-liquidacion',
    templateUrl: './liquidacion.component.html',
    styleUrls: ['./liquidacion.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LiquidacionComponent implements OnInit {
    detail: Array<ILiquidaciondetalle>;
    idMaster: number;
    @ViewChild(LiquidacionmaestroComponent) liquidacionMaestro: LiquidacionmaestroComponent;

    constructor() {
    }

    ngOnInit(): void {
    }

    setDetail(detail: Array<ILiquidaciondetalle>): any {
        this.detail = detail;
        this.idMaster = this.liquidacionMaestro.selectedId;
    }

    getliquidaciones(): void {
        this.liquidacionMaestro.getliquidacion();
    }
}

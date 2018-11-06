import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '../../../@fuse/animations';

@Component({
    selector: 'app-articulos',
    templateUrl: './articulos.component.html',
    styleUrls: ['./articulos.component.scss'],
    animations: fuseAnimations
})
export class ArticulosComponent implements OnInit {
    constructor() {
    }

    ngOnInit(): void {

    }


}
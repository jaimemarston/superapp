import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '../../../@fuse/animations';

@Component({
    selector: 'users',
    templateUrl: './guias.component.html',
    styleUrls: ['./guias.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class GuiasComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}

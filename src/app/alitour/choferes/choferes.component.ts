import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '../../../@fuse/animations';

@Component({
    selector: 'app-choferes',
    templateUrl: './choferes.component.html',
    styleUrls: ['./choferes.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ChoferesComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}

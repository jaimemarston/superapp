import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface ILegendColor {
    status: number;
    color: string;
    quantity: number;
}

@Component({
    selector: 'app-legend',
    templateUrl: './legend.component.html',
    styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit {
    @Input() legend: Array<ILegendColor>;

    @Output() clicked: EventEmitter<ILegendColor> = new EventEmitter<ILegendColor>();


    constructor() {
    }

    ngOnInit(): void {
    }

}

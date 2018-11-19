import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { BASEURL } from '../../../../environments/environment';

@Component({
    selector: 'toolbar-table',
    templateUrl: './toolbar-table.component.html',
    styleUrls: ['./toolbar-table.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ToolbarTableComponent implements OnInit {

    @Input() search = true;
    @Input() urlPrint;

    @Output() add: EventEmitter<any> = new EventEmitter();
    @Output() printing: EventEmitter<any> = new EventEmitter();
    @Output() delete: EventEmitter<any> = new EventEmitter();

    @Output() inputText: EventEmitter<string> = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit(): void {
    }

    print_pdf(): void {
        if (this.urlPrint) {
            window.open(`${BASEURL}${this.urlPrint}`, '_blank');
            // window.location.replace(`${BASEURL}${this.urlPrint}`);
        }
    }

}

import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'toolbar-table',
    templateUrl: './toolbar-table.component.html',
    styleUrls: ['./toolbar-table.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ToolbarTableComponent implements OnInit {
    @Output() add: EventEmitter<any> = new EventEmitter();
    @Output() printing: EventEmitter<any> = new EventEmitter();
    @Output() delete: EventEmitter<any> = new EventEmitter();

    @Output() inputText: EventEmitter<string> = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit(): void {
    }

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-action-icons',
    templateUrl: './action-icons.component.html',
    styleUrls: ['./action-icons.component.scss']
})
export class ActionIconsComponent {
    @Output() remove: EventEmitter<any> = new EventEmitter();
    @Output() edit: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

}

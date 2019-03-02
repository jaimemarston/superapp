import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-action-icons',
    templateUrl: './action-icons.component.html',
    styleUrls: ['./action-icons.component.scss']
})
export class ActionIconsComponent {
    @Output() remove: EventEmitter<any> = new EventEmitter();
    @Output() edit: EventEmitter<any> = new EventEmitter();

    @Input() questionRemove = 'Esta seguro que desea eliminar?';

    constructor() {
    }

    removeAction(): void {
        if (confirm(this.questionRemove)) {
            this.remove.emit(true);
        }
    }

}

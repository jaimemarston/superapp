import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CalendarEvent} from 'angular-calendar';

import {MatColors} from '@fuse/mat-colors';
import {CalendarEventModel} from '../event.model';

@Component({
    selector: 'calendar-event-form-dialog',
    templateUrl: './event-form.component.html',
    styleUrls: ['./event-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class CalendarEventFormDialogComponent {
    action: string;
    event: CalendarEvent;
    eventForm: FormGroup;
    dialogTitle: string;
    presetColors = MatColors.presets;

    selectedId: number;
    idMaster: number;

    /**
     * Constructor
     *
     * @param {MatDialogRef<CalendarEventFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<CalendarEventFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    ) {
        this.event = _data.event;
        this.action = _data.action;
        this.selectedId = _data.selectedId;
        this.idMaster = _data.idMaster;

        // this.eventForm = this.createEventForm();
    }

    closeModal(update?: boolean): void {
        this.matDialogRef.close(update);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create the event form
     *
     * @returns {FormGroup}
     */
    // createEventForm(): FormGroup
    // {
    //     return new FormGroup({
    //         title : new FormControl(this.event.title),
    //         start : new FormControl(this.event.start),
    //         end   : new FormControl(this.event.end),
    //         allDay: new FormControl(this.event.allDay),
    //         color : this._formBuilder.group({
    //             primary  : new FormControl(this.event.color.primary),
    //             secondary: new FormControl(this.event.color.secondary)
    //         }),
    //         meta  :
    //             this._formBuilder.group({
    //                 location: new FormControl(this.event.meta.location),
    //                 notes   : new FormControl(this.event.meta.notes)
    //             })
    //     });
    // }
}

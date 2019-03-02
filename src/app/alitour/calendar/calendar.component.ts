import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Subject} from 'rxjs';
import {startOfDay, isSameDay, isSameMonth} from 'date-fns';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarMonthViewDay} from 'angular-calendar';

import {FuseConfirmDialogComponent} from '@fuse/components/confirm-dialog/confirm-dialog.component';
import {fuseAnimations} from '@fuse/animations';
import {CalendarEventFormDialogComponent} from './event-form/event-form.component';
import {CotizacionService} from '../../core/services/cotizacion.service';
import {ICotizaciondetalle} from '../../core/interfaces/cotizacion.interface';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// @ts-ignore
import {default as _rollupMoment} from 'moment';
import {ILegendColor} from './legend/legend.component';

const moment = _rollupMoment || _moment;

@Component({
    selector: 'calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CalendarComponent implements OnInit {
    actions: CalendarEventAction[];
    activeDayIsOpen: boolean;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    dialogRef: MatDialogRef<any>;
    events: CalendarEvent<ICotizaciondetalle>[];
    refresh: Subject<any> = new Subject();
    selectedDay: any;
    view: string;
    viewDate: Date;

    cotizacionesDetail: Array<ICotizaciondetalle> = [];

    legend: Array<ILegendColor> = [
        {
            color: 'accent-bg',
            quantity: 10,
            status: 1
        },
        {
            color: 'red-bg',
            quantity: 10,
            status: 2
        },
        {
            color: 'purple-bg',
            quantity: 10,
            status: 3
        },
        {
            color: 'deep-purple-bg',
            quantity: 10,
            status: 4
        },
        {
            color: 'orange-bg',
            quantity: 10,
            status: 5
        }
    ];

    constructor(
        private _matDialog: MatDialog,
        private cotizacionService: CotizacionService
    ) {
        // Set the defaults
        this.view = 'week';
        this.viewDate = new Date();
        this.activeDayIsOpen = true;
        this.selectedDay = {date: startOfDay(new Date())};

        this.actions = [
            {
                label: '<i class="material-icons s-16">edit</i>',
                onClick: ({event}: { event: CalendarEvent }): void => {
                    this.editEvent('edit', event);
                }
            },
            {
                label: '<i class="material-icons s-16">delete</i>',
                onClick: ({event}: { event: CalendarEvent }): void => {
                    this.deleteEvent(event);
                }
            }
        ];

        /**
         * Get events from service/server
         */
        this.setEvents();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // /**
        //  * Watch re-render-refresh for updating db
        //  */
        // this.refresh.subscribe(updateDB => {
        //     if ( updateDB )
        //     {
        //         this._calendarService.updateEvents(this.events);
        //     }
        // });
        //
        // this._calendarService.onEventsUpdated.subscribe(events => {
        //     this.setEvents();
        //     this.refresh.next();
        // });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Set events
     */
    setEvents(): void {
        this.getCotizaciones();
    }

    async getCotizaciones(): Promise<void> {
        const cotizacionesMaster = await this.cotizacionService.getCotizaciones().toPromise();
        this.cotizacionesDetail = [];
        cotizacionesMaster.forEach(c => {
            if (c.cotizaciones && c.cotizaciones.length) {
                this.cotizacionesDetail.push(...c.cotizaciones);
            }
        });
        this.cotizacioensDetailToEvents();
    }

    cotizacioensDetailToEvents(cotizaciones?: Array<ICotizaciondetalle>): void {
        let cotizacionesDetail = [...this.cotizacionesDetail];
        if (cotizaciones) {
            cotizacionesDetail = [...cotizaciones];
        }
        this.events = cotizacionesDetail.map((c, i) => {
            return {
                id: i,
                start: moment(`${c.fechaini} ${c.horaini}`, 'yyyy-mm-dd H:mm').toDate(),
                end: moment(`${c.fechafin} ${c.horafin}`, 'yyyy-mm-dd H:mm').toDate(),
                title: c.descripcion,
                // actions: this.actions,
                allDay: false,
                draggable: true,
                meta: c,
            };
        });
        this.refresh.next();
    }

    /**
     * Before View Renderer
     *
     * @param {any} header
     * @param {any} body
     */
    beforeMonthViewRender({header, body}): void {
        // console.info('beforeMonthViewRender');
        /**
         * Get the selected day
         */
        const _selectedDay = body.find((_day) => {
            return _day.date.getTime() === this.selectedDay.date.getTime();
        });

        if (_selectedDay) {
            /**
             * Set selectedday style
             * @type {string}
             */
            _selectedDay.cssClass = 'mat-elevation-z3';
        }

    }

    /**
     * Day clicked
     *
     * @param {MonthViewDay} day
     */
    dayClicked(day: CalendarMonthViewDay): void {
        const date: Date = day.date;
        const events: CalendarEvent[] = day.events;

        if (isSameMonth(date, this.viewDate)) {
            if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
        this.selectedDay = day;
        this.refresh.next();
    }

    /**
     * Event times changed
     * Event dropped or resized
     *
     * @param {CalendarEvent} event
     * @param {Date} newStart
     * @param {Date} newEnd
     */
    eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
        event.start = newStart;
        event.end = newEnd;
        // console.warn('Dropped or resized', event);
        this.refresh.next(true);
    }

    /**
     * Delete Event
     *
     * @param event
     */
    deleteEvent(event): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                const eventIndex = this.events.indexOf(event);
                this.events.splice(eventIndex, 1);
                this.refresh.next(true);
            }
            this.confirmDialogRef = null;
        });

    }

    /**
     * Edit Event
     *
     * @param {string} action
     * @param {CalendarEvent} event
     */
    editEvent(action: string, event: CalendarEvent<ICotizaciondetalle>): void {
        const eventIndex = this.events.indexOf(event);

        this.dialogRef = this._matDialog.open(CalendarEventFormDialogComponent, {
            panelClass: 'event-form-dialog',
            data: {
                event: event,
                selectedId: event.meta.id,
                idMaster: event.meta.codigo
            }
        });
        this.dialogRef.afterClosed()
            .subscribe(res => {
                if (res) {
                    this.setEvents();
                }
            });

        // this.dialogRef.afterClosed()
        //     .subscribe(response => {
        //         if (!response) {
        //             return;
        //         }
        //         const actionType: string = response[0];
        //         const formData: FormGroup = response[1];
        //         switch (actionType) {
        //             /**
        //              * Save
        //              */
        //             case 'save':
        //
        //                 this.events[eventIndex] = Object.assign(this.events[eventIndex], formData.getRawValue());
        //                 this.refresh.next(true);
        //
        //                 break;
        //             /**
        //              * Delete
        //              */
        //             case 'delete':
        //
        //                 this.deleteEvent(event);
        //
        //                 break;
        //         }
        //     });
    }

    /**
     * Add Event
     */
    addEvent(): void {
        this.dialogRef = this._matDialog.open(CalendarEventFormDialogComponent, {
            panelClass: 'event-form-dialog',
            data: {
                action: 'new',
                date: this.selectedDay.date
            }
        });
        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if (!response) {
                    return;
                }
                const newEvent = response.getRawValue();
                newEvent.actions = this.actions;
                this.events.push(newEvent);
                this.refresh.next(true);
            });
    }

    changeByStatus(legendColor: ILegendColor): void {
        const cotizaciones = this.cotizacionesDetail.filter(c => {
            if (c.status) {
                return c.status === legendColor.status;
            } else {
                return true;
            }
        });
        this.cotizacioensDetailToEvents(cotizaciones);
    }
}


